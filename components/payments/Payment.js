import React from 'react';
import axios from "axios"
import Router from 'next/router'
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

class Payments extends React.Component {
    handleClick = () => {       
        toast.success('Order has been confirmed', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
        
    }
    render(){
        let { amount } = this.props;
        const onToken = async token => {
            const body = {
                amount: amount,
                token: token
            };  
            await axios.post("/api/stripe/checkout", body);
        };

        return (
            <>
                <div className="order-btn">
                    <StripeCheckout 
                        name="Novine"
                        description="React Next eCommerce Templates"
                        amount={amount}
                        currency="USD"
                        token={onToken}
                        stripeKey="pk_test_ZaZZWZGlvdIn12yFleIqyjSI00G4e18Kf7"
                        billingAddress={false}
                        closed={this.handleClick}
                    >
                        <button disabled={this.props.disabled} className={`btn btn-primary ${this.props.disabled ? 'btn-disabled' : ''}`} >
                            Place Order
                        </button>
                    </StripeCheckout>
                </div>
            </>
        );
    }
}

const mapStateToProps= (state) => {
    return {
       card: state.card
    }
}

export default connect(mapStateToProps)(Payments)