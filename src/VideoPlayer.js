import React from 'react';
import YouTube from 'react-youtube';

class VideoPlayer extends React.Component{
     constructor(){
        super();
     }

    render(){
        const opts = {
            height: '390',
            width: '640',
            playerVars: { 
                autoplay: 0
            }
        };
        
        return (
                <div>
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
            event.target.pauseVideo();
    }
}


export default VideoPlayer;