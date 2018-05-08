import React, { Component } from 'react';
// This plugin automatically reload page on changes
import { hot } from 'react-hot-loader';

import AmountColors from './features/amountColors/amountColors';
import AvailableColors from './features/availableColors/availableColors';
import FilterColors from './features/filterColors/filterColors';
import SelectedColors from './features/selectedColors/selectedColors';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableColors: [],
      filteredColors: [],
      selectedColors: [],
      filterStr: ""
    };
    this.onFilterChanged = this.onFilterChanged.bind(this);
    this.onColorSelect = this.onColorSelect.bind(this);
    this.onColorRemove = this.onColorRemove.bind(this);
  }

  componentDidMount() {
    let url = 'https://epam-fe-homework-15.firebaseio.com/colors.json';
    fetch(url)
      .then(res => res.json())
      .then((out) => {
        this.setState({ availableColors: out, filteredColors: out });
      })
      .catch(err => { throw err });
  }

  onFilterChanged(filterStr) {
    const result = this._filterArr(filterStr, this.state.availableColors);
    this.setState({ filteredColors: result, filterStr: filterStr });
  }

  onColorSelect(colorId) {
    let addColor;
    const resultAvailable = this.state.availableColors.filter((el) => {
      if (el.id === colorId) {
        addColor = el;
        return false;
      }
      return true;
    });

    const resultFiltered = this._filterArr(this.state.filterStr, resultAvailable);

    const resultSelected = this.state.selectedColors.filter(() => true);
    resultSelected.push(addColor);

    this.setState({ 
      availableColors: resultAvailable,
      filteredColors: resultFiltered,
      selectedColors: resultSelected
    });
  }

  onColorRemove(colorId) {
    let removeColor;
    const resultSelected = this.state.selectedColors.filter((el) => {
      if(el.id === colorId) {
        removeColor = el;
        return false;
      }
      return true;
    });

    const resultAvailable = this.state.availableColors.filter(() => true);
    resultAvailable.push(removeColor);

    const resultFiltered = this._filterArr(this.state.filterStr, resultAvailable);

    this.setState({
      availableColors: resultAvailable,
      filteredColors: resultFiltered,
      selectedColors: resultSelected });
  }

  _filterArr(filter, arr) {
    const regEx = new RegExp(filter);
    return arr.filter((el, ind) => {
      if (regEx.test(el.tags.join(" "))) {
        return true;
      }
      else {
        return false;
      }
    });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="panel">
          <FilterColors filterChanged={this.onFilterChanged} />
          <SelectedColors colors={this.state.selectedColors} onColorRemove={this.onColorRemove} />
        </div>
        <AmountColors amount={this.state.filteredColors.length} />
        <AvailableColors colors={this.state.filteredColors} onColorSelect={this.onColorSelect} />
      </div>
    );
  }
}

// Note: Hot reloading occurs after you save file in the editor.
export default hot(module)(App);