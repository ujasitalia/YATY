import React, {useState, useEffect} from 'react';
import './css/discover.css';
import { db } from './firebase';
import { Link } from 'react-router-dom';
import Campaign from './Campaign';

const Discover = () => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        db.collection('campaigns').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
          setCampaigns(snapshot.docs.map(doc => ({id:doc.id, campaign:doc.data()})
        )
      );
    });
    // console.log(campaigns);    
    }, []);


    return(
      <>
        
        <main style={{width:"100%"}}>
          <section className="top-rect">
            <Link to='/'><a href="#" className="title1"><h2>YATY</h2></a></Link>
              {/* {user ? (
                <Button onClick={() => auth.signOut()} className="app-login-container logout">Logout</Button>
              ) : (
                <div className="app-login-container">
                  <Button onClick={() => setOpenSignIn(true)}>Log in</Button>
                  <Button onClick={() => setOpen(true)}>Sign Up</Button>
                </div>        
              )} */}
                <Link to='/startcampaign'><a href="#" className="smob1" >Start Campaign</a></Link>
                <Link to='/startcampaign'><button type="button" className="btn btn-primary start1"><span style={{color: 'white'}}>Start Campaign</span></button></Link>
          </section>
          
          <p className="page-title">Discover Fundraisers</p>
          <p className="sub-text">People around the world are raising money for what they are passionate about.</p>
          
          <div className="campaign-grid">
            {campaigns.map((campaign) => {
              // console.log(campaign.id);
              return <Campaign key={campaign.id} {...campaign.campaign} id={campaign.id}/>
            })}
          </div>
        </main>
      </>
        
    )
}

export default Discover;