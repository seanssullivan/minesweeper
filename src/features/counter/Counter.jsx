import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import FlagIcon from "@material-ui/icons/Flag";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -15,
    top: 15,
    padding: "5 15px",
  },
}))(Badge);

const mapState = (state) => {
  return { count: state.counter.value };
};

const Counter = ({ count }) => {
  return (
    <StyledBadge badgeContent={count} color="primary">
      <FlagIcon fontSize="large" />
    </StyledBadge>
  );
};

export default connect(mapState, null)(Counter);
