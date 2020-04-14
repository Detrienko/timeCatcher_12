import React from 'react';
import classes from './Statistics.module.css';
import Circle from '../UI/Circle/Circle';

	const Statistics = (props) =>{

		let hours = 5;
		let minutes = 10;

		return(
			<div className={classes.statisticsWrapper}>
				<span>Total hours: {hours}h{minutes}m</span><br/><br/>
				<p className={classes.progress}>Progress</p>
				<Circle/>
			</div>
			)	
	}

	export default Statistics;
