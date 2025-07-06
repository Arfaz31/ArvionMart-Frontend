import { Session } from "next-auth";
export type CustomUser = {
  _id?: string | null | undefined;
  userId?: string | null | undefined;
  email?: string | null | undefined;
  role?: string | null | undefined;
};

// Define the session type that includes your custom user
export type CustomSession = Session & {
  user?: CustomUser;
};
