import axios from "axios"
import qs from "qs"


axios.interceptors.response.use(res=>{
  console.group("===========请求地址："+res.config.url+"==========")
  console.log(res);
  console.groupEnd()
  return res
})

// 获取轮播图
export const reqestBanner = (type=1)=>{
  return axios({
    url:"/banner",
    params:{
      type
    }
  })
}
// 获取首页歌单
export const requestRecSong = (limit=6)=>{
  return axios({
    url:"/personalized",
    params:{
      limit
    }
  })
}
// 获取首页歌曲列表
export const requestRecNewSong = ()=>{
  return axios({
    url:"/personalized/newsong"
  })
}

// 获取热歌榜列表
export const requestHotList = (id=3778678)=>{
  return axios({
    url:"/top/list",
    params:{
      id
    }
  })
}

// 获取歌单详情列表
export const requestRecSongList = (id)=>{
  return axios({
    url:"/playlist/detail",
    params:{
      id
    }
  })
}
// 获取音乐播放地址
export const requestPlay=(id)=>{
  return axios({
    url:"/song/url",
    params:{
      id
    }
  })
}
// 搜索
export const requestSearch=(keywords)=>{
  return axios({
    url:"/search",
    params:{
      keywords
    }
  })
}

// 获取歌词
export const requestLyric=(id)=>{
  return axios({
    url:"/lyric",
    params:{
      id
    }
  })
}