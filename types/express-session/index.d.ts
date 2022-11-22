import session from 'express-session';

declare module 'express-session' {
  export interface SessionData {
    isLoggedIn: Boolean
    user: any
  }
}
