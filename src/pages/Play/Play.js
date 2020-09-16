import React, { Component } from 'react'
import back from "../../assets/img/back.png"
import "./Play.css"
import needle from "../../assets/img/needle-ip6.png"
import { connect } from 'react-redux'
import { changeCurrentIndexAction, changeIsPlayAction, currentIndex, isPlay, lyric, pic, playInfo, reqLyricAction, reqPlayInfoAction } from '../../store/modules/play'
 class Play extends Component {

  componentDidMount(){
    this.getLyric()
    this.toRender()
    const {changeIsPlay,isPlay,lyric} = this.props
    if(!isPlay){
      changeIsPlay(!isPlay)
    }
    console.log(lyric);
  }

  async getLyric(){
    const {reqPlayInfo,reqLyric} = this.props
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
        let time_arr = element.substr(1,element.length-1).split(":")
        let a = time_arr[1].split(".")
        let time = parseFloat((time_arr[0]*60 + parseInt(a[0]))+"."+a[1])
        timeArr.push(time)
      });
      lyric_arr.push(text)
    } 
    lyric.lyric_arr = lyric_arr
    lyric.timeArr = timeArr
  }


  timeUpdate(e){
    e.persist()
    const {lyric,changeIndex,currentIndex} = this.props
    let nowTime = e.target.currentTime
    if(lyric.timeArr){
      lyric.timeArr.forEach((item,index)=>{
        if(nowTime >= item){
          changeIndex(index)
        }
      })
      let num = currentIndex-2
      this.refs.ul.style.top = -num * parseFloat(this.refs.li.style.height) + "rem"
    }
    
    
  }

  bofang(){
    const {changeIsPlay,isPlay,lyric} = this.props
    if(!lyric.qfy){
      // console.log(lyric);
      this.formatLyric(lyric.lrc.lyric)
    }
    
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
    const {isPlay,playInfo,lyric,currentIndex,pic} = this.props
    if(!lyric){
      this.formatLyric(lyric.lrc.lyric)
    }
    return (
      <div className="play">
        <img src={back} className="back" onClick={()=>this.back()} alt="" />
        <img src={needle} className={!isPlay?"play_gan bofang":"play_gan"} alt=""/>
        <div className="disc" onClick={()=>this.bofang()}>
          <div className="songImg">
            <img src={pic} className="bgi" alt=""/>
            {!isPlay?null:<div className="img"></div>}
            {playInfo.length>0?<audio  onTimeUpdate={(e)=>this.timeUpdate(e)} ref="video" src={playInfo[0].url}></audio>:null}
          </div>
        </div>
        <div className="lyrics">
          <ul ref="ul" style={{top:"1.88rem"}}>
            {lyric.timeArr?(
              lyric.lyric_arr.map((item,index)=>{
                return (
                  currentIndex===index?<li ref="li" style={{height:"0.98rem"}} className="current" key={index}>{item}</li>:<li style={{height:"0.98rem"}} ref="li"  key={index}>{item}</li>
                )
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
    lyric:lyric(state),
    currentIndex:currentIndex(state),
    pic:pic(state)
   }
}

const mapDispatchToProps=dispatch=>{
  return {
    changeIsPlay:(bool)=>dispatch(changeIsPlayAction(bool)),
    reqPlayInfo:(id)=>dispatch(reqPlayInfoAction(id)),
    reqLyric:(id)=>dispatch(reqLyricAction(id)),
    changeIndex:(val)=>dispatch(changeCurrentIndexAction(val))
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Play)