import PropTypes from 'prop-types';
import React from 'react';
import { setFilter } from '../Reducers/actions';

const propTypes = {
	filter: PropTypes.string.isRequired
};

export default class Filter extends React.PureComponent {
	handleChange(e) {
		setFilter(e.target.value);
	}

	render() {
		return (
			<input
				id="search"
				type="text"
				placeholder="Filter nodes..."
				value={this.props.filter}
				onChange={this.handleChange}/>);
	}
}

Filter.propTypes = propTypes;