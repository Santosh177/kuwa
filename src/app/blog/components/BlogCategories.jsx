import React from 'react'
import TrendingCard from './TrendingCard'
import "./blogCategories.scss"

function BlogCategories() {
    return (
        <div className='categories-main'>
            <div className='categories-cont'>
                <div className='select-cat-div'>
                    <div className='cat-txt'>Categories</div>
                    <div className='select-cat'>
                        <span>Select categories</span> <span> &#8964;</span>
                    </div>
                </div>
                <TrendingCard />
            </div>
        </div>
    )
}

export default BlogCategories
