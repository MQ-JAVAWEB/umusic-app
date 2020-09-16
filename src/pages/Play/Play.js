import React, { Component } from 'react'
import back from "../../assets/img/back.png"
import "./Play.css"
import needle from "../../assets/img/needle-ip6.png"
import Disc from "../../assets/img/disc-ip6.png"
import playBtn from "../../assets/img/list_sprite.png"
import { connect } from 'react-redux'
import { changeIsPlayAction, isPlay, lyric, playInfo, reqLyricAction, reqPlayInfoAction } from '../../store/modules/play'
 class Play extends Component {

  componentDidMount(){
    
    this.getLyric()
    this.toRender()
    const {changeIsPlay,isPlay} = this.props
    if(!isPlay){
      changeIsPlay(!isPlay)
    }
    
  }

  async getLyric(){
    const {reqPlayInfo,reqLyric,lyric} = this.props
    let id = this.props.match.params.id
    await Promise.resolve(reqPlayInfo(id))
    await Promise.resolve(reqLyric(id)) 
  }

  async toRender(){
    await Promise.resolve(this.render())
  }

  formatLyric(text){
    const {lyric} = this.props
    let arr = text.split("\n");
    let row = arr.length;
    let lyric_arr = []
    let timeArr = []
    for(let i=0;i<row;i++){
      let temp_row = arr[i] 
      let temp_arr = temp_row.split("]") 
      let text = temp_arr.pop(); //获取歌词文本
      
      temp_arr.forEach(element => {
        let time_arr = element.substr(1,element.length-1).split(".")[0]
        timeArr.push(time_arr)
      });
      
      // if(text !== ""){
        lyric_arr.push(text)
      // }
    } 
    lyric.lyric_arr = lyric_arr
    lyric.timeArr = timeArr
  }


  bofang(){
    const {changeIsPlay,isPlay,lyric} = this.props
    this.formatLyric(lyric.lrc.lyric)
    changeIsPlay(!isPlay)
    if(isPlay){
      this.refs.video.play();
     }else {
       this.refs.video.pause()
     }
    
  }


  back(){
    this.props.history.goBack()
    const {changeIsPlay,isPlay} = this.props
    changeIsPlay(!isPlay)
  }
  componentWillUnmount(){
    const {changeIsPlay,isPlay} = this.props
    if(isPlay){
      return 
    }else {
      changeIsPlay(!isPlay)
    }
  }
  render() {
    const {isPlay,playInfo,lyric} = this.props
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
            {lyric.timeArr?(
              lyric.lyric_arr.map((item,index)=>{
                return <li key={index}>{item}</li>
              })
            ):null}
          </ul>
        </div>
      </div>
    )
  }
}


const mapStateToProps=state=>{
  return {
    isPlay:isPlay(state),
    playInfo:playInfo(state),
    lyric:lyric(state)
   }
}

const mapDispatchToProps=dispatch=>{
  return {
    changeIsPlay:(bool)=>dispatch(changeIsPlayAction(bool)),
    reqPlayInfo:(id)=>dispatch(reqPlayInfoAction(id)),
    reqLyric:(id)=>dispatch(reqLyricAction(id))
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Play)