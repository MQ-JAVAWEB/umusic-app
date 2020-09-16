import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import recommend from "./modules/recommend"
import hotMusic from "./modules/hotMusic"
import songList from "./modules/songList"
import play, { reqLyricAction }  from "./modules/play"
import search, { reqSearchListAction } from "./modules/search"
// 创建根reducer
const reducer= combineReducers({
  recommend,
  hotMusic,
  songList,
  play,
  search
})

// 创建仓库store
const store=createStore(reducer,applyMiddleware(thunk))

// 添加监听
store.subscribe(()=>{
  console.log(store.getState());
})
// 测试
console.log(store.dispatch(reqLyricAction(33894312)));

export default store