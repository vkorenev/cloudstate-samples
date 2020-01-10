import { RouterStore } from 'mobx-react-router';
import { observable, computed, toJS } from 'mobx';

const routingStore = new RouterStore();
//const apiController = new ApiController();

/*
class UserStore{
    @observable users: { [id:string]:User } = {};    
    @observable you: User = undefined;
    @computed get stream(){
        return Object.keys(this.users).map(x => this.users[x]).sort( (a, b) => b.email.localeCompare(a.email) )
    }
    addUser(t: User) {
        this.users[t.email] = t
    }
    addUserList(list: User[]){
        list.map( x => this.addUser(x));
    }
    login(user: User){
        this.you = user;
    }
}
*/

//const userStore = new UserStore();


const stores = {
    routing: routingStore,    
} 

export default stores;