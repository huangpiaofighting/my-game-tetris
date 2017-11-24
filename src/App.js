import React, { Component } from 'react';
import GameContainer from './container/gameContainer';
import Next from './container/next';
import Info from './container/info';
import Local from './components/local';
import './App.css';

class App extends Component {
  constructor(props) { 
    super();
    this.local = new Local();
    this.local.start();
  }
  render() {
    return (
      <div>
        <div>请用方向键和空格键进行操作：上->旋转，右->右移，下->下移，空格->坠落</div>
        <div className="square" id="local">
          <div className="title">我的游戏区域</div>
          <GameContainer local={this.local}/>
          <Next local={this.local}/>
          <Info local={this.local}/>
        </div>
      </div>
    );
  }
}

export default App;
