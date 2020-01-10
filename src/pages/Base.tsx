import * as React from 'react';
import { Route } from 'react-router';
import classNames from 'classnames';
import {observer, inject} from 'mobx-react';
import { MuiThemeProvider, createMuiTheme, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import withRoot from '../withRoot';
import { Hidden, Snackbar, IconButton } from '@material-ui/core';



const drawerWidth = 256;

const styles = (theme: Theme) =>
createStyles({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
    padding: '24px 24px 0',
    background: '#eaeff1',
  },
  close: {
    padding: theme.spacing(0.5),
  },
});

type State = {
  open: boolean;
};

type Props = {
  store: any
}

@inject('routing')
@observer
class Base extends React.Component<Props & WithStyles<typeof styles>, State> {
  state = {
    open: true,
  };
  
  constructor(props){    
    super(props);              
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  handleDrawerToggle = () =>{
    this.setState({ open: !this.state.open });
  }
  handleSnackClose = (error: Error) => () => {
    console.log("close", error);
  }  

  render() {
    console.log("APP RENDER!!", this.props);
    const classes = this.props.classes;    

    const errors = this.props.store.errorStore.errors as Error[];
    return (    
      <div className={classes.root}>
        <nav className={classes.drawer}>
          NAVIGATOR
        </nav>
        <div className={classes.appContent}>
        HEADER...          
          <main className={classes.mainContent}>
   
          </main>
        </div>              
      </div>      
    );
  }
}


export default withRoot((withStyles(styles)(Base) ));
