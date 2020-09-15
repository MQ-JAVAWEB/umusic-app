import React from 'react'
import "./List.css"
export default function List(props) {
  const { showNum, recNewSong,play } = props
  return (
    <div className="recom_list">
      {showNum ? null : <h2>最新音乐</h2>}
      <ul>
        {
          recNewSong.map((item, index) => {
            return (
              <li key={item.id} onClick={()=>play(item.id)}>
                {showNum ? <div className="num">{item.index < 9 ? "0" + (item.index + 1) : item.index + 1}</div> : null}
                <div className="list">
                  <p className="title">{item.name}</p>
                  <p className="intro">
                    <i></i>
                    {
                      item.song.artists.map(i => {
                        return (
                        <span key={i.id}>{i.name}</span>
                        )
                      })
                      
                    }
                    <span>—{item.song.album.name}</span>
                  </p>
                </div>
                <i className="bgi"></i>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
