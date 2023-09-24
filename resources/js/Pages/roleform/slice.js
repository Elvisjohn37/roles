import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const roleFormSlice = createSlice({
  name: "roleForm",
  initialState,
  reducers: {
    setUsersAction: (state, action) => {
      state.users = action.payload?.users;
    },
    addUserAction: (state, action) => {
      state.users = [...state.users, action.payload?.user];
    },
  },
});

const getRoleFormState = (state) => state.roleForm.users;

export const { setUsersAction, addUserAction } = roleFormSlice.actions;

export default roleFormSlice.reducer;

export { getRoleFormState };
