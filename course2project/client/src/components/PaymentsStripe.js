import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class PaymentsStripe extends Component {
    render() {
        return (
            <StripeCheckout
                name="Emaily"
                description="$5 for 5 credits"
                amount={ 500 }
                token={ token => this.props.handleStripeToken(token) }
                stripeKey={ process.env.REACT_APP_STRIPE_PB_KEY }
            >
                <button className="btn">Add credits</button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(PaymentsStripe);
