import PropTypes from 'prop-types';
import React from 'react';
import { setFilter } from '../Reducers/actions';

export default class Filter extends React.PureComponent {
	static propTypes = {
		filter: PropTypes.string.isRequired
	};

	handleChange(e) {
		setFilter(e.target.value);
	}

	render() {
		return (
			<input
				aria-label="Filter nodes"
				id="search"
				type="text"
				placeholder="Filter nodes..."
				value={this.props.filter}
				onChange={this.handleChange}/>
		);
	}
}