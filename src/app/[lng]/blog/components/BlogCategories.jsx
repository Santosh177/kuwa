"use client"
import React, { useEffect, useState } from 'react'
import TrendingCard from './TrendingCard'
import "./blogCategories.scss"
import CategoriesModal from './CategoriesModal'
import Loader from '@/app/[lng]/components/Loader/Loader'

function BlogCategories({countryId}) {
    const [isShowModal, setIsShowModal] = useState(false);
    const [articleData, setArticleData] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [paginationData, setPaginationData] = useState([]);

    const getTrendingData = async () => {
        try {
            setIsLoading(true);
            const getTrendingDataRes = await fetch(`${process.env.BACKEND_END_POINT_URL}/health-hub/trending`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const getTrendingData = await getTrendingDataRes.json();
            if (getTrendingData && getTrendingData.length > 0) {
                setPaginationData([...getTrendingData].slice(0, 4));
                setArticleData([...getTrendingData])
            }
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);
            console.log("Error while fetching trending data",error)
        }
    }
    const getCategoriesList = async () => {
        try {
            const getCategoriesDataRes = await fetch(`${process.env.BACKEND_END_POINT_URL}/health-hub-category`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const getCategoriesData = await getCategoriesDataRes.json();
            if (getCategoriesData && getCategoriesData.length > 0) {
                let activeCategories=[]
                 activeCategories=getCategoriesData.filter((item,index)=>{
                    return item.status ==="Active";
                })
                setCategoriesList([...activeCategories])
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
                <TrendingCard paginationData={paginationData} setPaginationData={setPaginationData} articleData={articleData} />
                {
                    isShowModal ? <CategoriesModal paginationData={paginationData} setPaginationData={setPaginationData} setIsLoading={setIsLoading} setArticleData={setArticleData} categoriesList={categoriesList} setIsShowModal={setIsShowModal} /> : ""
                }
                <Loader isShow={isLoading} />
            </div>
        </div>
    )
}

export default BlogCategories
