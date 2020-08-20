import React from "react";
// import { Counter } from "../features/counter/Counter";
import Board from "../features/board/Board";
import { Container } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Badge from "@material-ui/core/Badge";
import FlagIcon from "@material-ui/icons/Flag";
import TimerIcon from "@material-ui/icons/Timer";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "660px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  nav: {
    height: "60px",
    width: "612px",
    display: "block",
    backgroundColor: "green",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  toolbar: {
    paddingLeft: "150px",
    paddingRight: "150px",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -15,
    top: 15,
    padding: "5 15px",
  },
}))(Badge);

export default function App() {
  const classes = useStyles();
  return (
    <Container className={`App ${classes.root}`}>
      <AppBar position="relative" className={classes.nav}>
        <Toolbar className={classes.toolbar}>
          <StyledBadge badgeContent={40} color="primary">
            <FlagIcon fontSize="large" />
          </StyledBadge>
          <StyledBadge badgeContent={40} color="primary">
            <TimerIcon fontSize="large" />
          </StyledBadge>
        </Toolbar>
      </AppBar>
      <Board className={classes.board} />
    </Container>
  );
}
