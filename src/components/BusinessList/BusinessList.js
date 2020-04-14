import React, {Component} from 'react';
import classes from './BusinessList.module.css';
import { connect } from 'react-redux';

//actions
import * as actions from '../../store/actions/businessBuilder';

import * as fetchingDataActions from '../../store/actions/businessBuilder';


import BusinessForm from '../../containers/Forms/BusinessForm/BusinessForm';
import BusinessTab from '../BusinessTab/BusinessTab';

// icons:
import listIcon from '../../images/icons/listIcon.png';
import addBusinessIcon from '../../images/icons/addBusinessIcon.png';

import firebase from '../../config/fbConfig';


class BusinessList extends Component {

  state={
    isBusinessFormShown: false,
  }

  showBusinessForm = () => {
    if(this.props.auth.userId){
      this.setState({isBusinessFormShown: true})      
    }
    else{
      alert('Please sign up or register a new account!')
    }
  }

  hideBusinessForm = () => {
    this.setState({isBusinessFormShown: false})
  }

  render(){
    let businessTab;
    if(this.props.business.length==0){
      businessTab = null;
    }
    else{
      businessTab = this.props.business.map(
          (el)=><BusinessTab 
              deleteBusiness = {this.props.deleteBusiness}
              switchBusinessTab={this.props.switchBusinessTab} 
              business={el}/>
        )
    }

  let businessForm = null;

  if(this.state.isBusinessFormShown){
    businessForm = <BusinessForm hideBusinessForm = {this.hideBusinessForm} addBusiness={this.props.addBusiness}/>;
  }   


  return (
  	<div className={classes.businessListWrapper}>
  		<h1 className={classes.TimeCatcherLogoText}>Time Catcher</h1>
      <div>
        <p className={classes.myBussinesTitle}>MY BUSSINES</p>
        {businessTab}
      </div>  
        <div onClick={this.showBusinessForm} className={classes.addNewBusinessWrapper}>
          <div className={classes.plusBtn}>
            <div className={classes.plus}>+</div>
          </div>
               <span className={classes.btnText}>New business</span>
        </div>
      {businessForm}
    </div>
  );
}
}

  const mapStateToProps = state => {
    return {
      business: state.businessBuilder.business,
      auth: state.auth
    }
  }

  const mapDispatchToProps = dispatch => {
    return{
      addBusiness: (data) => dispatch(actions.addBusiness(data)),
      deleteBusiness: (id) => dispatch(actions.deleteBusiness(id)),
      switchBusinessTab: (id) => dispatch(actions.switchBusinessTab(id))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(BusinessList);
