import Game from './game';

class Local {
	constructor(){
		//游戏对象
		this.game = new Game(this.generateType(),this.generateType());
		// 方块时间间隔
		this.MOVEINTERVAL = 2000;
		// 定时器
		this.timer = null;
		//时间刷新
		this.SETINTERVAL = 1000;
		// 时间
		this.time = 0;
	}
	bindKeyEvent(){
		var self = this;
		document.onkeydown = (ee) => {
			var e = window.event || ee;
			// 键盘检测中，ie为e.keyCode ，chrome为 e.which
			var keyCode = e.keyCode || e.which;
			if(keyCode === 38) {  // up
				self.game.rotate();
			} else if(keyCode === 39) {  // right
				self.game.right();
			} else if(keyCode === 40) {  // down
				self.game.down();
			} else if(keyCode === 37) {  // left
				self.game.left();
			} else if(keyCode === 32) {  // space
				self.game.fall();
			}
		}
	}
	generateType(){
		return Math.ceil(Math.random() * 7) -1;
	}
	generateDir(){
		return Math.ceil(Math.random() * 4) -1;
	}
	move() {
		if(!this.game.down()) {
			this.game.fixed();
			var line = this.game.checkClear();
			if(line) {
				this.game.addScore(line);
			}
			var gameOver = this.game.checkGameOver();
			if(gameOver) {
				this.game.gameover(true);
				this.game.setTime(this.time);
				this.stop();
			} else {
				this.game.performNext(this.generateType(),this.generateDir());
			}
		}
	}
	// 随机生成干扰行
	generateBottomLine(lineNum) {
		var lines = [];
		for(var i = 0; i < lineNum; i++) {
			var line = [];
			for(var j = 0; j < 10; j++) {
				line.push(Math.ceil(Math.random() * 2) - 1);
			}
			lines.push(line);
		}
		return lines;
	}
	// 计时函数
	timeFun() {
		this.time += 1;
		this.game.setTime(this.time);
	}
	start() {
		this.bindKeyEvent();
		this.game.performNext(this.generateType(), this.generateDir());
		this.moveTimer = setInterval(this.move.bind(this), this.MOVEINTERVAL);
		this.setTimer = setInterval(this.timeFun.bind(this), this.SETINTERVAL);
	}
	stop(){
		if(this.moveTimer || this.setTimer) {
			clearInterval(this.moveTimer);
			clearInterval(this.setTimer);
			this.moveTimer = null;
			this.setTimer = null;
			document.onkeydown = null;
		}
	}
}
export default Local;