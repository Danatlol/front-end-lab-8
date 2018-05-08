import React from 'react';

export default class FilterColors extends React.Component {

  constructor(props) {
    super(props);
    this.keyDownHandler = this.keyDownHandler.bind(this);
  }

  keyDownHandler(eve) {
    if (this.props.filterChanged) {
      this.props.filterChanged(eve.target.value);
    }
  }

  render() {
    return (
      <div>
        <input className="filter-field" placeholder="Color's name, tags" type="text" onChange={this.keyDownHandler} />
      </div>
    );
  }
}