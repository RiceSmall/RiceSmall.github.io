import React from 'react';
import HelloMessage from './child';
var aas={
		color:"red",
		fontSize:"50px"
	}


class App extends React.Component {
	
	aaa(){
		alert(555)
	}
	
	renderChoices(){
		var HelloMessage0=React.createFactory(HelloMessage);
		console.log(HelloMessage0)
		return HelloMessage0();
	}
	render(){
      return (
         <div>
         	<span onClick={this.aaa} style={aas}>点击</span>
            Hello World!!!<br />
         44444
            {console.log(aas)}
			{this.renderChoices()}
         </div>
      );
   }
}

export default App;