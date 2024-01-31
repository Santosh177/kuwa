import { useEffect, useState } from 'react';
import styles from './trendingSearch.scss';
import { useRouter, usePathname } from 'next/navigation';



export default function TrendingSearch({ isLogin=false, isShowSeeAllBtn=true,setSearchQuery, searchData = {}, couponBanner = {}, setParamsData }) {
    const [trendingList, setTrendingList] = useState([]);
    const router = useRouter();
    const { productImage = "", productName = "", id = "", seoUrl = "" } = searchData || {};
    useEffect(() => {
        const getTrendingList = async () => {
            try {
                const res = await fetch(`${process.env.BACKEND_END_POINT_URL}/module/trending`);
                const resData =await (res && res.json()) || [];
                setTrendingList([...resData])

            } catch (error) {
                console.log("Error while getting trending list ", error);
            }
        }
        getTrendingList()
    }, [])
    const handleChip = (couponBanner, searchQuery) => {
        if (!isShowSeeAllBtn){
            if (setParamsData){
                setParamsData((previous) => ({ ...previous, searchKey: searchQuery }));
            }
            if (setSearchQuery || setParamsData){
                setSearchQuery(searchQuery);
            }
        }else{
            window.location.href = `/collections?search_key=${searchQuery}`
        }
    }
    return (
        <div id="trending-search" className='trending-search-main' 
        style={isLogin?{right:"183px"}:{}} 
        >
            <div  className='trending-search-cont'>
                <div  className='heading'>Trending search</div>
                <div  className='trending-list-wraper'>
                    {
                        trendingList && trendingList.length > 0 && trendingList.map((item, index) =><div id="trending-search" className='trending-list-chip' onClick={() => handleChip(couponBanner,item)}>{item}</div>)
                    }
                </div>
            </div>
        </div>
    )
}