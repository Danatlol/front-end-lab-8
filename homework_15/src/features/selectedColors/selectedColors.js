import React from 'react';
import ColorThumbnail from '../colorThumbnail/colorThumbnail';

export default class SelectedColors extends React.Component {

  constructor(props) {
    super(props);
    this.onColorRemove = this.onColorRemove.bind(this);
  }

  onColorRemove(colorId) {
    if (this.props.onColorRemove) {
      this.props.onColorRemove(colorId);
    }
  }

  render() {
    const colors = this.props.colors.slice(-5);
    const result = [];
    if(colors.length === 0) {
      result.push(<div className="color-empty-token first-token-border" key={1}></div>);
      result.push(<div className="color-empty-token second-token-border" key={2}></div>);
      result.push(<div className="color-empty-token third-token-border" key={3}></div>);
    }

    for (let i = 0; i < colors.length; ++i) {
      result.push(<ColorThumbnail color={colors[i]} key={i} onColorRemove={this.onColorRemove} />);
    }
    return (
      <div className="selected-container">
        {result}
      </div>
    );
  }
}