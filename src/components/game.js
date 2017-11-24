import SquareFactory from '../factory/squareFactory';

class Game {
	constructor(...props){
		// 游戏矩阵
		this.gameData = [  //20*10
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],	
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],	
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],	
		];
		this.cur={};
		this.next = (new SquareFactory()).make(props[0], props[1]);
		this.score = 0;	
		this._nextRefresh = function(){};
		this._infoRefresh = function(){};
		this.gameoverflag = false;
	}
	isValid(pos, data) {
		for(var i=0; i<data.length; i++) {
			for(var j=0; j<data[0].length; j++) {	
				if(data[i][j] !== 0) {
					if(!this.check(pos, i, j)) {
						return false;
					}
				}
			}
		}	
		return true;
	}
	check(pos, x, y){
		if((pos.x + x < 0) || (pos.x + x >= this.gameData.length) || (pos.y + y < 0) || (pos.y + y >= this.gameData[0].length) || (this.gameData[pos.x + x][pos.y + y] === 1)) {
			return false;
		} else {
			return true;
		}
	}
	clearData() {
		for(var i=0; i<this.cur.data.length; i++) {
			for(var j=0; j<this.cur.data[0].length; j++) {
				if(this.check(this.cur.origin, i, j)) {
					this.gameData[this.cur.origin.x + i][this.cur.origin.y + j] = 0;
				}
			}
		}
	}
	setData(){
		for(var i=0; i<this.cur.data.length; i++) {
			for(var j=0; j<this.cur.data[0].length; j++) {
				if(this.check(this.cur.origin, i, j)) {
					this.gameData[this.cur.origin.x + i][this.cur.origin.y + j] = this.cur.data[i][j];
				}
			}
		}
	}
	refresh(_refresh){
		if(arguments.length === 0) {
			this.setData();
			this._refresh();
		} else {
			this._refresh = _refresh;
		}
	}
	down(){
		if(this.cur.canDown(this.isValid.bind(this))) {
			this.clearData();
			this.cur.down();
			this.refresh();
			return true;
		} else {
			return false;
		}
	}
	// 左移
	left() {
		if(this.cur.canLeft(this.isValid.bind(this))) {
			this.clearData();
			this.cur.left();
			this.refresh();
		}		
	}	
	// 右移
	right() {
		if(this.cur.canRight(this.isValid.bind(this))) {
			this.clearData();
			this.cur.right();
			this.refresh();
		}		
	}	
	// 旋转
	rotate() {
		if(this.cur.canRotate(this.isValid.bind(this))) {
			this.clearData();
			this.cur.rotate();
			this.refresh();
		}		
	}
	fall(){
		while(this.down());
	}
	// 方块移动到底部时进行固定
	fixed() {
		for(var i=0; i<this.cur.data.length; i++) {
			for(var j=0; j<this.cur.data[0].length; j++) {
				if(this.check(this.cur.origin, i ,j)) {
					if(this.gameData[this.cur.origin.x + i][this.cur.origin.y + j] === 2) {
						this.gameData[this.cur.origin.x + i][this.cur.origin.y + j] = 1;
					}
				}
			}
		}
		this.refresh();
	}
	infoRefresh(_infoRefresh){
		this._infoRefresh = _infoRefresh;
	}
	nextRefresh(_nextRefresh){
		this._nextRefresh = _nextRefresh;
	}
	// 消行
	checkClear() {		
		var line = 0;
		for(var i=this.gameData.length - 1; i >= 0; i--) {
			var clear = true;
			for(var j=0; j < this.gameData[0].length; j++) {
				if(this.gameData[i][j] !== 1) {
					clear = false;
					break;
				}
			}
			if(clear) {
				line += 1;
				for(var m = i; m > 0; m--) {
					for(let n = 0; n < this.gameData[0].length; n++) {
						this.gameData[m][n] = this.gameData[m-1][n];
					}
				}
				for(let n = 0; n < this.gameData[0].length; n++) {
					this.gameData[0][n] = 0;
				}
				i++;
			}
		}
		return line;
	}
	// 加分
	addScore(line) {
		var s = 0;
		switch((line)) {
			case 1:
				s = 10;
				break;
			case 2:
				s = 30;
				break;
			case 3:
				s = 60;
				break;
			case 4:
				s = 100;
				break;
			default:
				break;			
		}
		this.score += s;
		return this.score;
	}
	// 使用下一个方块
	performNext(type, dir) {
		this.cur = this.next;
		this.setData();
		this.next = (new SquareFactory()).make(type,dir);
		this._nextRefresh();
	}
	checkGameOver(){
		var gameOver = false;
		for(var i = 0; i < this.gameData[0].length; i++) {
			if(this.gameData[1][i] === 1) {
				gameOver = true;
			}
		}
		return gameOver;
	}
	// 游戏结束
	gameover(win){
		this.gameoverflag = win; //'你赢了';
	}
	//时间计数
	setTime(time){
		this.time = time;
		this._infoRefresh();
	}

}
export default Game;