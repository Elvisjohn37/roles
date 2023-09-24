import React, { useState, useEffect } from "react";
import styles from "./RoleForm.module.scss";
import FormGroup from "@mui/material/FormGroup";
import Button from "./../components/Button.jsx";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/joy/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import { validateEmail, validateName } from "./../helper.js";
import { addUser, fetchRoles } from "../backend/requests";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { addUserAction } from "./roleform/slice";
import { Navigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import { getRoleFormState } from "../components/selectroles/slice";
import { useSelector } from "react-redux";
import { setRolesAction } from "../components/selectroles/slice";

const RoleForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState({});
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [invalidFields, setInvalidFields] = useState([]);
  const dispatch = useDispatch();
  const [isRedirect, setIsRedirect] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [saveStatus, setSaveStatus] = useState({});
  const { roles } = useSelector(getRoleFormState);
  console.log(roles)
  useEffect(() => {
    fetchRoles({
      success: (response) => {
        dispatch(setRolesAction({ roles: response.data.data }));
      },
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // validateEmptyFields();
    if (invalidFields.length === 0) {
      setIsLoading(true);
      addUser({
        data: {
          firstName: fullName.firstName,
          middleName: fullName.middleName,
          lastName: fullName.lastName,
          roleIds: selectedRoles,
          email: email,
        },
        success: (response) => {
          // dispatch(addUserAction(response.data));
          setIsRedirect(true);
        },
        error: (response) =>
          setSaveStatus({ isError: true, message: response.message }),
        completed: () => setIsLoading(false),
      });
    }
  };

  const validateField = (field, value) => {
    const fieldsExcep = invalidFields.filter(
      (invalidField) => invalidField !== field
    );
    if (value) {
      setInvalidFields(
        validateName(value) == undefined
          ? [...invalidFields, field]
          : fieldsExcep
      );
      setFullName({
        ...fullName,
        [field]: value,
      });
    } else {
      setInvalidFields(fieldsExcep);
    }
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    const fieldsExcepEmail = invalidFields.filter(
      (invalidField) => invalidField !== "email"
    );
    if (value) {
      setInvalidFields(
        validateEmail(value) == undefined
          ? [...invalidFields, "email"]
          : fieldsExcepEmail
      );
      setEmail(value);
    } else {
      setInvalidFields(fieldsExcepEmail);
    }
  };

  // const validateEmptyFields = () => {
  //   const tempInvalidFields = [];
  //   !fullName.firstName && tempInvalidFields.push("firstName");
  //   !fullName.middleName && tempInvalidFields.push("middleName");
  //   !fullName.lastName && tempInvalidFields.push("lastName");
  //   !email && tempInvalidFields.push("email");
  //   !role && tempInvalidFields.push("role");
  //   setInvalidFields(tempInvalidFields);
  // };

  const handleFirstNameChange = (event) => {
    validateField("firstName", event.target.value);
    setFullName({
      ...fullName,
      firstName: event.target.value,
    });
  };

  const handleMiddleNameChange = (event) => {
    validateField("middleName", event.target.value);
    setFullName({
      ...fullName,
      middleName: event.target.value,
    });
  };

  const handleLastNameChange = (event) => {
    validateField("lastName", event.target.value);
    setFullName({
      ...fullName,
      lastName: event.target.value,
    });
  };

  const handleRoleChange = (event) => {
    const value = event.target.value;
    setRole(value);
    // validateField("role", event.target.value);

    setSelectedRoles([...selectedRoles, value]);
  };
  const defaultProps = {
    options: [
      { role: "Author", id: "elvis" },
      { role: "Author", id: "elvis" },
      { role: "Author", id: "elvis" },
      { role: "Author", id: "elvis" },
    ],
    getOptionLabel: (option) => option.role,
  };

  const handleDeleteRole = (id) => {
    setSelectedRoles(selectedRoles.filter((role) => role !== id));
  };

  return (
    <div className={styles.roleForm}>
      <div className={styles.formContainer}>
        <div className={styles.title}>
          <Typography variant="h3" component="h4">
            Roles Form
          </Typography>
        </div>
        {saveStatus.isError && (
          <Alert className={styles.errorMessage} color="danger" variant="soft">
            {saveStatus.isError
              ? saveStatus.message
              : "Please input valid credentials"}
          </Alert>
        )}
        <form>
          <FormGroup className={styles.formGroup}>
            <TextField
              onChange={handleFirstNameChange}
              // error={}
              id="standard-basic"
              label="First Name"
              variant="standard"
              error={invalidFields.includes("firstName")}
            />
          </FormGroup>
          <FormGroup className={styles.formGroup}>
            <TextField
              onChange={handleMiddleNameChange}
              // error={}
              id="standard-basic"
              label="Middle Name"
              variant="standard"
              error={invalidFields.includes("middleName")}
            />
          </FormGroup>
          <FormGroup className={styles.formGroup}>
            <TextField
              onChange={handleLastNameChange}
              // error={}
              id="standard-basic"
              label="Last Name"
              variant="standard"
              error={invalidFields.includes("lastName")}
            />
          </FormGroup>

          <FormGroup className={styles.formGroup}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              onChange={(event) => handleRoleChange(event)}
              label="Roles"
              error={invalidFields.includes("role")}
              variant="standard"
            >
              {roles.filter((role) => !selectedRoles.includes(role.id))
                .map((role) => (
                  <MenuItem key={role} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
            </Select>
            {selectedRoles.length > 0 && (
              <div className={styles.selectedRoles}>
                {selectedRoles.map((selectedRole) => (
                  <Chip
                    className={styles.chip}
                    label={roles.find((role) => role.id == selectedRole).name}
                    variant="outlined"
                    onDelete={() => handleDeleteRole(selectedRole)}
                  />
                ))}
              </div>
            )}
          </FormGroup>
          <FormGroup className={styles.formGroup}>
            <TextField
              onChange={handleEmailChange}
              // error={}
              id="standard-basic"
              label="Email"
              variant="standard"
              error={invalidFields.includes("email")}
            />
          </FormGroup>

          <FormGroup className={styles.formGroup}>
            <Button isLoading={isLoading} type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </FormGroup>
        </form>
      </div>
      {isRedirect && <Navigate to="/users" />}
    </div>
  );
};

export default RoleForm;
