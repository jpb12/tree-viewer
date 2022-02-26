import { ActionType } from './actions';

export default function FilterReducer(state, action) {
	if (typeof state === 'undefined') {
		return '';
	} else {
		switch (action.type) {
			case ActionType.SET_FILTER:
				return action.filter;
		}
	}

	return state;
}