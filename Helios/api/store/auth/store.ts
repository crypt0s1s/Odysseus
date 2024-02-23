import { flow, types } from "mobx-state-tree";
import { authHeaderInterceptor, createHeliosApi } from "../../core";
import { ClientTokenResponse } from "./models";

const authUrl = "auth";
export const authApi = createHeliosApi(authUrl);
export const authenticatedAuthApi = createHeliosApi(authUrl, [
  authHeaderInterceptor,
]);

export const AuthStore = types
  .model("AuthStore", {
    jwtToken: types.maybeNull(types.string),
  })
  .actions((self) => ({
    async verifyJWT() {
      return await authenticatedAuthApi.post("validateLoggedInUser");
    },
    login: flow(function* login(username: string, password: string) {
      const basicToken = btoa(`${username}:${password}`);
      const withBasicApi = authApi.extend({
        headers: {
          Authorization: `Basic ${basicToken}`,
        },
      });

      let result = yield withBasicApi.post("login").json();
      let ctr = result as ClientTokenResponse;

      self.jwtToken = ctr.token;
    }),
  }));
