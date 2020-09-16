import React, { Component } from 'react'
import "./HotMusic.css"
import HotList from "./components/List/List"
import { connect } from 'react-redux'
import { hotList, reqHotListAction } from '../../store/modules/hotMusic'
import { changePicAction, pic } from '../../store/modules/play'
class HotMusic extends Component {

  componentDidMount() {
    const { reqHotList } = this.props
    reqHotList()
    this.getDate()
  }
  play(id, pic) {
    this.props.history.push("/play/" + id)
    const {changePic } = this.props
    changePic(pic)
  }

  getDate() {
    let date = new Date()
    this.month = (date.getMonth() + 1 + "").padStart(2, "0")
    this.day = (date.getDate() + "").padStart(2, "0")
  }
  render() {
    const { hotList } = this.props
    return (
      <div className="hot_music">
        <div className="hot_titile">
          <h2>
            <p>更新时间:{this.month}月{this.day}日</p>
          </h2>
        </div>
        {hotList.length > 0 ? <HotList hotList={hotList} play={(id, pic) => this.play(id, pic)}></HotList> : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    hotList: hotList(state),
    pic:pic(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reqHotList: () => dispatch(reqHotListAction()),
    changePic:(val)=>dispatch(changePicAction(val))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HotMusic)
