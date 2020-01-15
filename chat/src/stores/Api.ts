
import { User, Friend, ChatMessage } from '../stores';
import { Friend as Friendpb, Empty, User as Userpb, FriendsList, FriendRequest } from '../_proto/friends_pb';
import { FriendsClient, ServiceError } from '../_proto/friends_pb_service';
import { BrowserHeaders } from 'browser-headers';
import { PresenceClient, ResponseStream } from '../_proto/presence_pb_service';
import { User as UserPesence, OnlineStatus } from '../_proto/presence_pb';

export class Api{
    store: any = null;
    host = "http://localhost:9090";

    presenceStreams: {[id:string]:ResponseStream<OnlineStatus>} = {};
  
    setStore = (store) => {
        this.store = store;
    }


    addFriend = (user: User, friend: Friend) => {
        console.log("api addFriend for: ", {user,friend});
        const friendpb = new Friendpb();
        friendpb.setUser(friend.name);
        friendpb.setAvatar(friend.avatar);
        const friendRequest = new FriendRequest();
        friendRequest.setUser(user.name);
        friendRequest.setFriend(friendpb);
        
        const client = new FriendsClient(this.host);    
        const metadata = new BrowserHeaders({'custom-header-1': 'value1'});
        console.log("friend Request", friendRequest);
        client.add(friendRequest, metadata, (err: ServiceError, response: Empty) => {            
            console.log("err", err);
            const userpb = new Userpb();
            userpb.setUser(user.name)
            client.getFriends(userpb, metadata,  (err: ServiceError, response: FriendsList) => {
                    if(!err){
                        response.getFriendsList().map( f => {
                            console.log("user: " + user.name + "adding friend", f);
                            this.store.friendStore.addFriend(user, {name: f.getUser(), avatar: f.getAvatar()} as Friend );
                            this.store.userStore.addUser(user, {name: f.getUser(), avatar: f.getAvatar()} as User );
                        })
                    }else{
                        console.error("ERROR getting friends", err);
                    }
                });
        });  
        // Reciprical 
        const friendRequest2 = new FriendRequest();
        const friendpb2 = new Friendpb();
        friendpb2.setUser(user.name);
        friendpb2.setAvatar(user.avatar);
        friendRequest2.setUser(friend.name);
        friendRequest2.setFriend(friendpb2);
        client.add(friendRequest2, metadata, (err: ServiceError, response: Empty) => {            
            console.log("err", err);
            const userpb = new Userpb();
            userpb.setUser(user.name)
            client.getFriends(userpb, metadata,  (err: ServiceError, response: FriendsList) => {
                    if(!err){
                        response.getFriendsList().map( f => {
                            console.log("user: " + friend.name + "adding friend", user);
                            this.store.friendStore.addFriend(friend as User, user as Friend );                            
                        });
                    }else{
                        console.error("ERROR getting friends", err);
                    }
                });
        });           
    }

    addUser = (user: User) => {
        console.log("addUser", user);
        this.store.userStore.addUser( {...user, online: true} );
        const client = new PresenceClient(this.host);    
        const metadata = new BrowserHeaders({'custom-header-1': 'value1'});
        
        const upb = new Userpb();
        upb.setUser(user.name)
        const fclient = new FriendsClient(this.host);    
        console.log("getFriends", upb);
        fclient.getFriends(upb, metadata,  (err: ServiceError, response: FriendsList) => {
            console.log("GOT", response)
            if(!err){
                response.getFriendsList().map( f => {
                    console.log("user: " + user.name + "adding friend", f);
                    this.store.friendStore.addFriend(user, {name: f.getUser(), avatar: f.getAvatar()} as Friend );
                    if(!this.store.userStore.users[f.getUser()]){
                        this.store.userStore.addUser({name: f.getUser(), avatar: f.getAvatar()} as User );
                    }
                })
            }else{
                console.error("ERROR getting friends", err);
            }
        });
                
        const userpb = new UserPesence();
        userpb.setName(user.name);
        client.connect(userpb, metadata);
        const presenceStream = client.monitor(userpb,metadata);
        if(this.presenceStreams[user.name])delete this.presenceStreams[user.name];
        this.presenceStreams[user.name] = presenceStream;
        presenceStream.on("status", (status) =>{
            console.log("status", status);
            if(status.code == 0){   // connection ok
                presenceStream.on("end", () =>{
                    console.log("stream end for user", user);
                    this.store.userStore.users[user.name].online = false;
                });
            }
        });   
        
    }

    userOffline = (user: User) => {
        this.store.userStore.users[user.name].online = false;
        if(this.presenceStreams[user.name]){
            this.presenceStreams[user.name].cancel();
            delete this.presenceStreams[user.name];
        }
    }
}


export default Api;