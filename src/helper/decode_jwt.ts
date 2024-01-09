import { ZJwtPayload } from "@/interface/ZJwtPayload";
import { jwtDecode } from "jwt-decode";

export const decode = (jwt: string) : ZJwtPayload => {
  return jwtDecode(jwt);
}