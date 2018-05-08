import React from 'react';
import ColorCard from '../colorCard/colorCard';

export default class AvailableColors extends React.Component {

  constructor(props) {
    super(props);
    this.onColorAdd = this.onColorAdd.bind(this);
  }

  onColorAdd(colorId) {
    if (this.props.onColorSelect) {
      this.props.onColorSelect(colorId);
    }
  }

  render() {
    return (
      <div className="cards-container">
        {(this.props.colors.length === 0) ? <div className="empty-colors">Sorry, no colors...</div> : null}
        {this.props.colors.map((el, ind) =>
          <ColorCard color={this.props.colors[ind]} key={ind} onColorAdd={this.onColorAdd} />
        )}
      </div>
    );
  }
}