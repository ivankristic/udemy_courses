import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';

class SurveyNew extends Component {
    state = { showReview: false };

    renderContent() {
        if (this.state.showReview) {
            return <SurveyReview
                onSurveyReturn={ () => this.setState({ showReview: false })}
            />;
        }
        return (
            <SurveyForm
                onSurveySubmit={ () => this.setState({ showReview: true })}
            />
        );
    }

    render() {
        return (
            <div>
                { this.renderContent() }
            </div>
        );
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);
