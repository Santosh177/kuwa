"use client"

import React, { useEffect, useState } from "react";
import ProductImageSection from "./subComponents/productImageSection";
import ProductPricingSection from "./subComponents/productPricingSection";
import { useRouter } from 'next/navigation';
import style from "./ProductDetail.module.scss"
const ProductDeatil = ({ productData = {} }) => {
    console.log(productData,"productDataproductDataproductData")
    const { benefits = "", currency = "", description = "", id = "", images = [], ingredients = "", name = "", numberOfProductReview = "", price = null, quantity = 0, title = "", variants = [] } = productData || {}
    const [noOfProduct, setNoOfProduct] = useState(1);
    const [selectedVarients, setselectedVarients] = useState("");
    const [selctedVrientsData, setSelectedVrientsData] = useState({});
    const [retailPrice, setRetailPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [allImages, setAllImages] = useState([])
    const router = useRouter()

    useEffect(() => {
        const { retailPrice = 0, finalPrice = 0, discount = 0 } = price || {};
        setFinalPrice(finalPrice);
        setRetailPrice(retailPrice);
        setDiscount(discount);
        setAllImages(images)
    }, [])
    useEffect(() => {
        if (selectedVarients) {
            const selectedVarientsData = variants.filter((item) => item?.price?.varientId === selectedVarients);
            const { id, quantity, price = {}, image = "" } = selectedVarientsData || {};
            const { varientId = '', retailPrice = 0, finalPrice = 0, discount = 0 } = price || {};
            setSelectedVrientsData(selectedVarientsData)
            setFinalPrice(finalPrice);
            setRetailPrice(retailPrice);
            setDiscount(discount);
            setAllImages([image, ...allImages]);
        }
    }, [selectedVarients])
    const payload = {
        "product": id,
        "quantity": noOfProduct,
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
    const handelAddToCart = async () => {
        const response = await addToCart(payload);
        console.log(response, "responseresponse")
        if (response === 200) {
            setNoOfProduct(1);
            router.push('/cart')
        }
    }
    const handelBuyNow = async () => {
        const response = await addToCart(payload)
        console.log(response, "responseresponse")
        if (response === 200) {
            setNoOfProduct(1);
            router.push('/order-summary')
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

    return (
        <>
            <div className={style.productPricingContainer}>
                <ProductImageSection allImages={allImages} />
                <ProductPricingSection pricingSectionVariables={pricingSectionVariables} />
            </div>
        </>
    )
}

export default ProductDeatil