import React from 'react';
import Routes from "./Components/Routes"
// import './App.css';
import "./sass/App.scss";
import {MessagesProvider}from "./Components/ChatBot/MessagesProvider"
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MessagesProvider>
          <Navbar />
          <Routes />
        </MessagesProvider>
      </header>
    </div>
  );
}

export default App;
