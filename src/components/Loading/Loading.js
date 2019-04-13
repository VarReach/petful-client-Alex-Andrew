import React, { Component } from 'react';

let _timeoutId;


export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 3,
    };
  }


  componentDidMount() {
    _timeoutId = setTimeout(() => this.changeNum(), 800);
  }

  componentWillUnmount() {
    clearTimeout(_timeoutId);
  }

  changeNum() {
    let {num} = this.state;
    if (num === 3) {
      num = 0;
    } else {
      num++;
    }
    this.setState({ num });
    _timeoutId = setTimeout(() => this.changeNum(), 800);
  }

  render() {
    return (
      <p>You are in queue position: {this.props.queuePos}{'.'.repeat(this.state.num)}</p>
    )
  }
}