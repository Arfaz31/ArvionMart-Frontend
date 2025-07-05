import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type TUser = {
  _id: string;
  userId: string;
  email: string;
  role: string;
};

type TAuthState = {
  user: TUser | null;
};

const initialState: TAuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("action.payload", action.payload);
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions; //This line exports the setUser and logOut actions, allowing you to dispatch these actions from components or other parts of the application.
export default authSlice.reducer; //This reducer handles state updates for the auth slice and will be added to the Redux store.

export const selectCurrentUser = (state: RootState) => state.auth.user;
