import { requestLyric, requestPlay } from "../../utils/request"



// 定义初始banner
const initState = {
  playInfo: [],
  isPlay: false,
  lyric: {}
}

// reducer 改变banner
const reducer = ((state = initState, action) => {
  switch (action.type) {
    case "changeIsPlay":
      return {
        ...state,
        isPlay: action.isPlay
      }
    case "changePlayInfo":
      return {
        ...state,
        playInfo: action.playInfo
      }
    case "changeLyric":
      return {
        ...state,
        lyric: action.lyric
      }
    default:
      return state
  }
})

// action
export const changeIsPlayAction = (isPlay) => {
  return {
    type: "changeIsPlay",
    isPlay
  }
}
export const changePlayInfoAction = (playInfo) => {
  return {
    type: "changePlayInfo",
    playInfo
  }
}
export const changeLyricAction = (lyric) => {
  return {
    type: "changeLyric",
    lyric
  }
}


// request
export const reqPlayInfoAction = (id) => {
  return (dispatch, getState) => {
    const {playInfo} = getState().play
    
    requestPlay(id).then(res => {
      dispatch(changePlayInfoAction(res.data.data))
    })
  }
}
export const reqLyricAction = (id) => {
  return (dispatch, getState) => {
    const {lyric}= getState().play
    if(lyric != {}){
      dispatch(changeLyricAction({}))
    }
    requestLyric(id).then(res => {
      dispatch(changeLyricAction(res.data))
    })
  }
}
  // getters

  export const isPlay = state => state.play.isPlay
  export const playInfo = state => state.play.playInfo
  export const lyric = state=>state.play.lyric

  export default reducer