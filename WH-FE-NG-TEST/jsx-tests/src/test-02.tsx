/**
 * In the following React template, modify the component so that the counter correctly displays and it increments by one whenever the button is pressed. 
 * You are free to add classes and styles, but make sure you leave the element ID's as they are.
 */

import React from 'react';
import ReactDOM from 'react-dom';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    // Initialize state with count set to 0
    this.state = { count: 0 };
    // Bind the increment function to this component instance
    this.increment = this.increment.bind(this);
  }

  // Increment function to increase the count
  increment() {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  }

  render() {
    return (
      <div id="mainArea" style={{ textAlign: 'center' }}>
        <p>button count: <span>{this.state.count}</span></p>
        <button id="mainButton" onClick={this.increment}>Increase</button>
      </div>
    );
  }
}

ReactDOM.render(
  <Counter />,
  document.getElementById('test-02')
);
