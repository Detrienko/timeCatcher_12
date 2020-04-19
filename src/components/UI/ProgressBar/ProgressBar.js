import React from 'react';
import classes from './ProgressBar.module.css';

const ProgressBar = (props) =>{

	let progress = props.progress;

	let progressStyle = {
		width: progress + '%'
	}

	return(
        <div className={classes.wrapper}>
            <div className={classes.progress_bar}>
                <span className={classes.progress_bar_fill} style={progressStyle}></span>
            </div>
            {progress}%
        </div>
    )
}


export default ProgressBar;