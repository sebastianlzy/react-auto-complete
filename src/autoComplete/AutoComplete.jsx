import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash-es/get';
import isEmpty from 'lodash-es/isEmpty';
import debounce from 'lodash-es/debounce';

import './autoComplete.scss';
import * as api from './api'
import helper from './helper';
import RecommendedItems from './RecommendedItems.jsx';
import {getCache, setCache} from './helper/cache';

class AutoComplete extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    limit: PropTypes.number,
  };
  static defaultProps = {
    onSubmit: (evt) => {
      console.log(`Submitted :: ${get(evt, 'target.value')}` )
    },
    limit: 10
  };
  state = {
    searchValue: '',
    recommendedItems: [],
    selectedIdx: -1,
    isRecommendationShown: false,
    isBlurIgnore: false,
  };

  getRecommendedItems = (searchValue) => {
    return Promise.resolve(getCache(searchValue))
      .then((result) => {
        if (result.data) {
          return result.data
        }
        throw 'No Cache result found'
      })
      .catch(() => api.getSearchResult(searchValue))
      .then((results) => {
        setCache(searchValue, results);
        const recommendedItems = helper.formatSearchResult(results);
        this.setState(() => ({recommendedItems, isRecommendationShown: true}));
      })
      .catch((err) => console.error(err))
  };

  getRecommendedItemsWithDebounce = debounce(this.getRecommendedItems, 500);

  handleChange = (evt) => {
    const searchValue = get(evt, 'target.value');
    this.setState(() => ({searchValue}));
    this.getRecommendedItemsWithDebounce(searchValue);
  };

  handleRecommendedItemClick = (searchValue) => {
    this.setState({searchValue, isRecommendationShown: false});
  };

  handleMouseOver = (selectedIdx) => {
    this.setState({selectedIdx});
  };

  renderRecommendedItems = () => {
    if (isEmpty(this.state.recommendedItems)) {
      return null;
    }

    return (
      <RecommendedItems
        items={this.state.recommendedItems.slice(0, this.props.limit)}
        onClick={this.handleRecommendedItemClick}
        selectedIdx={this.state.selectedIdx}
        onMouseOver={this.handleMouseOver}
        onMouseEnter={() => this.setState({isBlurIgnore: true})}
        onMouseLeave={() => this.setState({isBlurIgnore: false})}
      />
    );
  };

  handleSubmit = () => {
    this.props.onSubmit({target: {value: this.state.searchValue}})
  };

  handleKeyDown = (evt) => {
    const keyMapper = {
      arrowDown: 40,
      arrowUp: 38,
      enter: 13
    };

    if (evt.keyCode === keyMapper['arrowDown'] && this.state.selectedIdx < this.props.limit - 1) {
        evt.preventDefault();
        this.setState({selectedIdx: this.state.selectedIdx + 1});
    }
    if (evt.keyCode === keyMapper['arrowUp'] && this.state.selectedIdx > 0) {
      evt.preventDefault();
      this.setState({selectedIdx: this.state.selectedIdx - 1});
    }
    if(evt.keyCode === keyMapper['enter']) {
      evt.preventDefault();
      this.setState({searchValue: get(this.state.recommendedItems, `${this.state.selectedIdx}.fullName`, '')});
    }
  };

  handleBlur = () => {
    if (this.state.isBlurIgnore) {
      return null;
    }
    this.setState({isRecommendationShown: false});
  };

  render() {
    return (
      <div className="auto-complete">
        <input
          onFocus={() => this.setState({isRecommendationShown: true})}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          className="auto-complete__input"
          value={this.state.searchValue}
          placeholder="Search Github Repo"
          onKeyDown={this.handleKeyDown}
        />
        <button className="auto-complete__submit-btn" onClick={this.handleSubmit}>
          Submit
        </button>
        {this.state.isRecommendationShown ? this.renderRecommendedItems() : null}
      </div>
    );
  }
}

export default AutoComplete;
