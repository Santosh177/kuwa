'use client'
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import FilterSection from "./FilterSection/filterSection";
import ProductSection from "./productSection/productSection";
import style from "./indexPage.module.scss"
import Loader from "@/components/Loader/Loader";
import { usePathname, useSearchParams,useRouter } from "next/navigation";
import { useCountry } from "@/context/contryDetails";
const filterDataImg = "https://d25uasl7utydze.cloudfront.net/kuwa/filter.svg";
const sortByImg = "https://d25uasl7utydze.cloudfront.net/kuwa/sort_by.svg";


const MainCategory = ({isDealPage}) => {
    console.log("isDealPage",isDealPage)
    const searchParams = useSearchParams();
    const { selectedCountry = {} } = useCountry();
    const router=useRouter();
    const [slectedFilter, setSelectedFilter] = useState("NOT_SELCTED");
    const [selectedOptionsHead, setSelectedOptionsHead] = useState({});
    const [resposneValue, setResponseValue] = useState([]);
    const [isLoding, setIsLOading] = useState(false);
    const [isLodingProduct, setIsLoadingProduct] = useState(false);
    const [responseData , setResponseData] = useState({})
    // const [searchKey,setSearchKey]=useState("");

    
 

    const [paramsData, setParamsData] = useState({})
    const params = useParams();
    const dealId= params.id || "";
    console.log("dealId",dealId)
   console.log("searchParamsugwugw",searchParams)
    console.log('paramsData',paramsData)

    useEffect(()=>{
          
        //    else{
            if(searchParams.has('category') && searchParams.has('sort')){
                const category = searchParams.get('category');
                const sort = searchParams.get('sort');
                if(category && sort){
                    setParamsData({
                        category: category.split(','),
                        sort:sort
                    })
                }else if(category){
                    setParamsData({
                        category: category.split(','),
                        sort:""
                    })
                }else if(sort){
                    setParamsData({
                        category: [],
                        sort:sort
                    })
                }
                else{
                    setParamsData({
                        category: [],
                        sort:""
                    })
                }
            }else if(searchParams.has('category')){
                const category = searchParams.get('category');
                if(category){
                    setParamsData({
                        category: category.split(',')
                    })
                }else{
                    setParamsData({
                        category: []
                    })
                }
            }else if(searchParams.has('sort')){
                const sort = searchParams.get('sort');
                if(sort){
                    setParamsData({
                        sort: sort
                    })
                }else{
                    setParamsData({
                        sort: ""
                    })
                }
            }else{
                setParamsData({
                    category: [],
                    sort:""
                })
            }
        if (searchParams.has("search_key")){
            const search = searchParams.get('search_key');
                setParamsData({ ...paramsData, searchKey: search })
                router.replace(window.location.pathname);
            }
        //    }
            
            

    },[])


    useEffect(()=>{
       
            if(paramsData && Object.keys(paramsData).length > 0){
                fetchFilterCollectionData()
            }
    
            if(paramsData && Object.keys(paramsData).length > 0 && searchParams.has('category') && searchParams.has('sort')){
    
            }
        
       
    },[paramsData])
     // const getProduct = await fetch(`/api/catrgories-products?paramsofCat=${query}`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // })

        const fetchFilterCollectionData = async () => {
            setIsLoadingProduct(true);
            const { category = [], sort = "", searchKey = "" } = paramsData || {};
            let query = "";
        
            if (sort && category.length > 0) {
                query = `sort_by=${encodeURIComponent(sort)}&category=${encodeURIComponent(category.join(','))}`;
            } else if (sort && category.length === 0) {
                query = `sort_by=${encodeURIComponent(sort)}`;
            } else if (!sort && category.length > 0) {
                query = `category=${encodeURIComponent(category.join(','))}`;
            }
        
            if (searchKey) {
                if (!sort && category.length === 0) {
                    query = `search_key=${encodeURIComponent(searchKey)}`;
                } else {
                    query += `&search_key=${encodeURIComponent(searchKey)}`;
                }
            }
        
            let endpoint = `${process.env.BACKEND_END_POINT_URL}/module/main/search/product?country=${selectedCountry.id}&${query}`;
        
            if (isDealPage) {
                endpoint = `${process.env.BACKEND_END_POINT_URL}/api/v1/deals/${dealId}?${query}&country_id=${selectedCountry.id}`;
            }
        
            try {
                const response = await fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
        
                const data = await response.json();
                setResponseValue(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error or set appropriate state
            } finally {
                setIsLoadingProduct(false);
            }
        };
        

    
        









    // const fetchData = async () => {
    //     setIsLoadingProduct(true)
    //     const { category = "", sort = "" } = selectedOptionsHead || {};
    //     let query = ""
    //     if (sort && category) {
    //         query = `sort_by=${encodeURIComponent(sort)}&category=${encodeURIComponent(category)}`
    //     } else if (sort && !category) {
    //         query = `sort_by=${encodeURIComponent(sort)}`
    //     } else if (!sort && category) {
    //         query = `category=${encodeURIComponent(category)}`
    //     };
    //     const getProduct = await fetch(`/api/catrgories-products?paramsofCat=${query}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     })
     
    //     if (getProduct) {
    //         const getProductData = await getProduct.json();
    //         setResponseValue(getProductData);
    //     }
    //     setIsLoadingProduct(false)
    // }


    const fetchFilterData = async() =>{
        setIsLOading(true)
        const getFilterData = await fetch(`/api/category-filter`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if(responseData && Object.keys(responseData).length == 0){
            const getFilterDataResp = await getFilterData.json();
            setResponseData(getFilterDataResp);
        }
        setIsLOading(false)
    }
  
    const fetchDealFilterData = async()=>{
        setIsLOading(true)
        const getFilterData = await fetch(`/api/deal-category-filter?dealId=${dealId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if(responseData && Object.keys(responseData).length == 0){
            const getFilterDataResp = await getFilterData.json();
            setResponseData(getFilterDataResp);
        }
        setIsLOading(false)
    }
    useEffect(() => {
        if(isDealPage){
            fetchDealFilterData();
        }
        else{
            fetchFilterData()
        }
            
    }, [])

    // useEffect(()=>{
    //     if(selectedOptionsHead &&  ((selectedOptionsHead.sort != "") || (selectedOptionsHead.category != ""))){
    //         // fetchData()
    //     }
    // },[selectedOptionsHead])

    const isHide = slectedFilter === "NOT_SELCTED" || slectedFilter === "Sort By";
    let isShowDotForCat = false;
    if (paramsData && paramsData['category'] && paramsData['category'].length > 0) {
        // const value = (selectedOptionsHead.category).split(",")
        isShowDotForCat = true
    }
    let isShowDotForSort = false;
    if (paramsData && paramsData['sort']) {
        // const value = selectedOptionsHead.sort
        isShowDotForSort = true
        
    }
    console.log(selectedOptionsHead.sort, "slectedFilter");
    console.log(isShowDotForSort, "slectedFilter");

    return (
        <div className={style.CategoryIndexPage}>
        
            {isHide && <Header setParamsData={setParamsData} paramsData={paramsData} isShowSeeAllBtn={false}/>}
            
            {isHide && <div className={style.FilterTabOptionMobile} >
                <div className={style.FilterTabOption}>
                    <div className={style.filterContainer} onClick={() => setSelectedFilter("Filter")} >
                        {isShowDotForCat && <div className={style.dot}></div>}
                        <div className={style.filter}>
                            <img src={filterDataImg} alt="" />
                            <span>Filter</span>
                        </div>
                    </div>
                    <div className={style.filterContainer}>
                        {isShowDotForSort && <div className={style.dot}></div>}
                        <div className={style.sortBy} onClick={() => setSelectedFilter("Sort By")}>
                            <img src={sortByImg} alt="" />
                            <div>Sort By</div>
                        </div>
                    </div>
                </div>
            </div>}
           
            {<div className={style.productAndFilter}>
                {<FilterSection paramsData={paramsData} setParamsData={setParamsData}  setSelectedOptionsHead={setSelectedOptionsHead} setSelectedFilter={setSelectedFilter} slectedFilter={slectedFilter} responseData={responseData} />}
                {isHide && <ProductSection resposneValue={resposneValue} isDealPage={isDealPage} />}
            </div >}
            {isHide && responseData &&Object.keys(responseData).length > 0  && <Footer />}
            <Loader isShow={isLoding} />
            <Loader isShow={isLodingProduct} />
        </div>
    )
}
export default MainCategory