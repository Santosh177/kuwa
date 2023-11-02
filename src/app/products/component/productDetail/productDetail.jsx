"use client"

import React, { useEffect, useState } from "react";
import ProductImageSection from "./subComponents/productImageSection";
import ProductPricingSection from "./subComponents/productPricingSection";
import { useRouter } from 'next/navigation';
import {getCartItem} from '@/services';
import style from "./ProductDetail.module.scss"
import FrequntlyBoughtTogether from "./subComponents/frequntlyBoughtTogether";
import Loader from '@/components/Loader/Loader';
import { useCartItems } from '@/context/cartItems';
import { addCleverTapCountryEvents, addedToCartweb } from "@/analytics";
import { useCountry } from "@/context/contryDetails";
const ProductDeatil = ({ productData = {} }) => {
    const { benefits = "", frequentlyBoughtTogether = "", currency = "", description = "", id = "", images = [], ingredients = "", name = "", numberOfProductReview = "", price = null, quantity = 0, title = "", variants = [] } = productData || {};
    const [noOfProduct, setNoOfProduct] = useState(1);
    const { setCartItemData={},setCartItemCount={} } = useCartItems();
    const [selectedVarients, setselectedVarients] = useState("");
    const [selctedVrientsData, setSelectedVrientsData] = useState({});
    const [retailPrice, setRetailPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [allImages, setAllImages] = useState([]);
    const [haveAdress, setHaveAddress] = useState(false);
    const [ isAddedToCart , setIsAddedToCart ] = useState(false);
    const [ isLoading , setIsLoading] = useState(false)
    const router = useRouter()
    const { selectedCountry = {} } = useCountry();
    const countryName = selectedCountry && selectedCountry.name || ""
    useEffect(()=>{

        if(variants && variants.length > 0){
            const variantId = variants[0] && variants[0]['variants'] && variants[0]['variants']['id'];
            console.log("variantIdvariantId",variantId)
            if(variantId){
                setselectedVarients(variantId)
            }
        }
    },[variants])

    useEffect(() => {
        setIsLoading(true)
        const { productPriceAmount = 0, productPriceType = "", productPriceSpecialAmount = 0 } = price || {};
        setFinalPrice(productPriceSpecialAmount);
        setRetailPrice(productPriceAmount);
        if (productPriceAmount > productPriceSpecialAmount) {
            setDiscount(productPriceAmount - productPriceSpecialAmount);
        }
        let bulkImage = [];
        images.map((data)=> bulkImage.push(data.imageUrl))
        setAllImages(bulkImage)
    }, [])
    useEffect(() => {
        if (selectedVarients) {
            const selectedVarientsData = variants.filter((item) => item?.pricings[0]?.variantId === selectedVarients);
            const { id = '', image = '', name = '', productId = '', quantity = '' } = selectedVarientsData[0].variants || {}
            const { varientId = '', retailPrice = 0, finalPrice = 0, discount = 0 } = selectedVarientsData[0]?.pricings[0] || {};
            setSelectedVrientsData(selectedVarientsData)
            setFinalPrice(finalPrice);
            setRetailPrice(retailPrice);
            setDiscount(discount);
            // if (!allImages.includes(image)) {
                setAllImages([image]);
            // }
        }else{
            const { productPriceAmount = 0, productPriceType = "", productPriceSpecialAmount = 0 } = price || {};
            setFinalPrice(productPriceSpecialAmount);
            setRetailPrice(productPriceAmount);
            if (productPriceAmount > productPriceSpecialAmount) {
                setDiscount(productPriceAmount - productPriceSpecialAmount);
            }
            let bulkImage = [];
            images.map((data)=> bulkImage.push(data.imageUrl))
            setAllImages(bulkImage)
        }
    }, [selectedVarients])
    const payload = {
        "product": id,
        "quantity": noOfProduct,
        "isVariant": selectedVarients ? true : false,
        "variantId": selectedVarients
    }
   const trackData = {
        "product Name": name,
        "quantity": noOfProduct,
        "product Id": id,
        "isVariant": selectedVarients ? true : false,
        "variantId": selectedVarients,
        "Page Name": window.location.pathname,
        "country": selectedCountry.name,
        "countryId": selectedCountry.id,
        "currency": selectedCountry.currency
    }
    
    const addToCart = async (payload) => {
        try {
            const res = await fetch('/api/add-to-cart', {
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
    const getAddress = async () => {
        const getAddressResp = await fetch('/api/get-address', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const addressData = await getAddressResp.json();
        const haveAddress = addressData && addressData['shippingAddress'] && addressData['shippingAddress'].length > 0;
        if (haveAddress) {
            setHaveAddress(haveAddress);
        }
    }
    useEffect(() => {
        getAddress();
        getCartItems();
    }, [])

    useEffect(()=>{
        console.log("noOfProductnoOfProduct",noOfProduct)
        // setIsAddedToCart(false)
    },[noOfProduct])
    const handelAddToCart = async () => {
        setIsLoading(true)
        const response = await addToCart(payload);
        if (response === 200) {
            // setNoOfProduct(1);
           const data = await getCartItems();
            addedToCartweb(trackData)
           
            // router.push('/cart')
            // window.location.href = "/cart"
        }
    }


    const getCartItems = async() => {
  
        const getCartItems = await getCartItem();
        setIsLoading(false)
        const cartItemsData = getCartItems && getCartItems['products'] || [];
        setCartItemData(getCartItems)
        let cartItems = cartItemsData.find((data) => data.id == id)
        setIsLoading(false)

        console.log("cartItems",cartItems)
        if(cartItems){
            setNoOfProduct(cartItems && cartItems.quantity);
            setIsAddedToCart(cartItems)
            if(cartItems && cartItems['variants'] && cartItems['variants']['variants']){
                const variantId = cartItems && cartItems['variants'] && cartItems['variants']['variants']['id'];
                setselectedVarients(variantId)

            }
            // return ({isItemAddedToCart: cartItems.length>0 , data:cartItems[0]})
        }else{
            
        }
    }

    const onChangeItemQty = () => {
        setIsAddedToCart(false)
    }

    const onChangePackOf = () =>{
        setIsAddedToCart(false)
        setNoOfProduct(1)
    }

    const handelViewCart = () => {
        window.location.href = "/cart";
    }
    const handelBuyNow = async () => {
        const response = await addToCart(payload)
        if (response === 200) {
            setNoOfProduct(1);
            if (haveAdress) {
                router.push('/order-summary')
            } else {
                router.push('/address/add-address');
            }
            addedToCartweb(trackData)
        }
    }
    const handelShareOption = (action) => {
        const redirectLocation = window.location.href
        if (action === "WhatsApp") {

        }
        if (action === "FaceBook") {

        }
    }
    const pricingSectionVariables = {
        currency: currency,
        name: name,
        numberOfProductReview: numberOfProductReview,
        title: title,
        variants: variants,
        setselectedVarients: setselectedVarients,
        selectedVarients: selectedVarients,
        retailPrice: retailPrice,
        finalPrice: finalPrice,
        discount: discount,
        handelAddToCart: handelAddToCart,
        handelBuyNow: handelBuyNow,
        handelShareOption: handelShareOption,
        setNoOfProduct: setNoOfProduct,
        handelViewCart: handelViewCart,
        noOfProduct: noOfProduct
    };
    const handelRoute = (type) => {
        if (type === "home") {
            router.push('/')
        } else if (type === "cat") {

        }else if (type === "product") {

        }
    }
    try{
        const tabbyMinLimit = 10;
        const tabbyMaxLimit = 2000;
        const isShowTabby = (finalPrice > tabbyMinLimit) && (finalPrice < tabbyMaxLimit)
        if(isShowTabby){
            new TabbyPromo({
                selector: '#tabbyDetail', // required, content of tabby Promo Snippet will be placed in element with that selector.
                currency: currency, // 'SAR, AED, KWD, BHD'
                price: finalPrice, // required, price or the product. 2 decimals max for AED|SAR|QAR and 3 decimals max for KWD|BHD.
                lang: 'en', // 'ar'
                source: 'product', // Optional, snippet placement; `product` for product page and `cart` for cart page.
              // required, store Public Key which identifies your account when communicating with tabby.
              });
        }
       
    }catch(error){
       console.log("Error occurs while fetching tabby",error)
    }
    console.log(productData,"productDataproductData")
    return (
        <div className={style.productPricingContainerOuter}>
            <div className={style.routeSection}>
                <span onClick={() => handelRoute("home")}>Home</span> / 
                {/* <span onClick={() => handelRoute("cat")} ></span> / */}
                <span onClick={() => handelRoute("product")}> {name}</span>
            </div>
            <div className={style.productPricingContainer}>
                <ProductImageSection allImages={allImages} />
                <ProductPricingSection pricingSectionVariables={pricingSectionVariables} isAddedToCart={isAddedToCart} onChangeItemQty={onChangeItemQty} onResetViewCartState= {onChangePackOf} />
            </div>
            {frequentlyBoughtTogether && <div className={style.FrequntlyBoughtTogetherBox}>
                <FrequntlyBoughtTogether currency={currency} productData={frequentlyBoughtTogether} />
            </div>}
            <Loader isShow={isLoading} />
        </div>
    )
}

export default ProductDeatil