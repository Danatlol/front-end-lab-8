import React from 'react';

export default class ColorCard extends React.Component {

  constructor(props) {
    super(props);
    this.onAddBtnClick = this.onAddBtnClick.bind(this);
  }

  onAddBtnClick() {
    if (this.props.onColorAdd) {
      this.props.onColorAdd(this.props.color.id);
    }
  }

  render() {
    return (
      <div className="color-card" style={{ background: this.props.color.color }}>
        <button className="color-card-btn" onClick={this.onAddBtnClick}><i className="material-icons">add</i><span>Add</span></button>
      </div>
    );
  }
}