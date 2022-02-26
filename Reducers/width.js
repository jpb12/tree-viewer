import { ActionType } from './actions';

export default function widthReducer(state, action) {
	if (typeof state === 'undefined') {
		return window.innerWidth;
	} else {
		switch (action.type) {
			case ActionType.RESIZE:
				return window.innerWidth;
		}
	}

	return state;
}