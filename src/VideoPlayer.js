import React from 'react';
import ReactDOM from 'react-dom';
import YouTube from 'react-youtube';

class VideoPlayer extends React.Component{
     constructor(props){
        super(props);
        this.onKeyPress = this.onKeyPress.bind(this)
        this.fullscreenHandler = this.fullscreenHandler.bind(this)
     }

     componentDidMount(){
        document.addEventListener('mozfullscreenchange', this.fullscreenHandler, false);
        document.addEventListener('keypress',this.onKeyPress)
     }

     fullscreenHandler(){
        if (document.mozFullScreenElement)
        {
            screen.orientation.lock('landscape');
        }
        else
            {
                screen.orientation.lock('natural');
            }
    }

     onKeyPress(e){
        let vdo =  YT.get(this.props.location.query.id)
        let vdoState = vdo.getPlayerState()
        if(e.key == "Enter"){
            if(vdoState == 1 || vdoState == 3){
               vdo.pauseVideo()
            }
            else if(vdoState == 2 || vdoState == 4){
                vdo.playVideo()
            }
        }
        else if(e.key == "6"){
            vdo.isMuted() ? vdo.unMute() : vdo.mute()
        }
        else if(e.key == "3"){
            let ele = document.getElementById(this.props.location.query.id);
            let requestFullScreen = ele.requestFullScreen || ele.mozRequestFullScreen || ele.webkitRequestFullScreen;
            if (requestFullScreen) {
                requestFullScreen.bind(ele)();
            }
        }
     }

    render(){
        const opts = {
            height: '100',
            width: '200',
            playerVars: { 
                autoplay: 1
            }
        };
        
        return (
                <div>
                    {this.props.location.query.id}
                    <YouTube
                        id={this.props.location.query.id}
                        videoId={this.props.location.query.id}
                        opts={opts}
                        onReady={this._onReady}
                    />
                </div>
            );
        }
 
        _onReady(event) {
            event.target.playVideo();
        }

}


export default VideoPlayer;