'use client'
import React, { useEffect, useState } from "react"
import style from "./filterSection.module.scss"
import PageHeader from "@/components/PageHeader/PageHeader";



const checkIamge = "https://d25uasl7utydze.cloudfront.net/kuwa/check_uncheck%20(1).svg";
const uncheckImage = "https://d25uasl7utydze.cloudfront.net/kuwa/check_uncheck.svg";
const colapseImage = "https://d25uasl7utydze.cloudfront.net/kuwa/collapse.svg"
const rectangularUnCheck = "https://d25uasl7utydze.cloudfront.net/kuwa/Group%2041782%20(1).svg"
const rectangularCheck = "https://d25uasl7utydze.cloudfront.net/kuwa/RectangularSelcted.svg";

const FilterSectionDesktop = ({ handelSelectedCat, responseData }) => {
    const { sort = {}, superCollection = {} } = responseData || {}
    // const singleSelect = [sort]
    const singleSelect = [{ cat: "sort", options: ["new arivals", "popular", "Price Low to high", "Price High to Low"] }]
    const multiSelect = superCollection
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedSingle, setSelectedSingle] = useState("")
    const onClickSelection = (option) => {
        if (selectedOptions && selectedOptions.length > 0 && selectedOptions.includes(option)) {
            const filteredData = selectedOptions.filter((item) => item !== option);
            setSelectedOptions(filteredData)
        } else {
            setSelectedOptions([...selectedOptions, option]);
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
                            <div className={style.cat} >{cat}</div>
                            <div className={style.arrrow}><img src={colapseImage} alt="collapse image" /></div>
                        </div>
                        {isCollapse && <div className={style.options}>
                            {options.map((ele) => {
                                // const { id = "" } = ele || {};
                                const image = ele === selectedSingle ? checkIamge : uncheckImage;
                                return (
                                    <div className={style.optionsTxt} onClick={() => setSelectedSingle(ele)}>
                                        <div className={style.tickBox}><img src={image} alt="check box" /></div>
                                        <div className={style.elements}>{ele}</div>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>
                )
            })}
            {multiSelect.map((item) => {
                const { superCollectionName = '', category = [] } = item || {}
                const [isCollapse, setIsCollapse] = useState(true)
                if (superCollectionName) {
                    return (
                        <div className={style.filterSectionCategory}>
                            <div className={style.Txt} onClick={() => setIsCollapse(!isCollapse)}>
                                <div className={style.cat} >{superCollectionName}</div>
                                <div className={style.arrrow}><img src={colapseImage} alt="collapse image" /></div>
                            </div>
                            {isCollapse && <div className={style.options}>
                                {category && category.length > 0 ? category.map((ele) => {
                                    const { id = "", collectionName = "" } = ele || {};
                                    let isOptionSelected = false
                                    if (selectedOptions && selectedOptions.length > 0 && selectedOptions.includes(id)) {
                                        isOptionSelected = true
                                    }
                                    const image = isOptionSelected ? rectangularCheck : rectangularUnCheck;
                                    return (
                                        <div className={style.optionsTxt} onClick={() => onClickSelection(id)} >
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
const FilterSectionMobile = ({ handelSelectedCat, responseData, slectedFilter, setSelectedFilter }) => {
    const { sort = {}, superCollection = {} } = responseData || {}
    // const singleSelect = [sort]
    const multiSelect = superCollection
    const singleSelect = ["new arivals", "popular", "Price Low to high", "Price high to low"]
    // const multiSelect = [{ cat: 'health goals', options: ["All health goals", "collagen", "digestion", "Beauty & Skin", "Focus & Energy"] }, { cat: 'goals', options: ["sff goals", "sdfsdf", "digessdfsdtion", " & Skin", "& Energy"] }]
    const [selectedCatogries, setSelectedCatogries] = useState([]);
    const [selectedTab, setSelectedTab] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedSingle,setSelectedSingle] = useState("")
    useEffect(() => {
        setSelectedTab(multiSelect[0].superCollectionName);
        setSelectedCatogries(multiSelect[0].category)
    }, []);

    const handelOnclick = (options, cat) => {
        setSelectedCatogries(options);
        setSelectedTab(cat)
    };
    const onClickSelection = (option) => {
        if (selectedOptions && selectedOptions.length > 0 && selectedOptions.includes(option)) {
            const filteredData = selectedOptions.filter((item) => item !== option);
            setSelectedOptions(filteredData)
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    }
    const handelApply = () => {
        setSelectedFilter("NOT_SELCTED")
    }
    if (slectedFilter === "Filter") {
        return (
            <>
                <PageHeader headerName="Filter" backButtonAction={() => setSelectedFilter("NOT_SELCTED")} />
                <div className={style.mobileFiltration} >
                    <div className={style.mobileCategories} >
                        <div className={style.categories} >
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
                            {selectedCatogries.map((item) => {
                                const { id = "", collectionName = "" } = item || {};
                                let isOptionSelected = false
                                if (selectedOptions && selectedOptions.length > 0 && selectedOptions.includes(id)) {
                                    isOptionSelected = true
                                }
                                const image = isOptionSelected ? rectangularCheck : rectangularUnCheck;
                                if (collectionName) {
                                    return (
                                        <div className={style.optionsTxt} onClick={() => onClickSelection(id)} >
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
                        <div onClick={() => setSelectedFilter("NOT_SELCTED")} className={style.cancel}><span>cancel</span></div>
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
                        const image = item === selectedSingle ? checkIamge : uncheckImage;
                        return (
                            <div className={style.optionsTxt} onClick={()=>setSelectedSingle(item)}>
                                <div className={style.tickBox}><img src={image} alt="check box" /></div>
                                <div className={style.elements}>{item}</div>
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
const FilterSection = ({ handelSelectedCat, responseData, slectedFilter, setSelectedFilter }) => {
    return (
        <div className={style.filterOuterContainer}>
            <div className={style.isDekstop}>
                <FilterSectionDesktop responseData={responseData} />
            </div>
            <div className={style.isMobile}>
                <FilterSectionMobile slectedFilter={slectedFilter} setSelectedFilter={setSelectedFilter} responseData={responseData} />
            </div>
        </div>
    )
}
export default FilterSection