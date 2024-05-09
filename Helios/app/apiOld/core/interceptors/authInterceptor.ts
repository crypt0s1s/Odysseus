import { rootStore } from "../..";

/**
 * Applies the authentication header to a request
 */
export const authInterceptor = (request: Request) => {
  const authStore = rootStore.auth;
  console.log(`auth interceptor ${authStore.jwtToken}`);
  // TODO: do I want to create an auth store and import it directly?
  if (authStore.jwtToken == null) return;

  request.headers.set("Authorization", `Bearer ${authStore.jwtToken}`);
};
