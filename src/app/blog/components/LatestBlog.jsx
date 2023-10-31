"use client"
import React, { useEffect, useState } from 'react'
import ArticleCard from './ArticleCard'
import "./latestBlog.scss";
import Loader from '@/components/Loader/Loader';
function LatestBlog({ countryId }) {
    // let style={
    //     color:"#07141A",
    //     fontSize:"24px",
    //     fontWeight:500,
    //     margin:"32px auto",
    //     textAlign:"center",
    const [articleData, setArticleData] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const getLatestBlogData = async () => {
        try {
            setIsLoading(true);
            const getLatestBlogRes = await fetch(`${process.env.BACKEND_END_POINT_URL}/health-hub/latest?country=${countryId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const blogData = await getLatestBlogRes.json();
            if (blogData && blogData.length > 0) {
                setArticleData([...blogData])
            }
            setIsLoading(false);

        } catch (error) {
            console.log("Error while fetching latest blog ", error)
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getLatestBlogData();
    }, [])
    return (
        <div className='latest-blog-main'>
            <div className='heading'>Latest Blogs</div>
            <ArticleCard articleData={articleData} />
            <Loader isShow={isLoading} />
        </div>
    )
}

export default LatestBlog
