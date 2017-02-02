// @flow

import React, {Component} from 'react';
import autobind from 'class-autobind';

type State = {
  timer: {
    hour: number;
    min: number;
    sec: number;
  };
  run: number;
};

class Stopwatch extends Component {
  state: State;

  constructor() {
    super();
    this.state = {
      timer: {
        hour: 0,
        min: 0,
        sec: 0,
      },
      run: -1,
    };

    autobind(this);
  }

  start() {
    if (this.state.run === -1) {
      let running = setInterval(this.run, 1000);
      this.setState({run: running});
    }
  }

  stop() {
    clearInterval(this.state.run);
    this.setState({run: -1});
  }

  run() {
    let {hour, min, sec} = this.state.timer;
    sec++;
    if (sec > 59) {
      sec = 0;
      min++;
    }
    if (min > 59) {
      min = 0;
      hour++;
    }
    this.setState({
      timer: {
        hour: hour,
        min: min,
        sec: sec,
      },
    });
  }

  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <h1>
            {(this.state.timer.hour < 10) ? ('0' + this.state.timer.hour) : (this.state.timer.hour) }
            &nbsp;:&nbsp;
            {(this.state.timer.min < 10) ? ('0' + this.state.timer.min) : (this.state.timer.min)}
            &nbsp;:&nbsp;
            {(this.state.timer.sec < 10) ? ('0' + this.state.timer.sec) : (this.state.timer.sec)}
          </h1>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            {
              (this.state.run !== -1) ?
              (<button type="text" onClick={this.stop}>Stop</button>) :
              (<button type="text" onClick={this.start}>Start</button>)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Stopwatch;
