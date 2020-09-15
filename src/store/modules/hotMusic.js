import { requestHotList } from "../../utils/request"



// 定义初始banner
const initState={
  hotList:[]
}

// reducer 改变banner
const reducer=((state=initState,action)=>{
  switch(action.type){
    case "changeHotList":
      return {
        ...state,
        hotList:action.hotList
      }
    default:
      return state
  }
})

// action
export const changeHotListAction=(hotList)=>{
  return {
    type:"changeHotList",
    hotList
  }
}


// request
export const reqHotListAction=()=>{
  return (dispatch,getState)=>{
    const {hotList} = getState().hotMusic
    if(hotList.length>0){
      return
    }
    requestHotList().then(res=>{
      let tracks = res.data.playlist.tracks.slice(0,10)
      dispatch(changeHotListAction(tracks))
    })
  }
}

// getters
export const hotList = state=>state.hotMusic.hotList

export default reducer