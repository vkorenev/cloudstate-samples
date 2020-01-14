import { RouterStore } from 'mobx-react-router';
import { observable, computed, toJS } from 'mobx';

const routingStore = new RouterStore();
//const apiController = new ApiController();


export interface User{
    name: string;
    avatar: string;
    online: boolean;
}

export interface Friend{
    name: string;
}

export interface ChatMessage{
    to: string;
    msg: string;
}

class UserStore{
    @observable users: { [id:string]:User } = {};    
    @computed get stream(){
        return Object.keys(this.users).map(x => this.users[x]).sort( (a, b) => b.name.localeCompare(a.name) )
    }
    addUser(t: User) {
        this.users[t.name] = t
    }
    addUserList(list: User[]){
        list.map( x => this.addUser(x));
    }   
}

class FriendStore{
    @observable friends: { [id:string]:Friend[] } = {};        
    addFriend(u: User, f: Friend) {
        if(!this.friends[u.name])this.friends[u.name] = [];
        this.friends[u.name] = [...this.friends[u.name], f];
        if(!this.friends[f.name])this.friends[f.name] = [];
        this.friends[f.name] = [...this.friends[f.name], {name: u.name} as Friend]
    }   
}

class ChatStore{
    @observable chats: { [id:string]:ChatMessage[] } = {};     
    mkKey = (name1: string, name2: string) => [name1, name2].sort( (a, b) => b.localeCompare(a) ).join("-")
    addChatMessage(u: User, m: ChatMessage) {
        const key = this.mkKey(u.name, m.to);
        if(!this.chats[key])this.chats[key] = [];
        this.chats[key] = [...this.chats[key], m];        
    }  
    getChatMessages(u: User, friend: Friend){
        const key = this.mkKey(u.name, friend.name);
        if(!this.chats[key])this.chats[key] = [];
        return this.chats[key] = [];
    } 
}


const userStore = new UserStore();
const friendStore = new FriendStore();
const chatStore = new ChatStore();


const stores = {
    routing: routingStore, 
    userStore,
    friendStore,
    chatStore
} 

export default stores;