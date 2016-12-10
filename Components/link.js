import React from 'react';
import d3 from 'd3';

const propTypes = {
	source: React.PropTypes.object.isRequired,
	target: React.PropTypes.object.isRequired
};

const diagonal = d3.svg.diagonal().projection(d => [d.y, d.x]);

export default class Link extends React.PureComponent{
	render() {
		let d = diagonal({
			source: this.props.source,
			target: this.props.target
		});

		return (
			<path
				className="link"
				d={d}/>);
	}
}

Link.propTypes = propTypes;