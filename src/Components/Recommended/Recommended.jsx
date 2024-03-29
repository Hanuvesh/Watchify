import React, { useEffect, useState } from 'react'
import './Recommended.css'
import {value_converter} from '../../data'
import { Link } from 'react-router-dom'

const Recommended = ({categoryId}) => {

const [apiData, setApiData] = useState([]);

const fetchData = async()=>{
  const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=IN&videoCategotyId=${categoryId}&regionCode=IN&key=${import.meta.env.VITE_API_KEY}`
 let response = await fetch(relatedVideo_url)
 let data = await response.json();
 setApiData(data.items)
}

useEffect(()=>{
fetchData();
},[])

  return (
    <div className='recommended'>
      {apiData.map((item,index)=>{
        return(
          <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <div className="vid-info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{value_converter(item.statistics.viewCount)} views</p>
          </div>
        </Link>
        )
      })}
    </div>
  )
}

export default Recommended
