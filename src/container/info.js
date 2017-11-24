import React, { Component } from 'react';

class Info extends Component {
	constructor(props) { 
        super(props);
        this.state = {
        	time: 0,
        	score:0,
        	status:''
        }
        props.local.game.infoRefresh(this.infoRefresh.bind(this));
    } 
	infoRefresh(){
		this.setState({
			time:this.props.local.game.time,
			score :this.props.local.game.score,
			status:this.props.local.game.gameoverflag ? "GAME OVER" : ''
		});
	}
	render() {
		return (
		  <div className="info">
		    <div>已用时：<span id="local_time">{this.state.time}</span>s</div>
		    <div>已得分：<span id="local_score">{this.state.score}</span>分</div>
		    <div id="local_gameover">{this.state.status}</div>
		  </div>
		);
	}
}

export default Info;