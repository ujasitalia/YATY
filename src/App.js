import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import StartCampaign from './StartCampaign';
import SingleCampaign from './SingleCampaign';
import Discover from './Discover';


const ReactRouterSetup = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/startcampaign'>
          <StartCampaign />
        </Route>
        <Route exact path='/discover'>
          <Discover />
        </Route>
        <Route exact path='/campaign/:id'>
          <SingleCampaign />
        </Route>
        <Route path='*'>          
            <h1>Error...</h1>
            <h3>Go back please. You shouldn't be here :)</h3>          
        </Route>
      </Switch>
    </Router>
  );
};

export default ReactRouterSetup;