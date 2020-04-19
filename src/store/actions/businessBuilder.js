import * as actionTypes from './actionsTypes';
import firebase from '../../config/fbConfig';
import axios from 'axios';
import stopWatch from './stopWatch';
import authActions from './auth';

export const addBusiness = (data) => {
	return dispatch => {

		let docRef = firebase.firestore().collection("Users").doc(localStorage.getItem('userId'));
		
		let key = 'businesses.' + data.id;

		docRef.update({
			[key]: {
				id: data.id,
				    title: data.title,
				    totalHours: {
						hours: 0,
						minutes: 0
					},
					goalHours: data.goalHours,
					description: 'nanana',
					progress: 0,
					isShown: true
			}	
			}).then(()=>{
				dispatch({
					type: actionTypes.ADD_BUSINESS,
					data: data
				})
			})

	}
}

export const updateBusinessData = (updatedData, id) => {
	return (dispatch, getState) => {

		let businesses = [...getState().businessBuilder.business];
		let index = businesses.findIndex((el)=>el.id==id);

		let userId = localStorage.getItem('userId');
		let userRef = firebase.firestore().collection('Users').doc(userId);
		let pathGoal = 'businesses.' + businesses[index].id + '.goalHours';
		let pathTitle = 'businesses.' + businesses[index].id + '.title';

		businesses[index].goalHours = updatedData.goalHours;
		businesses[index].title = updatedData.title; 

		userRef.update({
	    			[pathGoal]: businesses[index].goalHours,
	    			[pathTitle]: businesses[index].title
				}).then(()=>{
					dispatch({
						type: actionTypes.UPDATE_DATA,
						data: updatedData,
						id: id
					})	
				})
	}
}

export const switchBusinessTab = (id) => {
	return{
		type: actionTypes.SWITCH_BUSINESS_TAB,
		id: id	
	}
}

export const deleteBusiness = (id) => {

	return dispatch => {
		let userId = localStorage.getItem('userId');
		let path = 'businesses.' + id;
			if(userId){
			let userRef = firebase.firestore().collection('Users').doc(userId);
			userRef.update({
	    		[path]: firebase.firestore.FieldValue.delete()
			}).then(()=>{
				dispatch({
					type: actionTypes.DELETE_BUSINESS,
					id: id
				})
				dispatch(stopWatch.deleteStopWatch(id))
				// dispatch(fetchBusinessDataBegin(userId))
				// dispatch(stopWatch.initializeStopWatches(userId))
			})	 

		}
	}
}

export const addWorkingHours = (stopWatchData) => {	
	return (dispatch, getState) => {
		
		let businesses = [...getState().businessBuilder.business];
		let index = businesses.findIndex((el)=>el.id==stopWatchData.businessId);

			if(!stopWatchData.timerOn){
					businesses[index].totalHours.hours = parseInt(businesses[index].totalHours.hours, 10) + parseInt(stopWatchData.currentStopwatchTime.hours, 10);
					businesses[index].totalHours.minutes = parseInt(businesses[index].totalHours.minutes, 10) + parseInt(stopWatchData.currentStopwatchTime.minutes, 10);
					if(stopWatchData.currentStopwatchTime.minutes>59){ //****************
						let restMinutes = businesses[index].totalHours.minutes - 60;
						businesses[index].totalHours.minutes=restMinutes;
						businesses[index].totalHours.hours +=1;
					}	

					businesses[index].progress = businesses[index].totalHours.hours * 100 / businesses[index].goalHours		
			}

		if(stopWatchData.timerTime>59999){
			if(!stopWatchData.timerOn){
				let userId = localStorage.getItem('userId');
				let userRef = firebase.firestore().collection('Users').doc(userId);
				let pathTotalHours = 'businesses.' + businesses[index].id + '.totalHours';
				let pathProgress = 'businesses.' + businesses[index].id + '.progress';
				userRef.update({
	    			[pathTotalHours]: businesses[index].totalHours,
	    			[pathProgress]: businesses[index].progress
				})
				dispatch({
					type: actionTypes.UPDATE_PROGRESS,
					progress: businesses[index].progress
				})
				dispatch({
					type: actionTypes.ADD_WORKING_HOURS,
					stopWatchData: stopWatchData,
					businesses: businesses 
				})

				dispatch({
					type: actionTypes.CLEAR_STOPWATCH,
					stopWatchData: stopWatchData,
				})
			}
		}
		if(!stopWatchData.timerTime==0){
			if(stopWatchData.timerTime < 59999){
				alert('Work at least 1 minute')
			}

			if(stopWatchData.timerTime > 59999 && stopWatchData.timerOn){
				alert('Stop your timer if you want to add hours')
			}
		}	

	}
}

export function fetchBusinessDataSuccess (userBusinesses) {
	    return{
	      type: actionTypes.FETCH_BUSINESSDATA_SUCCESS,
	      userBusinesses: userBusinesses
	    }
} 

  function fetchBusinessDataError(error){
    return{
      type: actionTypes.FETCH_BUSINESSDATA_FAILURE,
      error: error
    }   
  };

export function fetchBusinessDataBegin(userId) {
  return dispatch => {
  	if(userId==null){
  		dispatch(fetchBusinessDataError('User is not logged in'))
  		return false;
  	}
    let docRef = firebase.firestore().collection("Users").doc(userId);
    docRef.get().then(function(doc) {
      if (doc.exists) {
        dispatch(fetchBusinessDataSuccess(doc.data()))
        console.log("Document data:", doc.data());
      }
  }).catch(function(error) {
      return dispatch => {
        dispatch(fetchBusinessDataError(error))
      }
      console.log("Error getting document:", error);
  });
  }
}

export function clearBusnessBuilderState(){
	alert('acc')
  return {
    type: actionTypes.CLEAR_BUSINESS_BUILDER_STATE
  }
}



// Actions for countDown:

export const clearCurrentCountDownTime = (id) => {
	return{
		type: actionTypes.CLEAR_CURRENT_COUNTDOWN_TIME,
		id: id,
	}
}

export const stopWatchOrCountDownIsShownHandler = (id, countDownOrStopwatch) => {
	return{
		type: actionTypes.STOPWATCH_OR_COUNTDOWN_IS_SHOWN_HANDLER,
		countDownOrStopwatch: countDownOrStopwatch,
		id: id,
	}
}


export const saveCurrentMiniStopwatchTime = (time, id, timerTime) => {
	return{
		type: actionTypes.SAVE_CURRENT_MINI_STOPWATCH_TIME,
		time: time,
		id: id
	}
}

export const increaseTimer = (increaseBy, id) => {
	return{
		type: actionTypes.INCREASE_TIMER,
		increaseBy: increaseBy,
		id: id
	}
}

export const saveTimerTime = (currentCountdownTime, timerTimeCountDown, currentMiniStopwatchTime, miniTimerTime, id) => {
	return{
		type: actionTypes.SAVE_TIMER_TIME,
		currentCountdownTime: currentCountdownTime,
		timerTimeCountDown: timerTimeCountDown,
		currentMiniStopwatchTime: currentMiniStopwatchTime,
		miniTimerTime: miniTimerTime,
		id: id
	}
}

export default {fetchBusinessDataBegin, clearBusnessBuilderState}