import PropTypes from 'prop-types';
import React from 'react';
import { setActiveNode, setFilter, resize } from '../Reducers/actions';
import Filter from './filter';

export default class Header extends React.PureComponent {
	static propTypes = {
		filter: PropTypes.string.isRequired,
		timestamp: PropTypes.string
	};

	componentDidMount() {
		resize();
	}

	handleClick() {
		setActiveNode(null);
		setFilter('');
	}

	render() {
		return (
			<header id="header">
				<Filter filter={this.props.filter}/>
				<button onClick={this.handleClick}>Reset</button>
				<a href="https://github.com/jpb12/tree-viewer">View Source</a>
				<span>Last Updated: {this.props.timestamp}</span>
			</header>
		);
	}
}