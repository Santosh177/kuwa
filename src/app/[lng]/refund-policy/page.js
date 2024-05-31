import PageHeader from "@/app/[lng]/components/PageHeader/PageHeader";

const refundPolicy = `
<b>RETURNS, CANCELLING AN ORDER, AND EXCHANGE</b>
<br></br>
We do accept returns for products purchased from Kuwa Supplements website. Of course, we always stand behind the quality of everything we sell online.

Therefore, if there is an issue with quality or manufacturer defect, we will make it right.
<br>
If a product you have purchased on getkuwa.com isn't your solution, you can return it within 7 days from the time of your product delivery. Products to be returned must be in their original packaging along with the original price tags, labels, and invoices. 
<br></br>
Please note that the conditions for requesting return/refund depend on the type of product. 
<br>
All returns need pre-authorization, please Whatsapp us at +971585448626, or notify us through email: <a href="mailto:support@getkuwa.com" style="color: blue;">support@getkuwa.com</a>.
<br></br>
<b>NON-RETURNABLE PRODUCTS</b>
<br>No return, replacement, or exchange products in respect of:
<br>
- Products that have been used or damaged by you or are not in the same condition as you received them.
<br>
- Products with tampered or missing serial numbers; or
<br>- Items on sale.
<br>- Items that are not in the original condition and packaging.
<br>- Items that were sealed and required their hygienic level to be intact from the manufacturer.
<br>- Orders shipped to international destinations [Outside the UAE].
<br>- Temperature-sensitive products such as: Medicines, Vitamins, and Supplements.

<br>Please note that requests that do not meet Kuwa Supplements Return and Refund Policy are not eligible for return/refund.
<br><br>
<b>REFUND PROCEDURE</b>
<br>Your refund will be initiated once your product is received back in our fulfillment center and inspected by our team. We will issue a refund as store credits (within 3 days after the inspection and approval by our team) or to your credit/debit card (within 7 days after the inspection and approval by our team). 
<br><br>
<b>HOW TO CANCEL AN ORDER</b>
<br>Please note that most orders process quickly and can enter the shipping process within 24 hours. If your order has already entered the shipping process, it cannot be changed or canceled. If you would like to cancel an order you recently placed and we are unable to do so, simply refuse the shipment when it arrives, and we will credit you when the shipment is returned to our warehouse by the carrier. To change or cancel your order prior to shipment, you must contact us through support@getkuwa.com or Whatsapp our customer care at +971585448626.

Occasionally, orders or parts of an order are canceled by our system for various reasons such as:

<br>- Item(s) not available
<br>- Difficulty in processing your payment information
<br>- Cannot ship to the address provided
<br>- Duplicate order was placed
<br>- Canceled due to the customer's request
<br>- Damaged or faulty items
<br>- Incomplete shipping details provided (address/mobile number)
<br><br>
<b>EXCHANGES (IF APPLICABLE)</b>
<br>We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at support@getkuwa.com, and if we have approved such an exchange, you will be responsible to send your item to:

(Kuwa Supplements) Valeo Wellbeing Technologies DMCC
1JLT-Nook-178 One JLT Plot No: DMCC-EZ1- 1AB, Jumeirah Lakes Towers, Dubai, UAE

You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund. 

Depending on where you live, the time it may take for your exchanged product to reach you may vary. 

If you are shipping an item over AED 100, you should consider using a trackable shipping service or purchasing shipping insurance. We don't guarantee that we will receive your returned item.
<br><br>
<b>Need help?</b>
<br>Contact us at <a href="mailto:support@getkuwa.com" style="color: blue;">support@getkuwa.com</a> for questions related to refunds and returns.
`;

export default function RefundPolicy() {
    return (
        <div>
            <PageHeader headerName="Refund Policy" />
            <div style={{padding: "16px", margin: 'auto', marginTop: "30px", fontSize: "12px", fontWeight: 400,maxWidth:"1070px"}} dangerouslySetInnerHTML={{ __html: refundPolicy }}></div>
        </div>
    );
}
