import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Home from "./Home";
import Chatty from "./ChatBot/Chatty";
import Login from "./Login";
import Profile from "./Profile";
import Authorized from "./Authorized";

const Routes: React.FC = () => {

  return (
    <div className="main">
      <Switch>
        <Route exact path="/"><Home/></Route>
        <Route exact path="/get-started"><Chatty/></Route>
        <Route exact path="/login"><Login /></Route>
        <Route exact path="/profile"><Profile /></Route>
        <Route exact path="/authorized"><Authorized /></Route>
        <Redirect to="/"/>
      </Switch>
    </div>
  );
};

export default Routes;