import React from 'react';
import Tree from './tree';
import d3 from 'd3';

const propTypes = {
	activeNode: React.PropTypes.string,
	data: React.PropTypes.object,
	filter: React.PropTypes.string,
	height: React.PropTypes.number,
	width: React.PropTypes.number
};

export default class TreeContainer extends React.PureComponent{
	getRoot(json) {
		if (json.name === this.props.activeNode) {
			return json;
		}
		for (let i = 0; i < json.children.length; i++) {
			let childJson = this.getRoot(json.children[i]);
			if (childJson) {
				return childJson;
			}
		}
		return false;
	}
	buildSubTree(root) {
		let newChildren = [];		

		for (let i = 0; i < root.children.length; i++) {
			let child = this.buildSubTree(root.children[i]);
			if (child) {
				newChildren.push(child);
			}
		}

		if (newChildren.length > 0){
			root.children = newChildren;
		}

		if (newChildren.length > 0 || root.name.toLowerCase().indexOf(this.props.filter.toLowerCase()) !== -1){
			return root;
		}
		return null;
	}
	render() {
		const margin = [10, 20, 10, 150];
		const contentWidth = this.props.width - margin[1] - margin[3];
		const contentHeight = this.props.height - margin[0] - margin[2];
		
		let root = this.props.activeNode ? this.getRoot(this.props.data) : this.props.data;
		
		root = JSON.parse(JSON.stringify(root));
		
		if (this.props.filter) {
			root = this.buildSubTree(root) || root;
		}
		
		let tree =  d3.layout.tree().size([contentHeight, contentWidth]);
		let nodes = tree.nodes(root);
		
		nodes.forEach(node => {
			node.y += margin[0];
		});
		
		let links = tree.links(nodes);
		
		return (
			<Tree
				filter={this.props.filter}
				height={this.props.height}
				width={this.props.width}
				nodes={nodes}
				links={links}/>);
	}
}

TreeContainer.propTypes = propTypes;