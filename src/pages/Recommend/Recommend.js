import React, { Component } from 'react'
import "./Recommend.css"
import SongStore from "./components/SongStore/SongStore"
import List from "./components/List/List"
import Banner from './components/Banner/Banner'
import { connect } from 'react-redux'
import { banner,recNewSong,recSong,reqBannerListAction, reqRecNewSongListAction, reqRecSongListAction } from '../../store/modules/recommend'
import { changePicAction, pic, reqLyricAction } from '../../store/modules/play'
 class Recommend extends Component {
  componentDidMount(){
    const {reqBanner,reqRecSong,reqRecNewSong} = this.props
    reqBanner()
    reqRecSong()
    reqRecNewSong()
    console.log(this.props);
  }

  toDetail(id){
    this.props.history.push("/songlist/"+id)
  }
  
  play(id,pic){
    this.props.history.push("/play/"+id)
    const {changePic,reqLyric } = this.props
    changePic(pic)
    reqLyric(id)
  }

  render() {
    const {banner,recSong,recNewSong} = this.props
    return (
      <div className="recom">
        {banner.length>0?<Banner banners={banner} ></Banner>:null}
        {recSong.length>0?<SongStore recSong={recSong} toDetail={(id)=>this.toDetail(id)}></SongStore>:null}
        {recNewSong.length>0?<List recNewSong={recNewSong} play={(id,pic)=>this.play(id,pic)}></List>:null}
      </div>
    )
  }
}


const mapStateToProps=state=>{
  return {
    banner:banner(state),
    recSong:recSong(state),
    recNewSong:recNewSong(state),
    pic:pic(state)
  }
}

const mapDispatchToProps=dispatch=>{
  return {
    reqBanner:()=>dispatch(reqBannerListAction()),
    reqRecSong:()=>dispatch(reqRecSongListAction()),
    reqRecNewSong:()=>dispatch(reqRecNewSongListAction()),
    changePic:(val)=>dispatch(changePicAction(val)),
    reqLyric:(id)=>dispatch(reqLyricAction(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Recommend)
