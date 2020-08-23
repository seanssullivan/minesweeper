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

const elapsedTime = (startTime, stopTime) => {
  const currentTime = stopTime ? stopTime : Math.round(Date.now() / 1000);
  const formattedTime = formatTime(currentTime - startTime);
  return formattedTime;
};

const mapState = (state) => {
  return {
    startTime: state.timer.startTime,
    stopTime: state.timer.stopTime,
    isActive: state.timer.isActive,
  };
};

const Timer = ({ startTime, stopTime, isActive }) => {
  const [displayTime, setDisplayTime] = useState("0:00");

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        const time = elapsedTime(startTime, stopTime);
        setDisplayTime(time);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [startTime, stopTime, isActive]);

  useEffect(() => {
    if (!startTime) {
      setDisplayTime("0:00");
    }
  }, [startTime]);

  return (
    <StyledBadge
      badgeContent={startTime ? displayTime : "0:00"}
      color="primary"
    >
      <TimerIcon fontSize="large" />
    </StyledBadge>
  );
};

export default connect(mapState, null)(Timer);
