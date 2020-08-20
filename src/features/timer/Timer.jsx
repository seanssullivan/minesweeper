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

const mapState = (state) => {
  return {
    isActive: state.timer.isActive,
    startTime: state.timer.startTime,
  };
};

export function Timer({ isActive, startTime }) {
  const [displayTime, setDisplayTime] = useState("0:00");

  useEffect(() => {
    const getCurrentTime = (startTime) => {
      if (isActive) {
        const time = Date.now() - startTime;
        const minutes = Math.floor(time / 60);
        const seconds = time % minutes;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
      } else {
        return "0:00";
      }
    };

    const interval = setInterval(() => {
      const time = getCurrentTime(startTime);
      console.log(time);
      setDisplayTime(time);
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive, startTime]);

  return (
    <StyledBadge badgeContent={displayTime} color="primary">
      <TimerIcon fontSize="large" />
    </StyledBadge>
  );
}

export default connect(mapState, null)(Timer);
