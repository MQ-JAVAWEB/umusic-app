import React, { Component } from 'react'
import { connect } from 'react-redux'
import back from "../../assets/img/back.png"
import { reqSongListAction, songList } from '../../store/modules/songList'
import List from "./components/List/List"
import "./SongList.css"
class SongList extends Component {
  componentDidMount() {
    const { reqSongList } = this.props
    let id = this.props.match.params.id
    reqSongList(id)
  }

  back(){
    this.props.history.goBack()
  }

  play(id,pic){
    this.props.history.push("/play/"+id)
    this.props.history.pic = pic
  }
  render() {
    const { songList } = this.props
    
    return (
      songList ? (
        <div className="song_list">

          <div className="backgroundCover" style={{ backgroundImage: `url(${songList.backgroundCoverUrl?songList.backgroundCoverUrl:songList.coverImgUrl})`, backgroundSize: "cover"}}>

          </div>
          <div className="title_cover">
            <img src={back} className="back" onClick={()=>this.back()} alt="" />
            <img src={songList.coverImgUrl} className="cover_img" alt="" />
            <div className="name">
              <h2>{songList.name}</h2>
            </div>
          </div>
          { songList.tracks?<List list={songList} play={(id,pic)=>this.play(id,pic)}></List> : null}
        </div>
      ) : null



    )
  }
}

const mapStateToProps = state => {
  return {
    songList: songList(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reqSongList: (id) => dispatch(reqSongListAction(id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SongList)
