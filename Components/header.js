import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { setActiveNode, setFilter, resize } from '../Reducers/actions';
import Filter from './filter';

function handleClick() {
	setActiveNode(null);
	setFilter('');
}

export default function Header(props) {
	useEffect(resize, []);

	return (
		<header id="header">
			<Filter filter={props.filter}/>
			<button onClick={handleClick}>Reset</button>
			<a href="https://github.com/jpb12/tree-viewer">View Source</a>
			<span>Last Updated: {props.timestamp}</span>
		</header>
	);
}

Header.propTypes = {
	filter: PropTypes.string.isRequired,
	timestamp: PropTypes.string
};