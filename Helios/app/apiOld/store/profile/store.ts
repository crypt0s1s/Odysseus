import { authInterceptor, createHeliosApi } from "../../core";
import { flow, types } from "mobx-state-tree";
import { ProfileModel } from "./models";

export const profileApi = createHeliosApi("profile", [authInterceptor]);

export const ProfileStore = types
  .model("ProfileStore", {
    profile: types.maybe(ProfileModel),
  })
  .actions((self) => ({
    getProfile: flow(function* getProfile() {
      let result = yield profileApi.get("").json();

      self.profile = result;
    }),
  }));
