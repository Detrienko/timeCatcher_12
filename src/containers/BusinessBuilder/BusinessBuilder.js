import React, { Component } from 'react';

import classes from './BusinessBuilder.module.css'

import Stopwatch from '../Stopwatch/Stopwatch';
import CountDown from '../CountDown/CountDown';
import Button from '../../components/Button/Button';
import Statistics from '../../components/Statistics/Statistics';

import SettingsModal from '../../containers/SettingsModal/SettingsModal';

import * as actions from '../../store/actions/businessBuilder';
import { connect } from 'react-redux';

import settingsImage from '../../images/icons/settings1.png';

class BusinessBuilder extends Component {

	state={
		isSettingsModalShown: false
	}


	showSettingsToggle = () => {
		if(this.props.auth.userId){
			this.setState({isSettingsModalShown: !this.state.isSettingsModalShown})
		}
		else{alert('Please sign up or register a new account!')}
	}

	switchTimer = () => {

		let businessData = this.props.business[this.props.business.findIndex((el)=>el.id==this.props.currentBussinessId)]

		if(!businessData.countDownIsShown){
			let countDownOrStopwatch = 'countDown';
			this.props.stopWatchOrCountDownIsShownHandler(this.props.currentBussinessId, countDownOrStopwatch)
		}
		else{
			let countDownOrStopwatch = 'stopWatch';
			this.props.stopWatchOrCountDownIsShownHandler(this.props.currentBussinessId, countDownOrStopwatch)
		}
	}


	render(){
		let businessData = this.props.business[this.props.business.findIndex((el)=>el.id==this.props.currentBussinessId)]
		let stopWatchData = this.props.stopWatches[this.props.stopWatches.findIndex((el)=>el.businessId==businessData.id)];

		let settingsModal;

		if(this.state.isSettingsModalShown){
    		settingsModal = <SettingsModal businessData={businessData}/>;
  		}   

		return(
			<div className={classes.mainDisplayWrapper}>
				<h2 className={classes.title}>{businessData.title}</h2>
				<p>{businessData.totalHours.hours}/{businessData.goalHours} hours</p>
				<div className={classes.timers}>
					<div className={classes.timerWrapper}>
						<Stopwatch stopWatchData={stopWatchData} businessData={businessData}/>
						{/* <CountDown businessData={businessData} isShown={businessData.countDownIsShown}/> */}
					</div>
					{/* <div className={classes.switchBtnWrapper}>
						<button onClick={this.switchTimer} className={classes.switchBtn}>SWITCH</button>
					</div>	*/}
				</div>
				<br/><br/><br/>
				<button className={classes.addHoursBtn}
						onClick={()=>this.props.addWorkingHours(businessData.id)} >Add Hours
				</button>
				
				{settingsModal}
				<div className={classes.settingsWrapper}>
					<div onClick={this.showSettingsToggle} className={classes.settings}>
						<img className={classes.settingsImage} src={settingsImage}/>
						<span>Settings</span>
					</div>
				</div>
				<Statistics/>
			</div>
			)
	}
}

  const mapStateToProps = state => {
    return {
      stopWatches: state.stopWatch.stopWatches,
      business: state.businessBuilder.business,
      auth: state.auth
    }
  }

    const mapDispatchToProps = dispatch => {
    return{
      addWorkingHours: (id) => dispatch(actions.addWorkingHours(id)),	
      stopWatchOrCountDownIsShownHandler: (id, countDownOrStopwatch) => dispatch(actions.stopWatchOrCountDownIsShownHandler(id, countDownOrStopwatch)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(BusinessBuilder);