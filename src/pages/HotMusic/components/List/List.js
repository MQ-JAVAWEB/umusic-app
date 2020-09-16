import React from 'react'
import "./List.css"
export default function List(props) {
  const { hotList ,play} = props
  return (
    <div className="hot_list">
      
      <ul>
        {
          hotList.map((item, index) => {
            return (
              <li key={item.id} onClick={()=>play(item.id,item.al.picUrl)}>
                <div className="num">{index < 9 ? "0" + (index + 1) : index + 1}</div>
                <div className="list">
                  <p className="title">{item.name}</p>
                  <p className="intro">
                    <i></i>
                    {
                      item.ar.map(i => {
                        return (
                        <span key={i.id}>{i.name}</span>
                        )
                      })
                    }
                    <em>—{item.al.name}</em>
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
