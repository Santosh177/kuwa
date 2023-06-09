"use client"

import react, { useEffect, useState } from "react";
import style from "./FrequntlyBoughtTogether.module.scss"


const rectangularUnCheck = "https://d25uasl7utydze.cloudfront.net/kuwa/Group%2041782%20(1).svg"
const rectangularCheck = "https://d25uasl7utydze.cloudfront.net/kuwa/RectangularSelcted.svg";


const FrequntlyBoughtTogether = ({ productData = {} }) => {
    const [slectedId, setSelectedId] = useState([]);
    const [idQunatity, setIdQunatity] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const suggestedSupplemnts = [{ id: "1", heding: "AADAR Endure Capsule For Premature Ejaculation (60 Capsules)", price: 60.01, image: "https://cdn.shopify.com/s/files/1/0630/0234/5731/products/1_5_2840ea48-db27-47a0-b901-5026bb09d3ae.jpg?v=1673263418" },
    { id: "2", heding: "AADAR Straight Up Capsule For Strength In Men (60 Capsules)", price: 34.01, image: "https://cdn.shopify.com/s/files/1/0630/0234/5731/products/3_4_cee923f9-1687-46dc-974b-07ce278eccce.jpg?v=1673263419" }
    ]
    const [data,setData] = useState(suggestedSupplemnts);
    
    const { } = productData || {}

    const handelIncriments = (noOfProduct, id, price) => {
        let idQunatitytemp = idQunatity;
        idQunatitytemp[id] = { noOfProduct: noOfProduct, price: price }
        setIdQunatity(idQunatitytemp);

    }

    const handelSelctedId = (id, price) => {
        let quantity = 1;
        for (let key in idQunatity) {
            if (key === id) {
                quantity = idQunatity[key].noOfProduct
            }
        }
        if (slectedId && slectedId.length > 0 && slectedId.includes(id)) {
            const filteredData = slectedId.filter((item) => item !== id);
            setPrice(id, "sub", quantity);
            setSelectedId(filteredData);
            handelIncriments(1, id, price);
        } else {
            setPrice(id, "add", quantity);
            setSelectedId([id, ...slectedId])
        }
    }
    const firstTimeCall = ()=>{
        if(data && data.length > 0 ){
            let selectedId =[];
            let totalPrice = 0
            data.map((item)=>{
                selectedId.push(item.id);
                totalPrice = totalPrice + parseFloat(item.price)
            });
            setTotalPrice(totalPrice)
            setSelectedId(selectedId)
        }
    }
    useEffect(()=>{
        firstTimeCall();
    },[data])
    const setPrice = (id, operation, quantity) => {
        data.map((item) => {
            if (id === item.id) {
                if (operation === "sub") {
                    setTotalPrice((parseFloat(totalPrice) - parseFloat(item.price * quantity)).toFixed(2));
                } else if (operation === "add") {
                    setTotalPrice((parseFloat(totalPrice) + parseFloat(item.price * quantity)).toFixed(2));
                }
            }
        })
    }

    const handelAddToCart = () =>{
        const payload = {}
    }

    return (
        <div className={style.frequntlyBoughtTogetherConatiner}>
            <div className={style.outer}>
                <div className={style.headingTxt} >Frequently Bought Together</div>
                <div className={style.imageSection} >{data.map((item, i) => {
                    return (
                        <>
                            <img src={item.image} alt="image" />
                            <div className={style.imagePlus} >{i !== (data.length - 1) ? "+" : ""}</div>
                        </>
                    )
                })}</div>
                <div className={style.detailSection} >{data.map((item, i) => {
                    let quantity = 1;
                    for (let key in idQunatity) {
                        if (key === item.id) {
                            quantity = idQunatity[key].noOfProduct
                        }
                    }
                    const isSelcted = slectedId && slectedId.length > 0 && slectedId.includes(item.id)
                    let checkUncheck = isSelcted ? rectangularCheck : rectangularUnCheck;
                    return (
                        <div className={style.checklist}>
                            <div className={style.imageHead} onClick={() => handelSelctedId(item.id, item.price)}>
                                <img src={checkUncheck} alt="" />
                                <div>{item.heding}</div>
                            </div>
                            <IncrimentBar isSelcted={isSelcted} handelIncriments={handelIncriments} id={item.id} price={item.price} totalPrice={totalPrice} setTotalPrice={setTotalPrice} noOfProduct={quantity} />
                        </div>
                    )
                })}</div>
                <div className={style.totalPrice} ><span className={style.txt}>Total price :</span><span className={style.price} >{totalPrice}</span></div>
                <div onClick={()=>handelAddToCart()} className={style.buttonAddToCart} ><span>Add to Cart</span></div>
            </div>
        </div>
    )
}

const IncrimentBar = ({ isSelcted = false, handelIncriments, noOfProduct = 1, totalPrice, setTotalPrice, price, id }) => {
    const handelOnclick = (action) => {
        if (action === "minus" && noOfProduct > 1 && isSelcted) {
            handelIncriments(noOfProduct - 1, id, price);
            setTotalPrice((parseFloat(totalPrice) - parseFloat(price)).toFixed(2))
        }
        if (action === "plus" && isSelcted) {
            setTotalPrice((parseFloat(totalPrice) + parseFloat(price)).toFixed(2));
            handelIncriments(noOfProduct + 1, id, price);
        }
    }

    return (
        <div className={style.incrimentBarContainer}>
            <div className={[style.plus, (noOfProduct === 0 ? style.lightMinus : "")].join(" ")} onClick={() => handelOnclick("minus")} > - </div>
            <div className={style.number} >{noOfProduct}</div>
            <div className={style.plus} onClick={() => handelOnclick("plus")} > + </div>
        </div>
    )
}
export default FrequntlyBoughtTogether