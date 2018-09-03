import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  withStyles
} from "@material-ui/core";
import {
  MenuIcon,
  Add,
  Edit,
  DeleteForever,
  Save,
  SwapHoriz,
  NotInterested
} from "@material-ui/icons/";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10
  }
};

class ToolBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "ToolBox"
    };
  }

  render() {
    const { classes } = this.props;
    const Do = this.props.do;
    let tool = "";

    let MarkupItem = (
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <Edit />
          </IconButton>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            disabled
          >
            <Save />
          </IconButton>
          <div className={classes.flex} />
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            disabled
          >
            <DeleteForever />
          </IconButton>
        </Toolbar>
      </AppBar>
    );

    let MarkupList = (
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => {
              this.props.handleToolBox("MarkupListEdit");
            }}
          >
            <Edit />
          </IconButton>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => {
              this.props.handleToolBox("MarkupListAdd");
            }}
          >
            <Add />
          </IconButton>
          <div className={classes.flex} />
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            disabled
          >
            <SwapHoriz />
          </IconButton>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            disabled={this.props.mode === "edit" ? false : true}
          >
            <DeleteForever />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
    let MarkupNew = (
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            disabled={this.props.nameValid ? false : true}
            onClick={() => {
              this.props.handleToolBox("MarkupNewSave");
            }}
          >
            <Save />
          </IconButton>

          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => {
              this.props.handleToolBox("MarkupNewNotInterested");
            }}
          >
            <NotInterested />
          </IconButton>
        </Toolbar>
      </AppBar>
    );

    let MarkupEmpty = (
      <AppBar position="static">
        <Toolbar variant="dense" />
      </AppBar>
    );
    if (Do === "list") {
      tool = MarkupList;
    } else if (Do === "item") {
      tool = MarkupItem;
    } else if (Do === "new") {
      tool = MarkupNew;
    } else {
      tool = MarkupEmpty;
    }

    return <div className={classes.root}>{tool}</div>;
  }
}

ToolBox.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ToolBox);
