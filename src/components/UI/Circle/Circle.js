import React from 'react';

import classes from './Circle.module.css';

const Circle = () =>{
	return(
        <div className={classes.wrapper}>
            <div className={classes.progress_bar}>
                <span className={classes.progress_bar_fill}>1%</span>
            </div>
        </div>
    )
}

export default Circle;