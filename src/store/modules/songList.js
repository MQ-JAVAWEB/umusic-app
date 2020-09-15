import { requestRecSongList } from "../../utils/request"


// 定义初始banner
const initState={
  songList:[]
}

// reducer 改变banner
const reducer=((state=initState,action)=>{
  switch(action.type){
    case "changeSongList":
      return {
        ...state,
        songList:action.songList
      }
    default:
      return state
  }
})

// action
export const changeSongListAction=(songList)=>{
  return {
    type:"changeSongList",
    songList
  }
}


// request
export const reqSongListAction=(id)=>{
  return (dispatch,getState)=>{
    requestRecSongList(id).then(res=>{
      dispatch(changeSongListAction(res.data.playlist))
    })
  }
}

// getters
export const songList = state=>state.songList.songList

export default reducer