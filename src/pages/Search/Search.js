import React, { Component } from 'react'
import "./Search.css"
import searchImg from "../../assets/img/search.png"
import { connect } from 'react-redux'
import SongsList from "./components/List/List"
import {Toast} from "antd-mobile"
import {  changeKeyWordsAction, changeSearchListAction, changeWordsArrAction,  keyWords, reqSearchListAction, searchList, wordsArr } from '../../store/modules/search'
import { changePicAction, pic } from '../../store/modules/play'

class Search extends Component {

  componentDidMount() {
    const { changeKeyWords, changeSearchList} = this.props
    changeSearchList({})
    changeKeyWords("")
  }

  keyWords(e) {
    const { changeKeyWords } = this.props
    changeKeyWords(e.target.value)
    
  }
  search() {
    const { keyWords, reqSearchList, wordsArr, changeWordsArr } = this.props
    if (keyWords !== "") {
      
      reqSearchList(keyWords)
      let bool = wordsArr.some(item => item === keyWords)
      if (!bool) {
        wordsArr.push(keyWords)
        changeWordsArr(wordsArr)
        localStorage.setItem("wordsArr",JSON.stringify(wordsArr))
      }
    }else {
      Toast.info("请输入搜索内容",1)
    }
  }
  play(id,pic) {
    this.props.history.push("/play/" + id)
    const {changePic } = this.props
    changePic(pic)
  }

  delHis(){
    const {changeWordsArr } = this.props
    changeWordsArr([])
    localStorage.removeItem("wordsArr")
  }

  async searchHis(item){
    const {changeKeyWords} = this.props
    await Promise.resolve(changeKeyWords(item))
    this.search()
  }



  render() {
    const { keyWords, searchList, wordsArr } = this.props
 
    return (
      <div className="search">
        <div className="search_box">
          <img src={searchImg} alt="" onClick={() => this.search()} />
          <input type="text" className="sear_inp" placeholder="请输入关键词" value={keyWords} onChange={(e) => this.keyWords(e)} />
        </div>
        <div className="del"><span onClick={()=>this.delHis()}>删除历史</span></div>
        {
          keyWords ? (
            searchList.songs ? <SongsList songs={searchList.songs} play={(id,pic) => this.play(id,pic)}></SongsList> : null
          ) : (

              <div className="gjc">
                {
                  wordsArr.length > 0 ? (
                    wordsArr.map(item => {
                      return <p key={item} onClick={()=>this.searchHis(item)}>{item}</p>
                    })
                    
                  ) : null
                }
              </div>
            )
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    searchList: searchList(state),
    keyWords: keyWords(state),
    wordsArr: wordsArr(state),
    pic:pic(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reqSearchList: (keywords) => dispatch(reqSearchListAction(keywords)),
    changeKeyWords: (val) => dispatch(changeKeyWordsAction(val)),
    changeSearchList: (val) => dispatch(changeSearchListAction(val)),
    changeWordsArr: (val) => dispatch(changeWordsArrAction(val)),
    changePic:(val)=>dispatch(changePicAction(val))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
