import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
// import Tile from "features/board/Tile";

const useStyles = makeStyles((theme) => ({
  defaultTile: {
    padding: theme.spacing(1),
    textAlign: "center",
    backgroundColor: "green",
    borderRadius: 0,
    // color: theme.palette.text.secondary,
  },
}));

export default function Board() {
  const classes = useStyles();

  function BoardRow() {
    return (
      <React.Fragment>
        <Grid item xs={1}>
          <Paper className={classes.defaultTile}>0</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.defaultTile}>0</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.defaultTile}>0</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.defaultTile}>0</Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <Grid container>
      <Grid container item xs={12}>
        <BoardRow />
      </Grid>
      <Grid container item xs={12}>
        <BoardRow />
      </Grid>
      <Grid container item xs={12}>
        <BoardRow />
      </Grid>
      <Grid container item xs={12}>
        <BoardRow />
      </Grid>
    </Grid>
  );
}
