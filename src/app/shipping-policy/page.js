import PageHeader from "@/components/PageHeader/PageHeader"

const shippingPolicy = `
Kuwa Supplements ships its products to almost all parts of the Dubai, UAE. Orders placed will be shipped within 2-3 fo days owned stock. Shipping time may increase for third party shipments. We ship on all days except Saturday/Sunday and National Holidays.
<br></br>
<b>Estimated Delivery Time:</b>
<br></br>
The delivery will take place within 48hrs according to the delivery location after order dispatch.
<br></br>
The delivery date displayed while placing the order i.e. on the Product Details, Cart, Checkout and Order Confirmation page and in the order confirmation email are tentative. It may change once the order is shipped. Post shipment of the order, an Estimated Delivery Date will be displayed in the ‘Order Details’ under ‘My Account ‘ section which will help you to keep a track of the shipment status of your order.
<br></br>
Kuwa Supplements ensures to provide a delightful customer experience by delivering the products as per the Estimated Delivery Date communicated as above, however, at times there might be unexpected delays in the delivery of your order due to unavoidable and undetermined logistics challenges beyond our control for which Kuwa Supplements is not liable and would request its users to cooperate as Kuwa Supplements continuously tries to nought such instances. Also, Kuwa Supplements reserves the right to cancel your order at its sole discretion in cases where it takes longer than usual delivery time or the shipment is physically untraceable and refund the amount paid for canceled product(s) in your Kuwa Supplements wallet.
<br></br>
<b>Address Change: </b>
<br></br>
You can change the delivery address of your order only if the order is in Confirmed or Pending status and none of the item(s) purchased in the order are shipped. However, if there are any variations in the charges/taxes (if any) applied for the original delivery address used while placing the order v/s the delivery address to be updated, the request for updating the delivery address might not be accepted.
<br></br>
<b>Tracking Packages:</b>
<br></br>
We will mail you the name of the courier company and the tracking number of your consignment in your registered email address. In case you do not receive a mail from us within 24hrs of placing an order please check your spam folder. Tracking may not appear online for up to another 24 hours in some cases, so please wait until your package is scanned by the courier company.
<br></br>
<b>Non-availability on Delivery:</b>
<br></br>
Our delivery partners will attempt to deliver the package 5 times before it is returned back to our warehouse. Please provide your mobile number in the delivery address as it will help in making a faster delivery.
<br></br>
<b>ID requirement upon delivery:</b>
<br></br>
We, or our shipping partners, may at our sole discretion require you to provide evidence of your identity (by for example asking you to see your Emirates ID) or your chosen method of payment, at the time of delivery or at any other time.If we are unable to verify or authenticate any information you provide, we have the right to refuse delivery and cancel the order.
<br></br>
`



export default function ShippingPolicy() {

    return (
        <div>
            <PageHeader headerName="Terms Of Service" />
            <div style={{padding:"16px",margin:'auto',marginTop:"30px",fontSize:"12px",fontWeight:400}} dangerouslySetInnerHTML={{ __html: shippingPolicy }}></div>
        </div>
    )
}