import React, { Component } from 'react';
import Container from '../components/container';

class Next extends Component {
  	constructor(props) { 
        super(props);
        this.state = {
        	data: props.local.game.next.data
        }
        props.local.game.nextRefresh(this.nextRefresh.bind(this));
    } 
    nextRefresh(){
    	this.setState({
    		data : this.props.local.game.next.data
    	});
    }
	render() {
		return (
		  <div>
		    <div className="next" id="local_next">
		    <Container data={this.state.data}/>
		    </div>
		  </div>
		);
	}
}

export default Next;