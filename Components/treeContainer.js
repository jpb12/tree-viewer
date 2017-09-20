import clone from 'clone';
import PropTypes from 'prop-types';
import React from 'react';
import Tree from 'react-tree-graph';
import { setActiveNode } from '../Reducers/actions';

const propTypes = {
	activeNode: PropTypes.string,
	data: PropTypes.object,
	filter: PropTypes.string,
	height: PropTypes.number,
	width: PropTypes.number
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
	setClassName(node) {
		node.children.forEach(this.setClassName, this);

		if (!this.props.filter) {
			return;
		}

		node.className = node.name.toLowerCase().indexOf(this.props.filter) === -1
			? 'node searchExcluded'
			: 'node searchIncluded';
	}
	render() {
		let root = this.props.activeNode ? this.getRoot(this.props.data) : this.props.data;
		
		root = clone(root);

		if (this.props.filter) {
			root = this.buildSubTree(root) || root;
		}
		
		this.setClassName(root);

		return (
			<Tree
				animated
				data={root}
				height={this.props.height}
				width={this.props.width}
				nodeClickHandler={setActiveNode}
				steps={30}/>);
	}
}

TreeContainer.propTypes = propTypes;
