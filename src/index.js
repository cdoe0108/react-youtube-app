import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory, hashHistory, Redirect } from 'react-router';

//place all the components here
import App from './App.js';
import VideoPlayer from './VideoPlayer.js'

window.YTConfig = {
  host: 'http://www.youtube.com' 
} 

ReactDOM.render(<Router history={hashHistory}>
    <Route path="/" component={App}></Route>
    <Route path="/videoplayer" component={VideoPlayer}/>
  </Router>, document.getElementById('react-root'));
