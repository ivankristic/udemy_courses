import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyReview = ({
      onSurveyReturn,
      formValues,
      submitSurvey,
      history
}) => {
    const reviewFields = _.map(formFields, ({ label, name }) => {
        return (
            <div key={ name }>
                <label>{ label }</label>
                <div>
                    { formValues[name] }
                </div>
            </div>
        );
    });

    return (
        <div>
            <h5>Recheck Your input</h5>
            { reviewFields }
            <button
                className='yellow darken-3 white-text btn-flat'
                onClick={ onSurveyReturn }
            >
                Back
                <i className="material-icons left">chevron_left</i>
            </button>
            <button
                className='green white-text btn-flat right'
                onClick={ () => submitSurvey(formValues, history) }
            >
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));
