import { requestLyric, requestPlay } from "../../utils/request"



// 定义初始banner
const initState = {
  playInfo: [],
  isPlay: false,
  lyric: {},
  currentIndex:0,
  pic:""
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
    case "changeCurrentIndex" :
      return {
        ...state,
        currentIndex:action.currentIndex
      }
    case "changePic":
      return {
        ...state,
        pic:action.pic
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
export const changeCurrentIndexAction=(currentIndex)=>{
  return {
    type:"changeCurrentIndex",
    currentIndex
  }
}
export const changePicAction =(pic)=>{
  return {
    type:"changePic",
    pic
  }
}


// request
export const reqPlayInfoAction = (id) => {
  return (dispatch, getState) => {
    
    requestPlay(id).then(res => {
      dispatch(changePlayInfoAction(res.data.data))
    })
  }
}
export const reqLyricAction = (id) => {
  return (dispatch, getState) => {
    const {lyric}= getState().play
    if(lyric !== {}){
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
  export const currentIndex = state=>state.play.currentIndex
  export const pic =state=> state.play.pic
  
  export default reducer