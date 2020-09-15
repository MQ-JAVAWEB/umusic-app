import React from 'react'
import "./SongStore.css"
export default function SongStore(props) {
  const { recSong,toDetail } = props
  return (
    <div className="song_store">
      <h2>推荐歌单</h2>
      <ul>
        {
          recSong.map(item => {
            return (
              <li key={item.id} onClick={()=>toDetail(item.id)}>
                <img src={item.picUrl} alt="" className="img" />
                <p className="info">{item.name}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
