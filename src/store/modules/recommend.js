import { reqestBanner, requestRecNewSong, requestRecSong } from "../../utils/request"


// 定义初始banner
const initState={
  banner:[],
  recSong:[],
  recNewSong:[]
}

// reducer 改变banner
const reducer=((state=initState,action)=>{
  switch(action.type){
    case "changeBanner":
      return {
        ...state,
        banner:action.banner
      }
    case "changeRecSong":
      return {
        ...state,
        recSong:action.recSong
      }
    case "changeRecNewSong":
      return {
        ...state,
        recNewSong:action.recNewSong
      }
    default:
      return state
  }
})

// action
export const changeBannerAction=(banner)=>{
  return {
    type:"changeBanner",
    banner
  }
}
export const changeRecSongAction=(recSong)=>{
  return {
    type:"changeRecSong",
    recSong
  }
}
export const changeRecNewSongAction = (recNewSong)=>{
  return {
    type:"changeRecNewSong",
    recNewSong
  }
}


// request
export const reqBannerListAction=()=>{
  return (dispatch,getState)=>{
    const {banner} = getState().recommend;
    if(banner.length>0){
      return;
    }
    reqestBanner().then(res=>{
      dispatch(changeBannerAction(res.data.banners));
    })
  }
}
export const reqRecSongListAction=()=>{
  return (dispatch,getState)=>{
    const {recSong} = getState().recommend;
    if(recSong.length>0){
      return;
    }
    requestRecSong().then(res=>{
      dispatch(changeRecSongAction(res.data.result))
    })
  }
}
export const reqRecNewSongListAction=()=>{
  return (dispatch,getState)=>{
    const {recNewSong} = getState().recommend;
    if(recNewSong.length>0){
      return;
    }
    requestRecNewSong().then(res=>{
      dispatch(changeRecNewSongAction(res.data.result))
    })
  }
}


export const banner= state=>state.recommend.banner
export const recSong = state=>state.recommend.recSong
export const recNewSong = state=>state.recommend.recNewSong

export default reducer