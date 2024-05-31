import React from 'react'
import "./blogBanner.scss";
function BlogBanner() {
  return (
    <>
     <div className='banner-main'>
      <div className='route-txt'>Home/Blog</div>
      <div className='heading'>Unlock the Secrets of Healthy Lifestyle</div>
      <div className='img-box'>
        <img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/blog_main_image_720.png" alt="" />
      </div>
    </div>
    </>
   
  )
}

export default BlogBanner
