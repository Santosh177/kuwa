'use client';
import React from 'react'
import BlogBanner from './BlogBanner'
import LatestBlog from './LatestBlog'
import BlogCategories from './BlogCategories'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { useCountry } from '@/context/contryDetails';

function BlogPage() {
  const { selectedCountry = {} } = useCountry();
  const countryId=selectedCountry && selectedCountry.id ||""
  return (
    <div>
      <Header />
      {/* <BlogBanner/> */}
      <LatestBlog countryId={countryId}/>
      <BlogCategories countryId={countryId} />
      <Footer/>
    </div>
  )
}

export default BlogPage
