import { ActionType } from './actions';

export default function ActiveNodeReducer(state, action) {
	if (typeof state === 'undefined') {
		return null;
	} else {
		switch (action.type) {
			case ActionType.SET_ACTIVE_NODE:
				return action.node;
		}
	}

	return state;
}