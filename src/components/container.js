import React, { Component } from 'react';

class Container extends Component{
	constructor(props) {
		super();
    }
    render(){
    	var len = this.props.data.length;
    	var style =['none','done','current'];
    	this.divs = [];
    	for(var i=0; i<len; i++) {
			var div = [],
				len_0 = this.props.data[0].length;
			for(var j=0; j<len_0; j++) {
				var jsx = <div className={style[this.props.data[i][j]]} style={{'top':(i*20 + 'px'),'left':((j*20) + 'px')}}></div>;
				div.push(jsx);
			}
			this.divs.push(div);
		}
    	return this.divs;
    }
}
export default Container;