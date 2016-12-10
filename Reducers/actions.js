import Store from './store';

export const ActionType = {
	RESIZE: 'RESIZE',
	SET_ACTIVE_NODE: 'SET_ACTIVE_NODE',
	SET_DATA: 'SET_DATA',
	SET_FILTER: 'SET_FILTER'
};

export function resize() {
	Store.dispatch({
		type: ActionType.RESIZE
	});
}

export function setActiveNode(node) {
	Store.dispatch({
		type: ActionType.SET_ACTIVE_NODE,
		node: node
	});
}

export function setFilter(filter) {
	Store.dispatch({
		type: ActionType.SET_FILTER,
		filter: filter
	});
}