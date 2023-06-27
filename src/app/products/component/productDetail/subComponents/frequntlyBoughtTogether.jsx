"use client"
import react, { useEffect, useState } from "react";
import style from "./FrequntlyBoughtTogether.module.scss"
import { useRouter } from 'next/navigation';
const rectangularUnCheck = "https://d25uasl7utydze.cloudfront.net/kuwa/Group%2041782%20(1).svg"
const rectangularCheck = "https://d25uasl7utydze.cloudfront.net/kuwa/RectangularSelcted.svg";

const FrequntlyBoughtTogether = ({ productData = {},currency="" }) => {
    const [slectedId, setSelectedId] = useState([]);
    const [idQunatity, setIdQunatity] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [data,setData] = useState([]);
    const router = useRouter();
    useEffect(()=>{
        let suggestedSupplemnts= []
        if(productData && productData.length > 0 ){
            productData.map((item)=>{
                const {id="",image="",name="",price="",seoUrl="",title=""} = item || {};
                const {discount="",finalPrice="",retailPrice=""} = price || {};
                const finalItem = {id:id,heding:name,price:finalPrice,image:image};
                suggestedSupplemnts.push(finalItem);
            })
        }
        setData(suggestedSupplemnts);
    },[])
    const { } = productData || {};

    const handelIncriments = (noOfProduct, id, price,) => {
        let idQunatitytemp = idQunatity;
        idQunatitytemp[id] = {noOfProduct: noOfProduct, price: price };
        setIdQunatity(idQunatitytemp);
    }
    const handelSelctedId = (id, price) => {
        let quantity = 1;
        for (let key in idQunatity) {
            if (key == id) {
                quantity = idQunatity[key].noOfProduct
            }
        }
        let isSelcted = false;
        if(slectedId && slectedId.length > 0){
            for (let i in slectedId){
                if(slectedId[i].id === id){
                    isSelcted = slectedId[i].id === id;
                    break;
                }
            }
        }
        if (slectedId && slectedId.length > 0 && isSelcted) {
            const filteredData = slectedId.filter((item) => item.id !== id);
            let finalfiltred = [];
            filteredData.map((item)=>{
                const {id=""} =item || {}
                finalfiltred.push({id:id,quantity:quantity})
            })
            setPrice(id, "sub", quantity);
            setSelectedId(finalfiltred);
            handelIncriments(1, id, price,quantity);
        } else {
            setPrice(id, "add", quantity);
            setSelectedId([{id:id,quantity:quantity}, ...slectedId])
        }
    }
    const firstTimeCall = ()=>{
        if(data && data.length > 0 ){
            let selectedId =[];
            let totalPrice = 0
            data.map((item)=>{
                selectedId.push({id: item.id, quantity : 1});
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
        data && data.length>0 && data.map((item) => {
            if (id === item.id) {
                if (operation === "sub") {
                    setTotalPrice((parseFloat(totalPrice) - parseFloat(item.price * quantity)).toFixed(2));
                } else if (operation === "add") {
                    setTotalPrice((parseFloat(totalPrice) + parseFloat(item.price * quantity)).toFixed(2));
                }
            }
        })
    }
    const getqunatity = (idQunatity,id)=>{
        let value ="";
        for (let key in idQunatity){
            if(key == id){
                value = idQunatity[key].noOfProduct;
            }
        }
        return value;
    }
    const addToCartAPI = async (payload) => {
        try {
            const res = await fetch('/api/add-to-cart-multi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            if (res.status === 200) {
                return res.status
            } else {
                throw new Error(await res.text())
            }
        } catch (error) {
            console.error('An unexpected error happened occurred:', error)
            setErrorMsg(error.message)
        }
    }
    // const getAddress = async () => {
    //     const getAddressResp = await fetch('/api/get-address', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     const addressData = await getAddressResp.json();
    //     const haveAddress = addressData && addressData['shippingAddress'] && addressData['shippingAddress'].length > 0;
    //     if (haveAddress) {
    //         setHaveAddress(haveAddress);
    //     }
    // }
    // useEffect(()=>{
    //     getAddress()
    // })

    const addToCart = async() =>{
        const payload =[];
        if(totalPrice > 0){
            slectedId.map((item)=>{
                const qutanity = getqunatity(idQunatity,item.id);
                if(qutanity && qutanity>1){
                    payload.push({id : item.id,quantity:qutanity})
                }else{
                    payload.push(item)
                }
            })
            const response = await addToCartAPI(payload);
            if(response){
                router.push('/cart')
            }
            console.log(response,"response")
        }
    }
    if(data && data.length>0){
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
                            if (key == item.id) {
                                quantity = idQunatity[key].noOfProduct;
                                
                            }
                        }
                        let isSelcted = false;
                        for (let i in slectedId){
                            const {id=""} = slectedId[i];
                            if(id === item.id){
                                isSelcted = id === item.id;
                                break;
                            }
                        }
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
                    <div className={style.totalPrice} ><span className={style.txt}>Total price :</span><span className={style.price} >{currency + " "+totalPrice}</span></div>
                    <div onClick={()=>addToCart()} className={[style.buttonAddToCart, (totalPrice == 0.00 ? style.opacityLow : "")].join(" ")} ><span>Add to Cart</span></div>
                </div>
            </div>
        )
    }else{
        return <></>
    }
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