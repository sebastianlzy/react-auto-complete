import React from 'react';
import PropTypes from 'prop-types';

import map from 'lodash-es/map';
import './recommendedItems.scss';

class RecommendedItems extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        fullName: PropTypes.string.isRequired,
        description: PropTypes.string,
      })
    ),
    onClick: PropTypes.func.isRequired,
    onMouseOver: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
  };

  handleClick = (value) => () => {
    this.props.onClick(value)
  };

  handleMouseOver = (idx) => () => {
    this.props.onMouseOver(idx)
  };

  renderRecommendedItem = () => {
    return map(this.props.items, (item, idx) => {
      const additionalClassName = idx === this.props.selectedIdx ? 'recommended-item-selected' : '';
      return (
        <div
          className={`recommended-item ${additionalClassName}`}
          key={idx}
          onClick={this.handleClick(item.fullName)}
          onMouseOver={this.handleMouseOver(idx)}
        >
          <div className="full-name">
            {item.fullName}
          </div>
          <div className="description">
            {item.description}
          </div>
        </div>
      )
    })
  };

  render() {
    return (
      <div
        className="auto-complete__recommended-items"
        onKeyDown={this.handleKeyDown}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        {this.renderRecommendedItem()}
      </div>
    )
  }
}

export default RecommendedItems;
