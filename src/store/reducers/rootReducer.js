import { combineReducers } from 'redux';

import businessBuilder from './businessBuilder';
import stopWatch from './stopWatch';
import auth from './auth';



const rootReducer = combineReducers({
	businessBuilder: businessBuilder,
	stopWatch: stopWatch,
	auth: auth
});

export default rootReducer;