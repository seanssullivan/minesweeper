import React from "react";
import { useSelector } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import FlagIcon from "@material-ui/icons/Flag";
import { selectCount } from "./counterSlice";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -15,
    top: 15,
    padding: "5 15px",
  },
}))(Badge);

export function Counter() {
  const count = useSelector(selectCount);

  return (
    <StyledBadge badgeContent={count} color="primary">
      <FlagIcon fontSize="large" />
    </StyledBadge>
  );
}
