import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/home.css';
import {auth, db} from './firebase';
import Modal from '@material-ui/core/Modal';
import {getModalStyle, useStyles} from './modalFunctions';
import Carousel from 'react-bootstrap/Carousel';
import { Button, Input } from '@material-ui/core';

const Home = () => {
  // for sign up modal   
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('')
  const classes = useStyles();
  //for user
  const [user, setUser] = useState(null);


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
  }, [user, username])


  const handleSignup = (e) => {
    e.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username,
      });
    })
    .catch((error) => alert(error.message))
    
    setOpen(false);
  };

  const handleLogIn = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false);
  };


    return(
        <div className="home">

          {/* sign up modal */}
          <Modal open={open} onClose={() => setOpen(false)}>
            <div style={modalStyle} className={classes.paper}>
              <form className='app-signup'>
                <center>
                <b><p style={{color:"#4899F7", fontSize:"100%"}}>YATY</p></b>
              </center>
                <Input 
                  placeholder='username'
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} 
                  disableUnderline={true} 
                />
                <Input 
                  placeholder='email'
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  disableUnderline={true} 
                />
                <Input 
                  placeholder='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disableUnderline={true}
                />
                <br/>
                <Button onClick={handleSignup} type='submit'>Sign Up</Button>
              </form>                    
            </div>
          </Modal>

          {/* login modal */}
          <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
            <div style={modalStyle} className={classes.paper}>
              <form className='app-signup'>
                <center>
                  <b><p style={{color:"#4899F7", fontSize:"100%"}}>YATY</p></b>
                </center>
                <Input 
                  placeholder='email'
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}  
                  disableUnderline={true}
                />
                <Input 
                  placeholder='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disableUnderline={true}
                />
                <br/>
                <Button onClick={handleLogIn} type='submit'>Log In</Button>
              </form>                    
            </div>
          </Modal>


        {/* first section */}
          <section className="rect6">
            <Link to='/'><a href="#" className="title"><h2>YATY</h2></a></Link>
            <Link to='./discover'><a href="#" className="discover">Discover</a></Link>
            {/* <a href="#" className="signin">Sign In</a> */}
            {user ? (
              <Button onClick={() => auth.signOut()} className="app-login-container logout">Logout</Button>
              ) : (
              <div className="app-login-container">
                <Button onClick={() => setOpenSignIn(true)}>Log in</Button>
                <Button onClick={() => setOpen(true)}>Sign Up</Button>
              </div>        
            )}
            
            
            {user? (
              <>
              <Link to="./startcampaign"><a href="#" className="smob" >Start a Campaign</a></Link>              
              <Link to='./startcampaign'> <button type="button" className="btn btn-primary start"> Start a Campaign
              </button></Link> 
              </>
            ): (
              <>
              <button type="button" className="btn btn-primary start" disabled>Start a Campaign</button>
              <a href="#" className="smob" style={{cursor:'not-allowed', color:'black'}}>Start a Campaign</a>
              </>
            )
            }
            

            <div className="section-txt">Fundraising for the people and causes you care about</div>
            
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="section-play-vector"> 
                <path d="M13 0.5C6.1 0.5 0.5 6.1 0.5 13C0.5 19.9 6.1 25.5 13 25.5C19.9 25.5 25.5 19.9 25.5 13C25.5 6.1 19.9 0.5 13 0.5ZM10.5 18.625V7.375L18 13L10.5 18.625Z" fill="black"/>
            </svg>
            <div className="section-how-to">How to start a fundraiser?</div>
            
            <div className="working-cause-1"></div>          

          </section>

        {/* second section */}
          <section className="rect7">
            <div className="easysteps">Easy Steps</div>
            {/* steps */}
            <div className="cards">
              <div className="card1 card">
                <div className="inside"></div>
                <h5 className="cHeading">Simple design</h5>
                <p className="cText">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, modi.</p>          
              </div>
              <div className="card2 card" >
                <div className="inside"></div>
                <h5 className="cHeading">Simple design</h5>
                <p className="cText">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, modi.</p>
              </div>
              <div className="card3 card">
                <div className="inside"></div>
                <h5 className="cHeading">Simple design</h5>
                <p className="cText">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, modi.</p>
              </div>
            </div>

            <p className="stepsText">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, iure!</p>
          </section>

          {/* third section */}
          <section className="frame4">
            <p className="frameTitle">What we do?</p>
            <p className="frameText">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, nihil?</p>
            <div className="grey-box"></div>
            <div className="container frame-text-box">
              <p className="left text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis temporibus sequi expedita praesentium, excepturi pariatur nobis iusto maxime maiores eaque!</p>
            <p className="right text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro officia sapiente delectus fugit. Odit, non unde accusamus omnis beatae quaerat?</p>
            </div>            
          </section>

          {/* success stories */}
          <section className="rect18">
            <p className="successStories">Success Stories</p>
            
            <Carousel fade className="csr">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055__340.jpg"
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706__340.jpg"
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </section>

          {/* bottom */}
          <section className="bottom">
            <p className="botText">Ready to start a fundraiser?</p>
            <button type="button" class="btn btn-primary bottom-button">Start a Campaign</button>
          </section>

          {/* footer */}
          <footer className="footer">
            <b className="footer-text">YATY</b>
            <p className="c-w-l">created with &#10084;</p>
          </footer>
        </div>
    );    
}
export default Home
