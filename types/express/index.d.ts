import express from "express";

declare global {
  namespace Express {
    interface Request {
      id?: Record<string,any>
      csrftoken: any
    }
  }
}

// export interface CustomRequest extends Request {
//   token: string | JwtPayload;
// }

// (req as CustomRequest).token = decoded;