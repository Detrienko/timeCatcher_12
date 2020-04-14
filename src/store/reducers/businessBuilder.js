import * as actionTypes from '../actions/actionsTypes';
import firebase from '../../config/fbConfig';
import {updatedObject} from '../utility';


const initialState = {
	business: [
		// {	
		// 	id: 0,
		// 	title: 'Test business',
		// 	totalHours: {
  //     		  hours: 0,
  //     		  minutes: 0
  //     		},
		// 	goalHours: 10000,
  //     		daylyGoal: {
  //     		  hours: 2,
  //     		  minutes: 0
  //     		},			
  //     		weeklyGoal: {
  //     		  hours: 14,
  //     		  minutes: 0
  //     		},
  //     		monthlyGoal:{
  //     			hours: 56,
  //     			minutes: 0
  //     		},
		// 	description: 'It\'s a test bussiness.',
		// 	progress: 0, // percent
		// 	isShown: true,
		// }	



		// 	COUNTDOWN
		// 	countDownIsShown: false,
		// 	currentCountdownTime: {
  //       		hours: '00',
  //       		minutes: '00',
  //       		seconds: '00',
  //    		},
  //     		timerTimeCountDown: 0,

  //     		currentMiniStopwatchTime: {
		// 		hours: '00',
		// 		minutes: '00',
		// 		seconds: '00'
		// 	},
		// 	miniTimerTime: 0
		// },
	],
	loading: false,
	error: null	
}

