import PropTypes from 'prop-types';
import React from 'react';
import { setFilter } from '../Reducers/actions';

function handleChange(e) {
	setFilter(e.target.value);
}

export default function Filter(props) {
	return (
		<input
			aria-label="Filter nodes"
			id="search"
			type="text"
			placeholder="Filter nodes..."
			value={props.filter}
			onChange={handleChange}/>
	);
}

Filter.propTypes = {
	filter: PropTypes.string.isRequired
};