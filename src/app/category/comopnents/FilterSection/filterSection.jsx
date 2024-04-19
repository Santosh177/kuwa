'use client'
import React, { useEffect, useState } from "react"
import style from "./filterSection.module.scss"
import PageHeader from "@/components/PageHeader/PageHeader";
import { usePathname, useRouter, useSearchParams } from "next/navigation";



const checkIamge = "https://d25uasl7utydze.cloudfront.net/kuwa/check_uncheck%20(1).svg";
const uncheckImage = "https://d25uasl7utydze.cloudfront.net/kuwa/check_uncheck.svg";
const colapseImage = "https://d25uasl7utydze.cloudfront.net/kuwa/collapse.svg"
const rectangularUnCheck = "https://d25uasl7utydze.cloudfront.net/kuwa/Group%2041782%20(1).svg"
const rectangularCheck = "https://d25uasl7utydze.cloudfront.net/kuwa/RectangularSelcted.svg";
const FilterSectionDesktop = ({ setSelectedOptionsHead , responseData , paramsData , setParamsData }) => {
    const { sort = {}, superCollection = {} } = responseData || {};
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const singleSelect = [{ cat: {name:"sort", value:"sort_by"}, options: [{name:"New Arivals",value:"new_arrivals"},{name:"Price Low to high",value:"price_low_to_high"},{name:"Price High to Low",value:"price_high_to_low"}] }]
    const multiSelect = superCollection

    const stockSelect = [{cat: {name:"AVAILABLE", value:"inStock"}, options: [{name:"In Stock",value:"inStock"}]}]
    
    const addQuryPrams = (type,data)=>{
        const current = new URLSearchParams(searchParams);
        if(type === "sort"){
            current.set(type, data);
        }
        else if(type === "AVAILABLE"){
            current.set(type, data);
        }
        else{
            current.set(type, data.join(","));
        }
        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.replace(`${pathname}${query}`);
    }

    const onClickSelection = (option) => {

            if(paramsData && paramsData['category'] && paramsData['category'].length>0 && paramsData['category'].includes(option)){
                const filteredData = paramsData['category'].filter((item) => item !== option);
                addQuryPrams("category",filteredData) 
                setParamsData((prevObject)=>({...prevObject,category:filteredData}))
            }else{
                if(paramsData && paramsData['category'] ){
                    addQuryPrams("category",[...paramsData['category'], option])
                    setParamsData((prevObject)=>({...prevObject,category:[...prevObject['category'],option]}))
                }else{
                    addQuryPrams("category",[option])
                    setParamsData((prevObject)=>({...prevObject,category:[option]}))
                }
               
            }
    }

    const onClickSort = (option) =>{
      
            if(paramsData && paramsData['sort'] && paramsData['sort'] === option.value ){
                addQuryPrams("sort", "");
                setParamsData((prevObject)=>({...prevObject,sort:""}))
            }else{
                addQuryPrams("sort", option.value);
                setParamsData((prevObject)=>({...prevObject,sort:option.value}))
            }
    }

    const onClickStock = (option) =>{
        if(paramsData && paramsData['AVAILABLE'] && paramsData['AVAILABLE'] === option.value ){
            addQuryPrams("AVAILABLE", "");
            setParamsData((prevObject)=>({...prevObject,AVAILABLE:""}))
        }else{
            addQuryPrams("AVAILABLE", option.value);
            setParamsData((prevObject)=>({...prevObject,AVAILABLE:option.value}))
        }
    }
   
    return (
        <div className={style.filterSectionContainer}>
            {singleSelect.map((item) => {
                const { cat = '', options = [] } = item || {}
                const [isCollapse, setIsCollapse] = useState(true)
                return (
                    <div className={style.filterSectionCategory}>
                        <div className={style.Txt} onClick={() => setIsCollapse(!isCollapse)}>
                            <div className={style.cat} >{cat.name}</div>
                            <div className={style.arrrow}><img src={colapseImage} alt="collapse image" style={(!isCollapse)?{WebkitTransform:'rotate(180deg)'}:{}}/></div>
                        </div>
                        {isCollapse && <div className={style.options}>
                            {options.map((ele) => {
                                const image = ele.value === (paramsData && paramsData['sort']) ? checkIamge : uncheckImage;
                                return (
                                    <div className={style.optionsTxt} onClick={() => onClickSort(ele)}>
                                        <div className={style.tickBox}><img src={image} alt="check box" /></div>
                                        <div className={style.elements}>{ele.name}</div>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>
                )
            })}

            {stockSelect.map((item) => {
                  const { cat = '', options = [] } = item || {}
                  const [isCollapse, setIsCollapse] = useState(true)
                  return (
                    <div className={style.filterSectionCategory}>
                        <div className={style.Txt} onClick={() => setIsCollapse(!isCollapse)}>
                            <div className={style.cat} >{cat.name}</div>
                            <div className={style.arrrow}><img src={colapseImage} alt="collapse image" style={(!isCollapse)?{WebkitTransform:'rotate(180deg)'}:{}}/></div>
                        </div>
                        {isCollapse && <div className={style.options}>
                            {options.map((ele) => {
                                const image = ele.value === (paramsData && paramsData['AVAILABLE']) ? checkIamge : uncheckImage;
                                return (
                                    <div className={style.optionsTxt} onClick={() => onClickStock(ele)}>
                                        <div className={style.tickBox}><img src={image} alt="check box" /></div>
                                        <div className={style.elements}>{ele.name}</div>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>
                )
            })}
            
            {multiSelect?.map((item) => {
                const { superCollectionName = '', category = [] } = item || {}
                const [isCollapse, setIsCollapse] = useState(true)
                if (superCollectionName) {
                    return (
                        <div className={style.filterSectionCategory}>
                            <div className={style.Txt} onClick={() => setIsCollapse(!isCollapse)}>
                                <div className={style.cat} >{superCollectionName}</div>
                                <div className={style.arrrow}><img src={colapseImage} alt="collapse image" style={(!isCollapse)?{WebkitTransform:'rotate(180deg)'}:{}} /></div>
                            </div>
                            {isCollapse && <div className={style.options}>
                                {category && category.length > 0 ? category.map((ele) => {
                                    const { id = "", collectionName = "" } = ele || {};
                                    let isOptionSelected = false
                                    if (paramsData && paramsData['category'] && paramsData['category'].length > 0 && paramsData['category'].includes(collectionName)) {
                                        isOptionSelected = true
                                    }
                                    const image = isOptionSelected ? rectangularCheck : rectangularUnCheck;
                                    return (
                                        <div className={style.optionsTxt} onClick={() => onClickSelection(collectionName)} >
                                            <div className={style.tickBox}><img src={image} alt="check box" /></div>
                                            <div className={style.elements}>{collectionName}</div>
                                        </div>
                                    )
                                }) : <></>}
                            </div>}
                        </div>
                    )
                } else {
                    return <></>
                }
            })}
        </div>
    )
}
const FilterSectionMobile = ({ setSelectedOptionsHead, responseData, slectedFilter, setSelectedFilter , paramsData , setParamsData}) => {
    const { sort = {}, superCollection = {} } = responseData || {};
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const multiSelect = superCollection;

    console.log("multiSelect",multiSelect)
    // const singleSelect = ["new arivals", "Price Low to high", "Price high to low"]
    const singleSelect = [{name:"New Arivals",value:"new_arrivals"},{name:"Price Low to high",value:"price_low_to_high"},{name:"Price High to Low",value:"price_high_to_low"}]
    // const singleSelect = [1, 2, 3, 4]
    const stockSelect = [{cat:"AVAILABLE", value:"inStock", options: [{name:"In Stock",value:"inStock"}]}]
    const [selectedCatogries, setSelectedCatogries] = useState([]);
    const [selectedTab, setSelectedTab] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedSingle,setSelectedSingle] = useState("");
    const [selectedCollection, setSelectedSelection] = useState([]);
    const [selectedStockFilter,setSelectedStockFilter] = useState([]);
    const [selectedStock, setSelectedStock] = useState([])

        console.log("santoParams",paramsData)
    useEffect(() => {
        setSelectedTab(multiSelect[0]?.superCollectionName);
        setSelectedCatogries(multiSelect[0]?.category)
    }, []);

    const handelOnclick = (options, cat) => {
        setSelectedCatogries(options);
        setSelectedTab(cat)
    };
    const handleStockFilter = (options, cat) => {
        console.log("stockFilter", options, cat);
        setSelectedStockFilter(options);
        setSelectedTab(cat)
    }
    const addQuryPrams = (type,data)=>{
        console.log("addQuryPrams", type, data)
        const current = new URLSearchParams(searchParams);
        console.log("current",current)
        if(type === "sort"){
            current.set(type, data);
        }
        else if(type === "AVAILABLE"){
            current.set(type,data)
        }
        else{
            current.set(type, data.join(","));
        }
        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.replace(`${pathname}${query}`);
    }

    const onClickSelection = (option) =>{
        console.log("optionoption",option)

        if(selectedCollection && selectedCollection.includes(option)){
            const filteredData = selectedCollection.filter((item) => item !== option);
            setSelectedSelection(filteredData)
        }else{
            setSelectedSelection(current => [...current, option]);
        }

    }
    const onClickStockSelect = (option) =>{

        if(selectedStock && selectedStock.includes(option)){
            const filteredData = selectedStock.filter((item) => item !== option);
            setSelectedStock(filteredData)
        }else{
            setSelectedStock(current => [...current, option]);
        }
    }

    console.log("selectedStock",selectedStock)
    console.log("selectedCollection",selectedCollection)

    useEffect(()=>{
        // console.log("paramsDataparamsData",paramsData)
        if(paramsData && paramsData['category'] && paramsData['category'].length > 0){
            setSelectedSelection(paramsData['category'])
        }

    },[paramsData])

    console.log("selectedCollectionselectedCollection",selectedCollection)

    const onClickSort = (option) =>{
        
            if(paramsData && paramsData['sort'] && paramsData['sort'] === option.value ){
                addQuryPrams("sort", "");
                setParamsData((prevObject)=>({...prevObject,sort:""}))
            }else{
                addQuryPrams("sort", option.value);
                setParamsData((prevObject)=>({...prevObject,sort:option.value}))
            }
    }
    

    const handelApply = () => {
        setSelectedFilter("NOT_SELCTED")
        if(selectedStock.length > 0){
            addQuryPrams("AVAILABLE",selectedStock)
        }
        else{
            addQuryPrams("category",selectedCollection)
        }   
        setParamsData((prevObject)=>({...prevObject,category:selectedCollection,}))
    }
    const handelCancel = () => {
        setSelectedFilter("NOT_SELCTED")
        if(paramsData && paramsData['category'] && paramsData['category'].length > 0){
            setSelectedSelection(paramsData['category'])
        }
    }
    if (slectedFilter === "Filter") {
        return (
            <>
                <PageHeader headerName="Filter" backButtonAction={() => setSelectedFilter("NOT_SELCTED")} />
                <div className={style.mobileFiltration} >
                    <div className={style.mobileCategories} >
                        <div className={style.categories} >
                        {stockSelect.map((item) => {
                                const { cat , options } = item || {};
                                if (cat) {
                                    return (<div className={[style.Txt, (cat === selectedTab ? style.slectedTab : "")].join(" ")} onClick={() => handleStockFilter(options, cat) }>
                                        <div className={style.cat} >{cat}</div>
                                    </div>)
                                } else {
                                    return <></>
                                } 

                            })}
                            {multiSelect.map((item) => {
                                const { superCollectionName, category } = item || {};
                                if (superCollectionName) {
                                    return (<div className={[style.Txt, (superCollectionName === selectedTab ? style.slectedTab : "")].join(" ")} onClick={() => handelOnclick(category, superCollectionName)} >
                                        <div className={style.cat} >{superCollectionName}</div>
                                    </div>)
                                } else {
                                    return <></>
                                }
                            })}
                           
                        </div>
                        <div className={style.options}>
                        {selectedStockFilter.map((item) => {
                                const { name = "", value = "" } = item || {};
                                let isOptionSelected = false
                                if (selectedStock && selectedStock.length > 0 && selectedStock.includes(name)){
                                    isOptionSelected = true
                                }
                                const image = isOptionSelected ? rectangularCheck : rectangularUnCheck;
                                if (name) {
                                    return (
                                        <div className={style.optionsTxt} onClick={() => onClickStockSelect(name)} >
                                            <div className={style.tickBox}><img src={image} alt="check box" /></div>
                                            <div className={style.elements}>{name}</div>
                                        </div>
                                    )

                                } else {
                                    return <></>
                                }
                            })}
                            {selectedCatogries.map((item) => {
                                const { id = "", collectionName = "" } = item || {};
                                let isOptionSelected = false
                                if (selectedCollection && selectedCollection.length > 0 && selectedCollection.includes(collectionName)){
                                    isOptionSelected = true
                                }
                                const image = isOptionSelected ? rectangularCheck : rectangularUnCheck;
                                if (collectionName) {
                                    return (
                                        <div className={style.optionsTxt} onClick={() => onClickSelection(collectionName)} >
                                            <div className={style.tickBox}><img src={image} alt="check box" /></div>
                                            <div className={style.elements}>{collectionName}</div>
                                        </div>
                                    )

                                } else {
                                    return <></>
                                }
                            })}
                        </div>
                    </div>
                    <div className={style.footerButton} >
                        <div onClick={() => handelCancel()} className={style.cancel}><span>cancel</span></div>
                        <div onClick={() => handelApply()} className={style.filterApply}><span>ApplyFilter</span></div>
                    </div>
                </div>
            </>
        )
    } else if (slectedFilter === "Sort By") {
        return (
            <div className={style.singleSelctedContainer}>
                <div className={style.allOptions}>
                    <div className={style.crossConatainer}>
                        <div className={style.sortBy} >Sort By</div>
                        <div className={style.cross} onClick={()=>setSelectedFilter("NOT_SELCTED")} ><img src="https://d25uasl7utydze.cloudfront.net/kuwa/X.svg" alt="cross" /></div>
                    </div>
                    {singleSelect.map((item) => {
                        const image = item.value === (paramsData && paramsData['sort']) ? checkIamge : uncheckImage;
                        return (
                            <div className={style.optionsTxt} onClick={()=>{onClickSort(item);setSelectedFilter("NOT_SELCTED");}}>
                                <div className={style.tickBox}><img src={image} alt="check box" /></div>
                                <div className={style.elements}>{item.name}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } else {
        return <></>
    }
}
const FilterSection = ({ setSelectedOptionsHead, responseData, slectedFilter, setSelectedFilter, setParamsData, paramsData }) => {
    return (
        <div className={style.filterOuterContainer}>
            <div className={style.isDekstop} style={{width:'235px'}}>
            {responseData &&Object.keys(responseData).length > 0 &&  <FilterSectionDesktop paramsData={paramsData} setParamsData={setParamsData} responseData={responseData} setSelectedOptionsHead={setSelectedOptionsHead}  />}
            </div>
            <div className={style.isMobile}>
               {responseData &&Object.keys(responseData).length > 0 &&  <FilterSectionMobile paramsData={paramsData} setParamsData={setParamsData} slectedFilter={slectedFilter} setSelectedOptionsHead={setSelectedOptionsHead} setSelectedFilter={setSelectedFilter} responseData={responseData} />}
            </div>
        </div>
    )
}
export default FilterSection