import React from 'react';
import Link from './link';
import Node from './node'; 

const propTypes = {
	filter: React.PropTypes.string.isRequired,
	height: React.PropTypes.number.isRequired,
	links: React.PropTypes.array.isRequired,
	nodes: React.PropTypes.array.isRequired,
	width: React.PropTypes.number.isRequired
};

export default class Tree extends React.PureComponent{
	render() {
		return (
			<svg height={this.props.height} width={this.props.width}>
				{ this.props.links.map(link =>
					<Link key={link.target.name} {...link}/>)
				}
				{ this.props.nodes.map(node =>
					<Node key={node.name} filter={this.props.filter} {...node}/>)
				}
			</svg>);
	}
}

Tree.propTypes = propTypes;