import React from 'react';
import AppStore from './AppStore.js';
import VideoList from './VideoList';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.dataRecived = this.dataRecived.bind(this);
        this.state = { list: [] };
    }
    
    componentWillMount() {
        AppStore.getData(this.dataRecived);
    }

    dataRecived(data) {
       this.setState({ list: data });
    }

    render(){
        return (
            <div>
                {
                    <VideoList lists={this.state.list}/>
                }
            </div>
        )
    }
}

export default App;