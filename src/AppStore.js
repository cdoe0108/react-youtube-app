import Dispatcher from './AppDispatcher.js';
import { EventEmitter } from 'events';

class AppStore extends EventEmitter {
  constructor() {
    super();
    this.getData = this.getData.bind(this);
  }
  getData(cb = null) {
     // const apiUrl = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=Ks-_Mh1QhMc,c0KYU2j0TM4,eIho2S0ZahI&key=AIzaSyBzYxWSgwmN3bM_PU6PKtjkMMhjq0no8-E";
      const apiUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=redux&key=AIzaSyBzYxWSgwmN3bM_PU6PKtjkMMhjq0no8-E";
      //const apiUrl = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=1cH2cerUpMQ,tnncRm1yrWk&key=AIzaSyBzYxWSgwmN3bM_PU6PKtjkMMhjq0no8-E";
     
      var request = new XMLHttpRequest();
      request.onreadystatechange = (e) => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          cb(JSON.parse(request.response).items)
        } else {
          console.log(request.response)
        }
      };
      request.open('GET', apiUrl);
      request.send({});
  }
  handleActions(payload){
    var action = payload.action;
    this.getData(action.data);
  }
}
const appStore = new AppStore();

Dispatcher.register(appStore.handleActions.bind(appStore));
export default appStore;
window.Dispatcher = Dispatcher;