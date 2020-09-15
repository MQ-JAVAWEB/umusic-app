import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import asyncC from "./utils/asyncComponent"

const Index =asyncC(()=>import("./pages/Index/Index"))
const Play = asyncC(()=>import("./pages/Play/Play"))
const SongList = asyncC(()=>import("./pages/SongList/SongList"))

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/index" component={Index}></Route>
        <Route path="/play/:id" component={Play}></Route>
        <Route path="/songlist/:id" component={SongList}></Route>
        <Redirect to="/index"></Redirect>
      </Switch>
    </div>
  );
}

export default App;
