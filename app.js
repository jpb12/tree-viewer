import React from 'react';
import ReactDom from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import Header from './Components/header';
import TreeContainer from './Components/treeContainer';
import json from './json';
import Store from './Reducers/store';
import { resize } from './Reducers/actions';

import './style.css';

window.onresize = resize;

function App() {
	const state = useSelector(state => state);
	return (
		<div id="container">
			<Header filter={state.filter} timestamp={json.timestamp}/>
			<TreeContainer
				activeNode={state.activeNode}
				data={json}
				filter={state.filter}
				height={state.height}
				width={state.width}/>
		</div>
	);
}

ReactDom.render(
	<Provider store={Store}>
		<App/>
	</Provider>,
	document.getElementById('app')
);