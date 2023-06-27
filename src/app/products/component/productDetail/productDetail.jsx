"use client"

import React, { useEffect, useState } from "react";
import ProductImageSection from "./subComponents/productImageSection";
import ProductPricingSection from "./subComponents/productPricingSection";
import { useRouter } from 'next/navigation';
import style from "./ProductDetail.module.scss"
import FrequntlyBoughtTogether from "./subComponents/frequntlyBoughtTogether";
const ProductDeatil = ({ productData = {} }) => {
    const { benefits = "", frequentlyBoughtTogether = "", currency = "", description = "", id = "", images = [], ingredients = "", name = "", numberOfProductReview = "", price = null, quantity = 0, title = "", variants = [] } = productData || {};
    const [noOfProduct, setNoOfProduct] = useState(1);
    const [selectedVarients, setselectedVarients] = useState("");
    const [selctedVrientsData, setSelectedVrientsData] = useState({});
    const [retailPrice, setRetailPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [allImages, setAllImages] = useState([]);
    const [haveAdress, setHaveAddress] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const { productPriceAmount = 0, productPriceType = "", productPriceSpecialAmount = 0 } = price || {};
        setFinalPrice(productPriceSpecialAmount);
        setRetailPrice(productPriceAmount);
        if (productPriceAmount > productPriceSpecialAmount) {
            setDiscount(productPriceAmount - productPriceSpecialAmount);
        }
        setAllImages(images)
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
            if (!allImages.includes(image)) {
                setAllImages([image, ...allImages]);
            }
        }
    }, [selectedVarients])
    const payload = {
        "product": id,
        "quantity": noOfProduct,
        "isVariant": selectedVarients ? true : false,
        "variantId": selectedVarients
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
        getAddress()
    }, [])
    const handelAddToCart = async () => {
        const response = await addToCart(payload);
        if (response === 200) {
            setNoOfProduct(1);
            router.push('/cart')
        }
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
        noOfProduct: noOfProduct
    };
    const handelRoute = (type) => {
        if (type === "home") {
            router.push('/')
        } else if (type === "cat") {

        }else if (type === "product") {

        }
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
                <ProductPricingSection pricingSectionVariables={pricingSectionVariables} />
            </div>
            {frequentlyBoughtTogether && <div className={style.FrequntlyBoughtTogetherBox}>
                <FrequntlyBoughtTogether currency={currency} productData={frequentlyBoughtTogether} />
            </div>}
        </div>
    )
}

export default ProductDeatil