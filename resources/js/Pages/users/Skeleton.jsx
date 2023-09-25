import React from "react";
import Card from "@mui/joy/Card";
import { Skeleton as MuiSkeleton } from "@mui/joy";
import AspectRatio from "@mui/joy/AspectRatio";
import _ from "lodash";
import styles from "./Skeleton.module.scss";

const Skeleton = ({ count }) =>
  _.range(count).map(() => (
    <Card
      className={styles.Skeleton}
      variant="outlined"
      sx={{ display: "flex", gap: 2 }}
    >
      <AspectRatio ratio="21/3">
        <MuiSkeleton variant="overlay">
          <img
            alt=""
            src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
          />
        </MuiSkeleton>
      </AspectRatio>
    </Card>
  ));

export default Skeleton;
