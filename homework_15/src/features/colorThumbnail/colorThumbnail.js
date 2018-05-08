import React from 'react';

export default class ColorThumbnail extends React.Component {

    constructor(props) {
        super(props);
        this.onCloseBtnClick = this.onCloseBtnClick.bind(this);
    }

    onCloseBtnClick() {
        if (this.props.onColorRemove) {
            this.props.onColorRemove(this.props.color.id);
        }
    }

    render() {
        return (
            <div className="color-thumbnail" onClick={this.onCloseBtnClick} style={{ background: this.props.color.color }}>
                <div className="close-btn"><i className="material-icons">clear</i></div>
            </div>
        );
    }
}