const reducer = (state=initialState, action) => {

	switch(action.type){

		case actionTypes.ADD_BUSINESS:
			{
				let newBusiness = [...state.business]

				for(let i = 0; i < newBusiness.length; i++){
					newBusiness[i].isShown = false;
				}	
				
				// let newBusinessData = {
				// 	id: action.data.id,
				// 	title: action.data.title,
				// 	totalHours: {
	   //    			  hours: action.data.totalHours.hours,
	   //    			  minutes: action.data.totalHours.minutes
	   //    			},
	   //    			description: action.data.description,
				// 	progress: action.data.progress, 
				// 		goalHours: action.data.goalHours,
	   //    				daylyGoal: {
	   //    				  hours: action.data.daylyGoal.hours,
	   //    				  minutes: action.data.daylyGoal.minutes
	   //    				},
	   //    				weeklyGoal: {
	   //    				  hours: action.data.weeklyGoal.hours,
	   //    				  minutes: action.data.weeklyGoal.minutes
	   //    				},
	   //    				monthlyGoal:{
	   //    				  hours: action.data.monthlyGoal.hours,
	   //    				  minutes: action.data.monthlyGoal.minutes
	   //    				},
	   //    				stopWatchIsShown: true,
	   //    				isShown: true
	   //    			}

				let newBusinessData = {
					id: action.data.id,
					title: action.data.title,
					totalHours: {
	      			  hours: action.data.totalHours.hours,
	      			  minutes: action.data.totalHours.minutes
	      			},
	      			description: action.data.description,
					progress: action.data.progress, 
	      				stopWatchIsShown: true,
	      				isShown: true
	      			}

				newBusiness.push(newBusinessData);

				let newState = {
					business: newBusiness,
					loading: false,
					error: null	
				}

				return newState;
			}	

		case actionTypes.DELETE_BUSINESS:
			{
				let newBusiness = [...state.business];
				let index = newBusiness.findIndex(el=>el.id==action.id);
				newBusiness.splice(index, 1)
				

				let newState = {
					business: newBusiness,
					loading: false,
					error: null
				}
				return newState;	

			}
		case actionTypes.SWITCH_BUSINESS_TAB:
			{
				let newState = Object.assign({}, state);
				let index = newState.business.findIndex((el)=>el.id==action.id);

				let newBusiness = [...newState.business];
					newBusiness.forEach((item)=>{
						item.isShown = false;
					})

					newBusiness[index].isShown = true;
					newState.business = newBusiness;
				return newState;
			}

		case actionTypes.ADD_WORKING_HOURS:
			let newBusiness9 = [...state.business];
			let index9 = newBusiness9.findIndex((el)=>el.id==action.id);
			let currentTotalHours = newBusiness9[index9].totalHours;  
			let currentStopWatchTime = newBusiness9[index9].currentStopwatchTime;
			let currentMiniStopwatchTime = newBusiness9[index9].currentMiniStopwatchTime;
			let currentCountdownTime = newBusiness9[index9].currentCountdownTime;;

			if(newBusiness9[index9].timerOn && newBusiness9[index9].timerTime>59999){
				alert('Would you like to stop timer and add your hours?')
			}
			if(newBusiness9[index9].timerOn && newBusiness9[index9].timerTime<60000){
				alert('Work at least 1 minute');
			}

			if(!newBusiness9[index9].timerOn){
				if(newBusiness9[index9].stopWatchIsShown){
					if(newBusiness9[index9].timerTime<60000){
						alert('Work at least 1 minute!');
						return state;
					}
					newBusiness9[index9].totalHours.hours = parseInt(currentTotalHours.hours, 10) + parseInt(currentStopWatchTime.hours, 10);
					newBusiness9[index9].totalHours.minutes = parseInt(currentTotalHours.minutes, 10) + parseInt(currentStopWatchTime.minutes, 10);
					if(newBusiness9[index9].totalHours.minutes>59){
						let restMinutes = newBusiness9[index9].totalHours.minutes - 60;
						newBusiness9[index9].totalHours.minutes=restMinutes;
						newBusiness9[index9].totalHours.hours +=1;
					}			
				}
			}

				currentStopWatchTime.hours = '00';
				currentStopWatchTime.minutes = '00';
				currentStopWatchTime.seconds = '00';
				currentStopWatchTime.centiseconds = '00';
				
				// currentCountdownTime.hours = '00';         temporarily removed__________temporarily removed
				// currentCountdownTime.minutes = '00'; 		temporarily removed    temporarily removed
				// currentCountdownTime.seconds = '00';      temporarily removed    temporarily removed

				// currentMiniStopwatchTime.hours = '00';
				// currentMiniStopwatchTime.minutes = '00';
				// currentMiniStopwatchTime.seconds = '00';

				newBusiness9[index9].timerTime = 0;
				newBusiness9[index9].timerTimeCountDown = 0;
				newBusiness9[index9].miniTimerTime = 0;


				// clear both timers:

			let newState9 = {
				business: newBusiness9
			} 

			return newState9	

		case actionTypes.FETCH_BUSINESSDATA_BEGIN:
			{
				let newState = {...state};
				newState.loading = true;
				return newState;
			}	
		case actionTypes.FETCH_BUSINESSDATA_SUCCESS:
			{
				let newBusiness = [];
				let idOfBusinesses = Object.keys(action.userBusinesses.businesses);
				if(idOfBusinesses.length==0){
					let newState = {
						business: [],
						loading: false,
						error: null
					}
					return newState;
				}
				else{
					let newBusinessDataObj;
					for(let i = 0; i<idOfBusinesses.length; i++){
						let currentBusiness = action.userBusinesses.businesses[idOfBusinesses[i]];	
					newBusinessDataObj = {
						id: idOfBusinesses[i],
						title: currentBusiness.title,
						totalHours: {
	      				  hours: currentBusiness.totalHours.hours,
	      				  minutes: currentBusiness.totalHours.minutes
	      				},
						goalHours: currentBusiness.goals.goalHours,
						description: currentBusiness.description,
						progress: currentBusiness.progress,

					isShown: false,
					}
						newBusiness.push(newBusinessDataObj)
					}
					newBusiness[0].isShown = true;

					let newState = {
						business: newBusiness,
						loading: false,
						error: null
					}
					return newState;	
				}
			}
			case actionTypes.CLEAR_BUSINESS_BUILDER_STATE: 
				return updatedObject(state, {
					business: [],
					loading: false,
					error: null
				})		

			default:
				return state; 
	}
}

export default reducer;