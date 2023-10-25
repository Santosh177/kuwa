"use client"
import React, { useEffect, useState } from 'react'
import ArticleCard from './ArticleCard'
import "./latestBlog.scss";
function LatestBlog() {
    // let style={
    //     color:"#07141A",
    //     fontSize:"24px",
    //     fontWeight:500,
    //     margin:"32px auto",
    //     textAlign:"center",
    const [articleData,setArticleData]=useState()

    const getLatestBlogData = async () => {
        const getLatestBlogRes = await fetch('https://api.kuwa.bevaleo.dev/health-hub/latest?country=1', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const blogData = await getLatestBlogRes.json();
        console.log("blogData",blogData)
        if(blogData){
            setArticleData([...blogData])
        }
    }

  useEffect(()=>{
    getLatestBlogData();
  },[])
    return (
        <div className='latest-blog-main'>
            <div className='heading'>Latest Blogs</div>
            <ArticleCard  articleData={articleData}/>
        </div>
    )
}

export default LatestBlog
