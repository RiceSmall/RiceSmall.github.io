import React from 'react';

var HelloMessage = React.createClass({
  getInitialState: function() {
    return {value: '小赵田阔!'};
  },
  handleChange: function(event) {
    this.setState({value:'赵田小'})
  },
  render: function() {
    var value = this.state.value;
    return <div>
            <button onClick={this.handleChange}>点我</button>
            <h4>{value}</h4>
           </div>;
  }
});


export default HelloMessage;