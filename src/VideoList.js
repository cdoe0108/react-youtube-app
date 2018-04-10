import React from 'react';
import './index.less';
import {hashHistory} from 'react-router';

class VideoList extends React.Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(id){
         //hashHistory.push('/videoplayer/'+id)
         hashHistory.push({
            pathname: '/videoplayer',
            query: { id }
        })
    }
    render(){
        return(
            <div className="thumbnail-wrapper">
                {Object.keys(this.props.lists).length > 0 ?
                    Object.keys(this.props.lists).map((res, i) => {
                        return (
                            <div key={i} ref={this.props.lists[res].id} className="thumbnail" onClick=  { () => this.handleClick(this.props.lists[res].id.videoId) }>
                                <img width={this.props.lists[res].snippet.thumbnails.default.width} height={this.props.lists[res].snippet.thumbnails.default.height} src={"http"+ this.props.lists[res].snippet.thumbnails.default.url.slice(5,this.props.lists[res].snippet.thumbnails.default.url.length)} alt="" />
                            </div>
                        )
                    }): ""}
            </div>
        )
    }
}

export default VideoList;