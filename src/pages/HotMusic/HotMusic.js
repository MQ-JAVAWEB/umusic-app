import React, { Component } from 'react'
import "./HotMusic.css"
import HotList from "./components/List/List"
import { connect } from 'react-redux'
import { hotList, reqHotListAction } from '../../store/modules/hotMusic'
 class HotMusic extends Component {

  componentDidMount(){
    const {reqHotList} = this.props
    reqHotList()
  }
  play(id){
    this.props.history.push("/play/"+id)
  }
  render() {
    const {hotList} = this.props
    return (
      <div className="hot_music">
        <div className="hot_titile">
            <h2>
              <p>更新时间:09月10日</p>
            </h2>
        </div>
        {hotList.length>0?<HotList hotList={hotList} play={(id)=>this.play(id)}></HotList>:null}
      </div>
    )
  }
}

const mapStateToProps=state=>{
  return {
    hotList:hotList(state)
  }
}

const mapDispatchToProps=dispatch=>{
  return {
    reqHotList:()=>dispatch(reqHotListAction())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HotMusic)
