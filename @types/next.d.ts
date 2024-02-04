import { NextApiRequest } from "next"
import { File } from "multer"

declare module "next" {
  export interface NextApiRequest {
    file: File
  }
}
