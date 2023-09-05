import React from 'react'
import BlogBanner from './BlogBanner'
import LatestBlog from './LatestBlog'
import BlogCategories from './BlogCategories'

function BlogPage() {
  return (
    <div>
      <BlogBanner/>
      <LatestBlog/>
      <BlogCategories/>
    </div>
  )
}

export default BlogPage
