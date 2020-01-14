import * as React from 'react';
import {observer} from 'mobx-react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import withRoot from '../withRoot';
import { Grid, TextField, FormControlLabel, Checkbox, Button, Paper, List, ListItemText, ListItemIcon, ListItem, IconButton, Divider, Avatar, Fab, Typography } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { observe, toJS } from 'mobx';
import FriendDialog from './FriendDialog';
import { User, Friend, ChatMessage } from '../stores';

const friendsListWidth = 220;

const styles = (theme: Theme) =>
  createStyles({   
    layout: {},
    subTitle: {
      marginTop: "36px",
    },
    button: {
      margin: theme.spacing(1),    
    },
    paper: {      
      marginLeft: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',      
    },
    marginTop:{
        marginTop: theme.spacing(1),
    },
    scrollable: {
        position: "relative",
        height: "265px;",
        overflow: "auto",
        marginLeft: theme.spacing(2),
    },
    top: {
        marginLeft: theme.spacing(1),
        marginRight: friendsListWidth,      
        textAlign: "right",
    },
    chat: {
        display: "flex",
        padding: theme.spacing(2),
    },
    msgBox: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(3),
    },   
    wrap:{
        position: "relative",
        left: friendsListWidth,
    },
    flex: {
        display: "flex",
        flexGrow:1,
        marginRight: friendsListWidth,
    },
    friendsList:{
        textAlign: "center",
        position: "absolute",
        width: friendsListWidth,
        height: "98%",
        borderRight: "1px solid #eee",
        overflow: "auto",
    },
    title:{
        display: "inline-block",
        position: "absolute",
        left: 30,
        top: 5,    
    },
    addFriend: {
        marginTop: 12,
    }
  });


interface Props {
  store: any;
  user: User; 
};

type State = {
    friendAddOpen: boolean;
    msg: string;
}

@observer
class Chat extends React.Component<Props & WithStyles<typeof styles>, State> {  
  state = {
    friendAddOpen: false,
    msg: ""
  }
  constructor(props){    
    super(props);
  }    
  
  onChange = (key) => (event) => {
      let x = {}
      x[key] = event.target.value;
      this.setState(x);
  } 
  handleFriendAddClose = () => {
      this.setState({friendAddOpen: false})
  }
  handleOpenFriendDialog = () => {
    this.setState({friendAddOpen: true})
    }
  handleFriendAdded = (friend: Friend) => {
      this.props.store.friendStore.addFriend(this.props.user, friend);
      this.handleFriendAddClose();
  }
  handleMsgChange = (event) =>{
      this.setState({msg: event.target.value});
  }
  sendMessage = () =>{
    // TODO: selected friend
    //this.props.store.chatStore.addChatMessage(this.props.user, {msg: this.state.msg, to: } as ChatMessage);
  }
  
  render() {    
    const  classes = this.props.classes;  
    const friends = this.props.store.friendStore.friends[this.props.user.name] &&
                    this.props.store.friendStore.friends[this.props.user.name].map(x => this.props.store.userStore.users[x.name] as User ) as User[];  
    return (<React.Fragment>
      <Paper className={classes.paper}>
        <div className={classes.friendsList}>
        <Button color="primary" className={classes.addFriend} onClick={this.handleOpenFriendDialog}>Add a Friend</Button>
        <List>
            {friends && friends.map(u => (
                <ListItem button key={u.name}>
                    <ListItemIcon><Avatar src={u.avatar} /></ListItemIcon> 
                    <ListItemText primary={u.name} secondary={u.online ? "online" : "offline"}></ListItemText>
                </ListItem>
            ) )}            
        </List>
        </div>
        <div className={classes.wrap}>
        <div className={classes.top}>
            <Typography className={classes.title} variant="h5" gutterBottom>
                {this.props.user.name}
            </Typography>
            <IconButton color="default" aria-label="close" component="span">
                <CloseIcon />
            </IconButton>                     
        </div>
        <div className={classes.scrollable} >
        <List>
            <ListItem key={1}>
                <ListItemIcon><Avatar>A</Avatar></ListItemIcon> 
                <ListItemText primary={"adam"} secondary={"Hello how are you doing?"} />
            </ListItem>
            <ListItem key={2}>
                <ListItemIcon><Avatar>U</Avatar></ListItemIcon> 
                <ListItemText primary={"you"} secondary={"Hey there Adam I am doing fine."} />
            </ListItem>
        </List>
        </div>
        <div className={classes.chat}>
            <div className={classes.flex}>
                <TextField value={this.state.msg} onChange={this.handleMsgChange} className={classes.msgBox} fullWidth placeholder="enter message" />
                <Fab onClick={this.sendMessage} style={ {width: 64, margin: 4} } color="primary" aria-label="send">
                    <SendIcon />
                </Fab>
            </div>
        </div>        
      </div>
      </Paper>
      <FriendDialog store={this.props.store} onClose={this.handleFriendAddClose} open={this.state.friendAddOpen} onFriendsAdded={this.handleFriendAdded}  />
      </React.Fragment>);       
  }
}

export default withRoot(withStyles(styles)(Chat));