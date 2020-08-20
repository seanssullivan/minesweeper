import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import TimerIcon from "@material-ui/icons/Timer";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -15,
    top: 15,
    padding: "5 15px",
  },
}))(Badge);

const formatTime = (time) => {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const getElapsedTime = (startTime) => {
  const currentTime = Math.round(Date.now() / 1000);
  const formattedTime = formatTime(currentTime - startTime);
  return formattedTime;
};

const mapState = (state) => {
  return {
    startTime: state.timer.startTime,
    isActive: state.timer.isActive,
  };
};

const Timer = ({ startTime, isActive }) => {
  const [displayTime, setDisplayTime] = useState("0:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const time = isActive ? getElapsedTime(startTime) : "0:00";
      setDisplayTime(time);
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, isActive]);

  return (
    <StyledBadge badgeContent={displayTime} color="primary">
      <TimerIcon fontSize="large" />
    </StyledBadge>
  );
};

export default connect(mapState, null)(Timer);
