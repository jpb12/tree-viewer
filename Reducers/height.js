import { ActionType } from './actions';

export default function HeightReducer(state, action) {
	if (typeof state === 'undefined') {
		return window.innerHeight - 42;
	} else {
		switch (action.type) {
			case ActionType.RESIZE:
				return window.innerHeight - document.getElementById('header').offsetHeight - 16;
		}
	}

	return state;
}