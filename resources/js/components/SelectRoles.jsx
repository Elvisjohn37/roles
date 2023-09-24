import React, { useEffect } from "react";
import styles from "./SelectRoles.module.scss";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { fetchRoles, fetchUserData } from "../backend/requests";
import { setRolesAction, getRoleFormState } from "./selectroles/slice";
import { setUsersAction } from "../Pages/roleform/slice";

const SelectRoles = () => {
  const dispatch = useDispatch();

  const { roles } = useSelector(getRoleFormState);

  useEffect(() => {
    fetchRoles({
      success: (response) => {
        dispatch(setRolesAction({ roles: response.data.data }));
      },
    });
  }, []);

  const handleRoleChange = (event) => {
    fetchUserData({
      data: { id: event.target.value },
      success: (response) => {
        dispatch(setUsersAction({ users: response.data.data }));
      },
    });
  };

  return (
    <div className={styles.selectRoles}>
      <FormGroup className={styles.formGroup}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          onChange={(event) => handleRoleChange(event)}
          label="Roles"
          variant="standard"
        >
          {roles.map((role) => (
            <MenuItem key={role} value={role.id}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
      </FormGroup>
    </div>
  );
};

export default SelectRoles;
