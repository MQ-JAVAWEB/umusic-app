import React, { Component } from 'react'
import { Link,  Switch,Route,Redirect } from 'react-router-dom'
import Header from './components/Header/Header'
import "./Index.css"
import asyncComponent from "../../utils/asyncComponent"
const HotMusic = asyncComponent(()=>import("../HotMusic/HotMusic"))
const Recommend = asyncComponent(()=>import("../Recommend/Recommend"))
const Search =asyncComponent(()=>import("../Search/Search"))
export default class Index extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <div className="top_nav">
          <Link to="/index/recom"><span className="select">推荐</span></Link>
          <Link to="/index/hotMusic"><span className="select">热歌榜</span></Link>
          <Link to="/index/search"><span className="select">搜索</span></Link>
        </div>
         <Switch>
          <Route path="/index/recom" component={Recommend}></Route>
          <Route path="/index/hotMusic" component={HotMusic}></Route>
          <Route path="/index/search" component={Search}></Route>
          <Redirect to="/index/recom"></Redirect>
        </Switch> 
      </div>
    )
  }
}
