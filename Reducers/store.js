import ActiveNode from './activeNode';
import Filter from './filter';
import Height from './height';
import Width from './width';
import { combineReducers, createStore } from 'redux';

export default createStore(
	combineReducers({
		activeNode: ActiveNode,
		filter: Filter,
		height: Height,
		width: Width
	}),
	undefined,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);