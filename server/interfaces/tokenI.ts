import  { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
export interface IJWT_PAYLOAD extends JwtPayload {
    id: Types.ObjectId;
  }