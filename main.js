(function() {
	var Actions = {
		ActionType: {
			RESIZE: 'RESIZE',
			SET_ACTIVE_NODE: 'SET_ACTIVE_NODE',
			SET_DATA: 'SET_DATA',
			SET_FILTER: 'SET_FILTER'
		},
		resize: function () {
			Store.dispatch({
				type: Actions.ActionType.RESIZE
			});
		},
		setActiveNode: function (node) {
			Store.dispatch({
				type: Actions.ActionType.SET_ACTIVE_NODE,
				node: node
			});
		},
		setData: function (data) {
			Store.dispatch({
				type: Actions.ActionType.SET_DATA,
				data: data
			});
		},
		setFilter: function (filter) {
			Store.dispatch({
				type: Actions.ActionType.SET_FILTER,
				filter: filter
			});
		}
	};
	
	var Data = function (state, action) {
		if (typeof state === 'undefined') {
			d3.json('json.js', json => Actions.setData(json));
			return null;
		} else {
			switch (action.type) {
				case Actions.ActionType.SET_DATA:
					return action.data;
			}
		}

		return state;
	}
	
	var Height = function (state, action) {
		if (typeof state === 'undefined') {
			return $(window).height() - $('#header').height();
		} else {
			switch (action.type) {
				case Actions.ActionType.RESIZE:
					return $(window).height() - $('#header').height();
			}
		}

		return state;
	}
	
	var Width = function (state, action) {
		if (typeof state === 'undefined') {
			return $(window).width();
		} else {
			switch (action.type) {
				case Actions.ActionType.RESIZE:
					return $(window).width();
			}
		}

		return state;
	}
	
	var ActiveNode = function (state, action) {
		if (typeof state === 'undefined') {
			return null;
		} else {
			switch (action.type) {
				case Actions.ActionType.SET_ACTIVE_NODE:
					return action.node;
			}
		}

		return state;
	}
	
	var Filter = function (state, action) {
		if (typeof state === 'undefined') {
			return null;
		} else {
			switch (action.type) {
				case Actions.ActionType.SET_FILTER:
					return action.filter;
			}
		}

		return state;
	}
	
	var Store = Redux.createStore(Redux.combineReducers({
		data: Data,
		height: Height,
		width: Width,
		activeNode: ActiveNode,
		filter: Filter
	}));

	var Container = React.createClass({
		displayName: 'Container',
		componentDidMount: function() {
			$(window).on('resize', () => { Actions.resize(); });
		},
		render: function() {
			return (
				React.createElement(
					'div',
					{id: 'container'},
					React.createElement(Header),
					React.createElement(TreeContainer)));
		}
	});
	
	var Header = React.createClass({
		displayName: 'Header',
		handleClick: function() {
			Actions.setActiveNode(null);
			Actions.setFilter("");
		},
		componentDidMount: function() {
			Actions.resize();
		},
		render: function() {
			return (
				React.createElement(
					'div',
					{id: 'header'},
					React.createElement(Filter),
					React.createElement('button', {onClick: this.handleClick}, 'Reset'),
					React.createElement('span', {}, 'Last updated: ' + this.props.timestamp)));
		}
	});
	
	Header = ReactRedux.connect(state => ({ timestamp: state.data ? state.data.timestamp : '' }))(Header);

	var Filter = React.createClass({
		displayName: 'Filter',
		handleChange: function(e) {
			Actions.setFilter(e.target.value);
		},
		render: function() {
			return (
				React.createElement(
					'input',
					{
						id: 'search',
						type: 'text',
						placeholder: 'Filter nodes...',
						value: this.props.filter,
						onChange: this.handleChange
					}));
		}
	});
	
	Filter = ReactRedux.connect(state => ({ filter: state.filter }))(Filter);
	
	var TreeContainer = React.createClass({
		displayName: 'TreeContainer',
		getRoot: function(json) {
			if (json.name === this.props.activeNode) {
				return json;
			}
			for (var i = 0; i < json.children.length; i++) {
				var childJson = this.getRoot(json.children[i]);
				if (childJson) {
					return childJson;
				}
			}
			return false;
		},
		buildSubTree: function(root) {
			var newChildren = [];		

			for (var i = 0; i < root.children.length; i++) {
				var child = this.buildSubTree(root.children[i]);
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
		},
		render: function() {
			if (!this.props.data) {
				return React.createElement('svg');
			}			
			
			var margin = [10, 20, 10, 150];
			var contentWidth = this.props.width - margin[1] - margin[3];
			var contentHeight = this.props.height - margin[0] - margin[2];
			
			var root = this.props.activeNode ? this.getRoot(this.props.data) : this.props.data;
			
			root = JSON.parse(JSON.stringify(root));
			
			if (this.props.filter) {
				root = this.buildSubTree(root) || root;
			}
			
			var tree = d3.layout.tree().size([contentHeight, contentWidth]);		
			var nodes = tree.nodes(root);
			
			nodes.forEach(node => {
				node.y += margin[0];
			});
			
			var links = tree.links(nodes);
			
			return (React.createElement(
				Tree,
				{
					height: this.props.height,
					width: this.props.width,
					nodes: nodes,
					links: links
				}));
		}
	});
	
	TreeContainer = ReactRedux.connect(state => (state))(TreeContainer);
	
	var Tree = React.createClass({
		displayName: 'Tree',
		render: function () {
			return (
				React.createElement(
					'svg',
					{
						height: this.props.height,
						width: this.props.width
					},
					this.props.links.map(link =>
						React.createElement(
							Link,
							{
								key: link.target.name,
								link: link
							})),
					this.props.nodes.map(node =>
						React.createElement(
							Node,
							{
								key: node.name,
								node: node,
							}))));
		}
	});
		
	var Link = React.createClass({
		displayName: 'Link',
		diagonal: d3.svg.diagonal().projection(d => [d.y, d.x]),
		render: function() {
			return (
				React.createElement(
					'path',
					{
						className: 'link',
						d: this.diagonal({ source: this.props.link.source, target: this.props.link.target })
					}));
		}
	});

	var Node = React.createClass({
			displayName: 'Node',
			handleClick: function() {
				Actions.setActiveNode(this.props.node.name);
			},
			getTransform: function() {
				return 'translate(' + this.props.node.y + ', ' + this.props.node.x + ')';
			},
			getClassName: function() {
				if (!this.props.filter) {
					return '';
				}
				if (this.props.node.name.toLowerCase().indexOf(this.props.filter) === -1) {
					return 'searchExcluded';
				}
				return 'searchIncluded';
			},
			render: function() {
				return (
					React.createElement(
						'g',
						{
							className: 'node',
							transform: this.getTransform(),
							onClick: this.handleClick
						},
						React.createElement('circle', {r: '4.5'}),
						React.createElement(
							'text',
							{
								className: this.getClassName(),
								dy: '.40em',
								dx: '5'
							},
							this.props.node.name)));
		}
	});
	
	Node = ReactRedux.connect(state => ({ filter: state.filter }))(Node);

	ReactDOM.render(
		React.createElement(
			ReactRedux.Provider,
			{ store: Store },
			React.createElement(Container)),
		document.getElementById('app'));
})();