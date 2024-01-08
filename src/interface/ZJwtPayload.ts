import { JwtPayload } from "jwt-decode";

export interface ZJwtPayload extends JwtPayload {
  email: string;
  role: string;

  toString(): string;
}