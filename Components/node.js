import React from 'react';
import { setActiveNode } from '../Reducers/actions';

const propTypes = {
	name: React.PropTypes.string.isRequired,
	filter: React.PropTypes.string,
	x: React.PropTypes.number.isRequired,
	y: React.PropTypes.number.isRequired
};

export default class Node extends React.PureComponent{
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		setActiveNode(this.props.name);
	}
	getTransform() {
		return 'translate(' + this.props.y + ', ' + this.props.x + ')';
	}
	getClassName() {
		if (!this.props.filter) {
			return '';
		}
		if (this.props.name.toLowerCase().indexOf(this.props.filter) === -1) {
			return 'searchExcluded';
		}
		return 'searchIncluded';
	}
	render() {
		return (
			<g className="node" transform={this.getTransform()} onClick={this.handleClick}>
				<circle r="4.5"/>
				<text className={this.getClassName()} dx="5" dy=".40em">
					{this.props.name}
				</text>
			</g>);
	}
}

Node.propTypes = propTypes;