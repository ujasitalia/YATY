import React from 'react';
import { Link } from 'react-router-dom';
// import {Button} from 'react-bootstrap';
import { useParams, useLocation } from 'react-router-dom';
import './css/singleCampaign.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import GooglePayButton from '@google-pay/button-react';
import { 
  FacebookShareButton, 
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';

function SingleCampaign() {
    const id = useParams().id;
    const location = useLocation();
    const data = location.state;  
    // const link = String(window.location);
    // console.log(link);
    
    
    
    return (
        <main style={{width:"100%"}}>          
            <section className="upper-nav">
                <Link to='/'><a href="#" className="title1"><h2>YATY</h2></a></Link>
                {/* {user ? (
                    <Button onClick={() => auth.signOut()} className="app-login-container logout">Logout</Button>
                ) : (
                    <div className="app-login-container">
                    <Button onClick={() => setOpenSignIn(true)}>Log in</Button>
                    <Button onClick={() => setOpen(true)}>Sign Up</Button>
                    </div>        
                )} */}
                <Link to='/discover'><a href="#" className="discover1">Discover</a></Link>
                <Link to='/startcampaign'><a href="#" className="smob1" >Start Campaign</a></Link>
                <Link to='/startcampaign'><button type="button" className="btn btn-primary start1"><span style={{color: 'white'}}>Start Campaign</span></button></Link>
          </section> 

            <section className="singleCampaign-main">
                <h3 className="camp-title">{data.title}</h3>
                <img className="campaignImage" src={data.url} alt={data.bName} />
                <p className="campaignStory">{data.story}</p>
                <div className="deets">
                    <p className="rcvd"><span className="rcvdSpan">₹{data.rcvd}</span> raised of ₹{data.amount}</p>
                    {
                        data.rcvd > 0 ? <ProgressBar className="progBar" now={(data.rcvd/data.amount)*100}  /> : ""
                    }
                    <p className="donors"><strong>{data.donors}</strong> donors</p>
                </div>
                <div className="but">
                    {/* <Button className="support-btn"  variant="primary">Support</Button> */}
                    {/* <Button className="support-btn" style={{marginTop:"10px"}} variant="outline-primary">Share</Button> */}

                    
                     <a style={{width: '200px', backgroundColor: '#0D1E29', textAlign: 'center', fontWeight: 800, padding: '11px 0px', color: 'white', fontSize: '12px', display: 'inline-block', textDecoration: 'none'}} href='https://pmny.in/QIfLK3l7Rxmh' > Donate Now </a> 

                    {/* <GooglePayButton
                        environment="TEST"
                        buttonType="donate"
                        paymentRequest={{
                            apiVersion: 2,
                            apiVersionMinor: 0,
                            shippingAddressRequired:false,
                            allowedPaymentMethods: [
                                {
                                    type: 'CARD',
                                    parameters: {
                                        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                        allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                    },
                                    tokenizationSpecification: {
                                        type: 'PAYMENT_GATEWAY',
                                        parameters: {
                                            gateway: 'payu',
                                            gatewayMerchantId: '8295882',
                                        },
                                    },
                                },
                           ],
                           merchantInfo: {
                                merchantId: 'BCR2DN6T27C2ZGJ2',
                                merchantName: 'Ujas Italia',
                            },
                            transactionInfo: {
                                totalPriceStatus: 'FINAL',
                                totalPriceLabel: 'Total',
                                totalPrice: '100.00',
                                currencyCode: 'INR',
                                countryCode: 'IN',
                            },
                            callbackIntents: ['PAYMENT_AUTHORIZATION'],
                            
                    }}
                    onLoadPaymentData={paymentRequest => {
                        console.log('load payment data', paymentRequest);
                        
                    }}
                    onPaymentAuthorized={paymentRequest => {
                        console.log("payment authorised success", paymentRequest);
                    }}
                        
                /> */}
                </div>
                <div className="shareButts">
                    
                    <FacebookShareButton 
                        url={"https://www.google.com"}
                        quote={data.title}
                        hashtag="#YATY"
                        // picture={data.url}
                    >
                        <FacebookIcon size={40} round style={{paddingLeft:"5px"}}/>
                    </FacebookShareButton>

                    <TwitterShareButton
                        url={"http://www.camperstribe.com"}
                        title={data.title}
                        hashtag="#YATY"                        
                    >
                        <TwitterIcon size={40} round style={{paddingLeft:"5px"}}/>
                    </TwitterShareButton>

                    <WhatsappShareButton
                        url={"http://www.camperstribe.com"}
                        title={data.title}
                        separator=":: "
                        
                    >
                        <WhatsappIcon size={40} round style={{paddingLeft:"5px"}} />
                    </WhatsappShareButton>

                    <LinkedinShareButton
                        url={"http://www.camperstribe.com"}
                        title={data.title}
                        summary={data.story}
                        source="YATY"
                    >
                        <LinkedinIcon size={40} round style={{paddingLeft:"5px"}}/>
                    </LinkedinShareButton>

                    <EmailShareButton
                        url={"http://www.camperstribe.com"}
                        subject={data.title}
                        body={data.story}
                        source="YATY"
                    >
                        <EmailIcon size={40} round style={{paddingLeft:"5px"}} />
                    </EmailShareButton>
                </div>
                <hr className="butHr" />
                {/* <hr className="strHr" /> */}
                
            </section>          
        </main>
    )
}

export default SingleCampaign
