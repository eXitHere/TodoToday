import './App.css';
import Header from './Components/Header';
import Todo from './Components/Todo';
import ErrorBoundary from './ErrorBoundary.js';
import react from 'react';

import {init} from './Database/DatabaseController';
class mainApp extends react.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isToday: true,
      setupComplete: false
    };
  }

  componentDidMount() {
    init()
      .then(() => {
        this.setState({setupComplete: true});
      })
  }
  
  render() {

    function middle(value) {
      this.setState({isToday: value});
      // console.log("in main:", this.state.isToday);
    }
    
    return (
      <ErrorBoundary>
        {
          this.state.setupComplete &&
          <div className="App">
            <Todo isToday={this.state.isToday} /> 
            <Header isToday={this.state.isToday} callback={middle.bind(this)} />
          </div>
        }
      </ErrorBoundary>
    );
  }
}

export default mainApp;