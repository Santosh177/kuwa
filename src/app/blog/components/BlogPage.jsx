import React from 'react'
import BlogBanner from './BlogBanner'
import LatestBlog from './LatestBlog'
import BlogCategories from './BlogCategories'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

function BlogPage() {
  return (
    <div>
      <Header />
      <BlogBanner/>
      <LatestBlog/>
      <BlogCategories/>
      <Footer/>
    </div>
  )
}

export default BlogPage
