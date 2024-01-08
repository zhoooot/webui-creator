export const JwtExpirationTest = (jwt: string) => {
  const jwtDecode = require("jwt-decode");
  const decoded = jwtDecode(jwt);
  const now = Date.now().valueOf() / 1000;
  if (typeof decoded.exp !== "undefined" && decoded.exp < now) {
    return true;
  }
  return false;
};
