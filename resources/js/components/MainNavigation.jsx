import React from "react";
import styles from "./MainNavigation.module.scss";
import { NavLink } from "react-router-dom";

const MainNavigation = () => {
  return (
    <>
      <div className={styles.mainNavigation}>
        <div className={styles.brandSection}>
          <div className={styles.brand}>
            <NavLink className={styles.menu} to="/">ROLES</NavLink>
            <NavLink className={styles.menu} to="/users">USERS</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainNavigation;
