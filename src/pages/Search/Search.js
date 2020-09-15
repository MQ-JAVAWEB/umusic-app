import React, { Component } from 'react'
import "./Search.css"
import searchImg from "../../assets/img/search.png"
import { connect } from 'react-redux'
import SongsList from "./components/List/List"
import {Toast} from "antd-mobile"
import { changeKeyWordsAction, changeSearchListAction, changeWordsArrAction, keyWords, reqSearchListAction, searchList, wordsArr } from '../../store/modules/search'

class Search extends Component {

  componentDidMount() {
    const { changeKeyWords, changeSearchList } = this.props
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
      let bool = wordsArr.some(item => item == keyWords)
      if (!bool) {
        wordsArr.push(keyWords)
        changeWordsArr(wordsArr)
      }
      console.log(wordsArr);
    }else {
      Toast.info("请输入搜索内容",1)
    }


  }
  play(id) {
    this.props.history.push("/play/" + id)
  }
  render() {
    const { keyWords, searchList, wordsArr } = this.props

    return (
      <div className="search">
        <div className="search_box">
          <img src={searchImg} alt="" onClick={() => this.search()} />
          <input type="text" className="sear_inp" placeholder="请输入关键词" onChange={(e) => this.keyWords(e)} />
        </div>
        {
          keyWords ? (
            searchList.songs ? <SongsList songs={searchList.songs} play={(id) => this.play(id)}></SongsList> : null
          ) : (

              <div className="gjc">
                {
                  wordsArr.length > 0 ? (
                    wordsArr.map(item => {
                      return <p key={item}>{item}</p>
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
    wordsArr: wordsArr(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reqSearchList: (keywords) => dispatch(reqSearchListAction(keywords)),
    changeKeyWords: (val) => dispatch(changeKeyWordsAction(val)),
    changeSearchList: (val) => dispatch(changeSearchListAction(val)),
    changeWordsArr: (val) => dispatch(changeWordsArrAction(val))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
