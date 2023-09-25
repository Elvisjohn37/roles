import React, { useEffect, useState } from "react";
import styles from "./Users.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setUsersAction, getRoleFormState } from "./roleform/slice";
import { fetchUserData } from "../backend/requests";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/material/Typography";
import SelectRoles from "../components/SelectRoles";
import Skeleton from "./users/Skeleton.jsx";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(getRoleFormState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchUserData({
      success: (response) => {
        dispatch(setUsersAction({ users: response.data.data }));
      },
      completed: () => setIsLoading(false),
    });
  }, []);

  return (
    <div className={styles.users}>
      <div className={styles.actionBar}>
        <SelectRoles>
          {(isLoading) => {
            setIsLoading(isLoading);
          }}
        </SelectRoles>
      </div>
      {isLoading ? (
        <Skeleton count="5" />
      ) : (
        users?.map((user) => (
          <Card key={user} className={styles.user}>
            <CardContent>
              <Typography className={styles.typography}>
                <Chip size="lg" variant="soft" color="primary">
                  {user.role}
                </Chip>
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {`${user.first_name} ${user.middle_name}, ${user.last_name}`}
              </Typography>
              <Typography variant="h5" component="div"></Typography>
              <Typography variant="body2">{user.email}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default Users;
