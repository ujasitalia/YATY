import React, {useState, useEffect} from 'react';
import './css/startCampaign.css';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import {auth, db} from './firebase';
import {Form, Button, FormControl} from 'react-bootstrap';
import DropZone from './DropZone';


const StartCampaign = () => {
    const [user, setUser] = useState('');
    const [campaign, setCampaign] = useState({
        username: user ? user.email : "",
        title:"",
        amount:"",
        bName:"",
        story:"",
        rcvd:"0",
        donors:"0",
    });
    
    const [url, setUrl] = useState("");
    
   

    const handleCallback = (d) => { 
        setUrl(d);
        console.log(url);
    }
    
    useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        // user is logged in...
        //console.log(authUser);
        setUser(authUser);
      }else{
        // user is logged out...
        setUser(null);
      }
    });  
    //cleaning up previous listeners to not have duplicate fires of the same user
    return () => {
      unsubscribe();
    }
  }, [user])

    const handleForm = (e) =>{
        e.preventDefault();
        url ? (
            db.collection("campaigns").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                url:url,
                amount:campaign.amount,
                bName:campaign.bName,
                story:campaign.story,
                title:campaign.title,
                username:campaign.username,
                rcvd:campaign.rcvd,
                donors:campaign.donors,
                })
                .then((docRef) => {
                    console.log();
                    setCampaign({
                        username: user ? user.email : "",
                        title:"",
                        amount:"",
                        bName:"",
                        story:"",
                        rcvd:"0",
                        donors:"0",
                    });
                    alert("success", user.email);
                })
        )  : (
            alert("upload image first")
        );
        setUrl("");      
    }

    const handleChange = (e) => {
        e.preventDefault(); 
        const name = e.target.name;
        const value = e.target.value;
        setCampaign({...campaign, [name] : value});
    }

    return(
        <>
        <main>
            <section className="rect16">
                <Link to='/'><a href="#" className="title1"><h2>YATY</h2></a></Link>
                <Link to='/discover'><a href="#" className="discover1">Discover</a></Link>
                <Link to='/'><a href="#" className="smob2" >Dashboard</a></Link>
                <Link to='/'><button type="button" className="btn btn-primary start1"><span style={{color: 'white'}}>Dashboard</span></button></Link>
            </section>

            {/* page title */}
            <p className="pageTitle">Start a Campaign</p>

            {/* form */}
            <div className="form-div">              
                <Form.Group >                
                    <Form.Control size="lg" name="title" className="txt-box" type="text" placeholder="Campaign Title" value={campaign.title} onChange={handleChange} />                
                    <br />
                    <Form.Control size="lg" name="amount" className="txt-box" type="number" placeholder="Amount" value={campaign.amount} onChange={handleChange}/>
                    <br />
                    <Form.Control size="lg" name="bName" className="txt-box" type="text" placeholder="Beneficiary Name" value={campaign.bName} onChange={handleChange}/>
                    <br />
                    <FormControl as="textarea" name="story" style={{height: "100px"}} placeholder="Tell us your story" value={campaign.story} onChange={handleChange} />
                    <br />
                    <Button variant="primary" className="frm-btn sub" type="submit" style={{width:"30%"}} onClick={handleForm}>
                        Submit
                    </Button>
                </Form.Group>
            </div>

            <div className="dropzone">
                <DropZone handleCallback={handleCallback}/>
            </div>

            {/* <div className="side">
                <img src="./Ellipse42.png" alt="" />
            </div> */}
        </main>
            
        </>
    );
};

export default StartCampaign;