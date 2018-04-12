import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import {hashHistory} from 'react-router';

class VideoList extends React.Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.onKeyPress = this.onKeyPress.bind(this)
        this.focusVideo = this.focusVideo.bind(this)
    }
    handleClick(id){
         hashHistory.push({
            pathname: '/videoplayer',
            query: { id }
        })
    }
    onKeyPress(e){
        console.log(e.key,'--key--',document.querySelectorAll('.thumbnail.active')[0],'--target--')
        if((e.key == "ArrowRight" || e.key == "ArrowLeft")){
            this.focusVideo(e.key,e);
        }
        else if(e.key == "Enter"){
             ReactDOM.findDOMNode(document.querySelectorAll('.thumbnail.active')[0]).click();
        }
    }

    focusVideo(action,e){
        var currEle = document.querySelectorAll('.thumbnail.active');
        if(action=="ArrowRight" && (currEle[0].nextElementSibling != null)){
            currEle[0].classList.remove('active');
            currEle[0].nextElementSibling.classList.add('active');
        } else if(action=="ArrowLeft" && (currEle[0].previousElementSibling != null)){
            currEle[0].classList.remove('active');
            currEle[0].previousElementSibling.classList.add('active');
        }
    }

    componentDidMount(){
        document.addEventListener('keypress', this.onKeyPress);
    }
    render(){
        return(
            <div className="thumbnail-wrapper">
                {Object.keys(this.props.lists).length > 0 ?
                    Object.keys(this.props.lists).map((res, i) => {
                        return (
                            <div key={i} id={"thumbnail-"+i} ref={this.props.lists[res].id.videoId} className={"thumbnail " + (i == 0 ? 'active' : '')} onClick= {() => this.handleClick(this.props.lists[res].id.videoId)}>
                                <div><b>{this.props.lists[res].snippet.title}</b></div>
                                <img width={this.props.lists[res].snippet.thumbnails.default.width} height={this.props.lists[res].snippet.thumbnails.default.height} src={"http"+ this.props.lists[res].snippet.thumbnails.default.url.slice(5,this.props.lists[res].snippet.thumbnails.default.url.length)} alt="" />
                            </div>
                        )
                    }): ""}
            </div>
        )
    }
}

export default VideoList;