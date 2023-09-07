import React from 'react'
import ArticleCard from './ArticleCard'
import "./latestBlog.scss";
function LatestBlog() {
    // let style={
    //     color:"#07141A",
    //     fontSize:"24px",
    //     fontWeight:500,
    //     margin:"32px auto",
    //     textAlign:"center",

    // }
  
    return (
        <div className='latest-blog-main'>
            <div className='heading'>Latest Blogs</div>
            <ArticleCard />
        </div>
    )
}

export default LatestBlog
