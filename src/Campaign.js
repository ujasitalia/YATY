import React from 'react';
import './css/discover.css';
import { Link } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';

const Campaign = ({amount, bName, story, title, url, rcvd, id, donors}) =>{
    const now = parseInt((rcvd/amount)*100);
    
    // console.log(id, amount, story, title);
    return(
        <Link style={{textDecoration:"none"}} to={{
            pathname: `/campaign/${id}`,
            state:{
                amount: amount,
                bName : bName,
                story: story,
                title: title,
                url: url,
                rcvd: rcvd,
                donors:donors,
            }
        }} >
            <article className="campaign">
                <div className='img-container'>
                    <img src={url} alt={bName} />
                </div>
                {/* <ul>
                    <li>{title}</li>
                    <li>{amount}</li>
                    <li>{story}</li>
                </ul> */}
                <div className='campaign-footer'>
                    <h3>{title}</h3>
                    <p>{story}</p>
                    {
                        rcvd > 0 ? <ProgressBar animated now={(rcvd/amount)*100} label={`${now}%`} /> : ""
                    }
                    {/* <Button className="support-btn" size="sm" variant="primary">Support</Button> */}
                </div>
            </article>
        </Link>
    )
}

export default Campaign;