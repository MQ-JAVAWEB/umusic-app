
import { requestSearch } from "../../utils/request"



// 定义初始banner
const initState={
  searchList:[],
  keyWords:"",
  wordsArr:localStorage.getItem("wordsArr")?JSON.parse(localStorage.getItem("wordsArr")):[]
}

// reducer 改变banner
const reducer=((state=initState,action)=>{
  switch(action.type){
    case "changeSearchList":
      return {
        ...state,
        searchList:action.searchList
      }
    case "changeKeyWords":
      return {
        ...state,
        keyWords:action.keyWords
      }
    case "changeWordsArr" :
      if(action.wordsArr){
        localStorage.setItem("wordsArr",JSON.stringify(action.wordsArr))
      }else {
        localStorage.removeItem("wordsArr")
      }
      return {
        ...state,
        wordsArr:action.wordsArr
      }
    
    
    
    default:
      return state
  }
})

// action
export const changeSearchListAction=(searchList)=>{
  return {
    type:"changeSearchList",
    searchList
  }
}
export const changeKeyWordsAction=(keyWords)=>{
  return {
    type:"changeKeyWords",
    keyWords
  }
}
export const changeWordsArrAction=(wordsArr)=>{
  return {
    type:"changeWordsArr",
    wordsArr
  }
}



// request
export const reqSearchListAction=(keywords)=>{
  return (dispatch,getState)=>{
    requestSearch(keywords).then(res=>{
      dispatch(changeSearchListAction(res.data.result))
    })
  }
}

// getters
export const searchList =state=>state.search.searchList
export const keyWords = state=>state.search.keyWords
export const wordsArr = state=>state.search.wordsArr


export default reducer