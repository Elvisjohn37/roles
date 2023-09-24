import React, { useEffect } from "react";
import styles from "./Users.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setUsersAction, getRoleFormState } from "./roleform/slice";
import { fetchUserData } from "../backend/requests";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SelectRoles from "../components/SelectRoles";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(getRoleFormState);

  useEffect(() => {
    fetchUserData({
      success: (response) => {
        dispatch(setUsersAction({ users: response.data.data }));
      },
    });
  }, []);
  
  return (
    <div className={styles.users}>
      <div className={styles.actionBar}><SelectRoles /></div>
      {users?.map((user) => (
        <Card key={user} className={styles.user}>
          <CardContent>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {user.role}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {`${user.first_name} ${user.middle_name}, ${user.last_name}`}
            </Typography>
            <Typography variant="h5" component="div">
              
            </Typography>
            <Typography variant="body2">
              {user.email}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Users;
