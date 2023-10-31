"use client"
import React, { useEffect, useState } from 'react'
import TrendingCard from './TrendingCard'
import "./blogCategories.scss"
import CategoriesModal from './CategoriesModal'
import Loader from '@/components/Loader/Loader'

function BlogCategories({countryId}) {
    const [isShowModal, setIsShowModal] = useState(false);
    const [articleData, setArticleData] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const getTrendingData = async () => {
        try {
            setIsLoading(true);
            const getTrendingDataRes = await fetch(`${process.env.BACKEND_END_POINT_URL}/health-hub/trending?country=${countryId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const getTrendingData = await getTrendingDataRes.json();
            if (getTrendingData && getTrendingData.length > 0) {
                setArticleData([...getTrendingData].slice(0, 4));
            }
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);
            console.log("Error while fetching trending data",error)
        }
    }
    const getCategoriesList = async () => {
        try {
            const getCategoriesDataRes = await fetch(`${process.env.BACKEND_END_POINT_URL}/health-hub-category?country=${countryId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const getCategoriesData = await getCategoriesDataRes.json();
            if (getCategoriesData && getCategoriesData.length > 0) {
                setCategoriesList([...getCategoriesData])
            }

        } catch (error) {
            console.log("Error while fetching Categories List Data", error)
        }
    }

    useEffect(() => {
        getTrendingData();
        getCategoriesList()
    }, [])
    function openCategotiesModal() {
        setIsShowModal(true);
    }
    return (
        <div className='categories-main'>
            <div className='categories-cont'>
                <div className='select-cat-div'>
                    <div className='cat-txt' >Categories</div>
                    <div className='select-cat' onClick={() => openCategotiesModal()}>
                        <span>Select categories</span> <img id='down-arrow' src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/dropdown.svg' />
                    </div>
                </div>
                <TrendingCard articleData={articleData} />
                {
                    isShowModal ? <CategoriesModal setIsLoading={setIsLoading} setArticleData={setArticleData} categoriesList={categoriesList} setIsShowModal={setIsShowModal} /> : ""
                }
                <Loader isShow={isLoading} />
            </div>
        </div>
    )
}

export default BlogCategories
