import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [],
};

const roleFormSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setRolesAction: (state, action) => {
      state.roles = action.payload?.roles;
    },
    addUserAction: (state, action) => {
      state.roles = [...state.roles, action.payload?.roles];
    },
  },
});

const getRoleFormState = (state) => state.selectroles;

export const { setRolesAction, addUserAction } = roleFormSlice.actions;

export default roleFormSlice.reducer;

export { getRoleFormState };
