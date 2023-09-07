"use client"
import React from 'react'
import RelatedProductsCard from './RelatedProductsCard'
import "./authorDetailsPage.scss"
import ProductSlider from '@/components/ProductSlider/ProductSlider'
function AuthorDetailsPage() {

  const data=[];
  const product=[];
  return (
    <>
    <div className='article-main'>
      <div className='article-cont'>
        <div className='article-category'>Sport Nutrition</div>
        <div className='article-ask-ques'>
          Why you should avoid protein ?
        </div>
        <div className='author-desc'>
          <div><img src="" alt="" />
            <span>by Ankur Majumder</span>
            <span>&#x2022;</span>
            <span>02/03/23</span>
          </div>
        </div>
        <div className='article-desc'>
        A head full of hair is not just a matter of vanity. Losing hair without control over its regrowth can create serious psychological distress, especially when it starts at a fairly young age and has a noticeable impact on the way you look. But there are numerous steps that you can take to slow down or stop hair loss.
        </div>
        <div className='article-author-img'>
          <img src="" alt="" />
        </div>
        <div className='article-desc'>

        </div>
      </div>
    </div>
    <ProductSlider data={product} index="9" totalRow={data.length || 1}/>

    </>
  )
}

export default AuthorDetailsPage
