import React, { Component } from 'react'
import back from "../../assets/img/back.png"
import "./Play.css"
import needle from "../../assets/img/needle-ip6.png"
import Disc from "../../assets/img/disc-ip6.png"
import playBtn from "../../assets/img/list_sprite.png"
import { connect } from 'react-redux'
import { changeIsPlayAction, isPlay, playInfo, reqPlayInfoAction } from '../../store/modules/play'
 class Play extends Component {

  componentDidMount(){
    const {changeIsPlay,isPlay,reqPlayInfo} = this.props
    changeIsPlay(!isPlay)
    let id = this.props.match.params.id
    
    reqPlayInfo(id)
    console.log(isPlay);
  }


  bofang(){
    const {changeIsPlay,isPlay} = this.props
    
    changeIsPlay(!isPlay)
    if(isPlay){
      this.refs.video.play();
     }else {
       this.refs.video.pause()
     }
    
  }


  back(){
    this.props.history.goBack()
  }
  render() {
    const {isPlay,playInfo} = this.props
    return (
      <div className="play">
        <img src={back} className="back" onClick={()=>this.back()} alt="" />
        <img src={needle} className={!isPlay?"play_gan bofang":"play_gan"} alt=""/>
        <div className="disc" onClick={()=>this.bofang()}>
          <div className="songImg">
            {!isPlay?null:<div className="img"></div>}
            {playInfo.length>0?<video ref="video" src={playInfo[0].url}></video>:null}
          </div>
        </div>
        <div className="lyrics">
          <ul>
            <li>sdasdadsa</li>
            <li>sdasdadsa</li>
            <li>sdasdadsa</li>
          </ul>
        </div>
      </div>
    )
  }
}


const mapStateToProps=state=>{
  return {
    isPlay:isPlay(state),
    playInfo:playInfo(state)
  }
}

const mapDispatchToProps=dispatch=>{
  return {
    changeIsPlay:(bool)=>dispatch(changeIsPlayAction(bool)),
    reqPlayInfo:(id)=>dispatch(reqPlayInfoAction(id))
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Play)