import React from 'react'
import "./List.css"
export default function List(props) {
  const { songs,play } = props
  return (
    <div className="hot_list">
      
      <ul>
        {
          songs.map((item, index) => {
            return (
              <li key={item.id} onClick={()=>play(item.id)}>
                <div className="num">{index < 9 ? "0" + (index + 1) : index + 1}</div>
                <div className="list">
                  <p className="title">{item.name}</p>
                  <p className="intro">
                    <i></i>
                    {
                      item.artists.map(i => {
                        return (
                        <span key={i.id}>{i.name}</span>
                        )
                      })
                    }
                    <em>—{item.album.name}</em>
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
