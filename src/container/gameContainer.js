import React, { Component } from 'react';
import Container from '../components/container';

class GameContainer extends Component {
	constructor(props) { 
        super(props);
        this.game = props.local.game;
        this.state = {
        	query: this.game.cur,
        	gameData:this.game.gameData
        }
        this.game.setData();
        this.game.refresh(this.refresh.bind(this));
    }
    refresh(){
    	this.setState({
    		gameData : this.game.gameData
    	});
    }
	render() {
		return (
		  <div>
		    <div className="game" id="local_game">
		    	<Container data={this.state.gameData}/>
		    </div>
		  </div>
		);
	}
}

export default GameContainer;