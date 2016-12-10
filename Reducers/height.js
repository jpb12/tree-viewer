import $ from 'jquery';
import { ActionType } from './actions';

export default function (state, action) {
	if (typeof state === 'undefined') {
		return $(window).height() - $('#header').height();
	} else {
		switch (action.type) {
			case ActionType.RESIZE:
				return $(window).height() - $('#header').height();
		}
	}

	return state;
}