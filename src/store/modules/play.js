import { requestPlay } from "../../utils/request"



// 定义初始banner
const initState={
  playInfo:[],
  isPlay:false
}

// reducer 改变banner
const reducer=((state=initState,action)=>{
  switch(action.type){
    case "changeIsPlay":
      return {
        ...state,
        isPlay:action.isPlay
      }
    case "changePlayInfo":
      return {
        ...state,
        playInfo:action.playInfo
      }
    default:
      return state
  }
})

// action
export const changeIsPlayAction=(isPlay)=>{
  return {
    type:"changeIsPlay",
    isPlay
  }
}
export const changePlayInfoAction=(playInfo)=>{
  return {
    type:"changePlayInfo",
    playInfo
  }
}


// request
export const reqPlayInfoAction=(id)=>{
  return (dispatch,getState)=>{
    requestPlay(id).then(res=>{
      dispatch(changePlayInfoAction(res.data.data))
    })
  }
}

// getters

export const isPlay = state=>state.play.isPlay
export const playInfo =state=>state.play.playInfo

export default reducer