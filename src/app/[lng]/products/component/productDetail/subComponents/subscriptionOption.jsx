import React, {useState,useEffect} from 'react'
import DropDown from '@/components/DropDown/DropDown';
import "./SubscriptionOption.scss"


const howSubscriptionWorkEn = [
  "Subscribe today and never miss out on your health needs! ",
  "Choose the quantity & frequency of your blood test or supplement order and benefit from extra discounts.",
  "Don't worry, we'll send you a reminder 3 days prior to your next subscription payment so you always keep track.",
  "Cancel anytime by dropping an email on support@getkuwa.com. ",
  "We love having you take charge of your health & money.",
];
const HowItsWorkData = howSubscriptionWorkEn;

const HowSubcriptionWork = ({
  setIsHowSubcription,
  HowItsWorkData = {},
}) => {
  return (
    <div
      className="pop-up-subscription"
      onClick={() => setIsHowSubcription(false)}
    >
      <div className="how-subscription-work-content">
        <div className="how-subscription-work">
          <div className="content">
            <div className="hedding-txt">
              
              "How do subscriptions work? 
            </div>
            <div className="all-subscripition">
              <ul>
                {HowItsWorkData.map((item) => {
                  return <li>{item}</li>;
                })}
              </ul>
            </div>
          </div>
          <div className="close-Button">
            <div className="close">Close</div>
          </div>
        </div>
      </div>
    </div>
  );
};




const SubscriptionOption = ({pricingSectionVariables}) => {
console.log("santo",pricingSectionVariables)
const { currency = "", name = "", numberOfProductReview = "", title = "", variants = [], setselectedVarients ={}, selectedVarients = "", retailPrice = 0, finalPrice = 0, discount = 0, handelAddToCart={}, handelBuyNow ={}, handelShareOption = {}, setNoOfProduct = {}, noOfProduct = 0 , handelViewCart={}} = pricingSectionVariables;
  const [selectedOption, setIsSelectedOption] = useState("ONE-TIME");
  const [finalAmount, setFinalAmount] = useState(0);
  const [oneTimeAmount, setOneTimeAmount] = useState(0);
  const [subscriptionAmount, setSubscriptionAmount] = useState(0);
  // const [discount, setDiscount] = useState(0);
  const [selectedSubscriptionItems, setSelectedSubscriptionItems] = useState({});
  // const [showCart, setShowCart] = useState(false);
  const [qty, setQty] = useState(1);
  const [isHowSubcription, setIsHowSubcription] = useState(false);
  const [isEdPge, setIsEdPage] = useState(false);
  const [subscripitionTmp, setSubscriptionTmp] = useState(0)

  const [packageOption, setpackageOption] = useState("ONE-TIME");

  const onSelectSubscription = (data) => {
    const { value = 0, finalPrice = 0 } = data || {};
    setQty(1);
    monthDropDownTrack({ noOfMonths: value, pageName: window.location.href })
    setSelectedSubscriptionItems(getSubscriptionItemById(value)[0]);
  };
  const getSubscriptionItemById = (subscriptionId) => {
    return subscriptionData.filter((data, i) => data.id === subscriptionId);
  };
  const getMinSubscriptionItem = (subscriptionData) => {
    return subscriptionData.reduce(function (res, obj) {
      return obj.finalPrice < res.finalPrice ? obj : res;
    });
  };
  const onSelectOption = (option) => {
    console.log("dd sbhhsh")
    if (packageOption === "ONE-TIME") {
      // if (packageOption != option) {
      //   setpackageOption("SUBSCRIPTION");
      //   setQty(1);
      //   trackSubscriptionBtnClick({ pageName: window.location.pathname });
      // }

    }
    //  else if (packageOption === "SUBSCRIPTION") {
    //   const selectedSubscriptionItem = getMinSubscriptionItem(subscriptionData);
    //   const { finalPrice = 0 } = selectedSubscriptionItem || {};
    //   const getFinalAmount = finalPrice;

    //   if (packageOption != option) {
    //     setpackageOption("ONE-TIME");
    //     setQty(1);
    //     trackOneTimeClick({ pagename: window.location.pathname });
    //   }
    //   if (!selectedSubscriptionItem) {
    //     setFinalAmount(Math.round(getFinalAmount));
    //     setQty(1);
    //   }
    // }
    setIsSelectedOption(option);
  };
  const subscriptionData =  [
    {
        "id": 217,
        "discountAmount": 20.0,
        "discountType": "Fixed",
        "noOfMonths": 1,
        "rank": 1
    },
    {
        "id": 217,
        "discountAmount": 15.0,
        "discountType": "Percentage",
        "noOfMonths": 3,
        "rank": 1
    },
    {
        "id": 217,
        "discountAmount": 10.0,
        "discountType": "Fixed",
        "noOfMonths": 6,
        "rank": 1
    },
    {
        "id": 217,
        "discountAmount": 5.0,
        "discountType": "Percentage",
        "noOfMonths": 12,
        "rank": 1
    }
]
const getSubscriptionData = (items) => {
  let subscriptionItem = [];
  items.map((data, i) => {
    const monthsEn = data.noOfMonths == 1 ? " Month" : " Months";
    subscriptionItem.push({
      label: 
     
        "Every " + data.noOfMonths + monthsEn,
      value: data.id,
      noOfMonths: data.noOfMonths,
    });
  });
  return subscriptionItem;
};

  const isSelectedSubscription = selectedOption === "SUBSCRIPTION";
  const isSelectedOneTime = selectedOption === "ONE-TIME";


  return (
    <div className='price-container'>
      <div className='item-pricing-action-wrapper'>
      <div id="ItemPricingAction-2" className="item-pricing-btn-container">
        <div className={`one-time-outer-div ${"ONE-TIME" === packageOption ? "is-subscription-div" : "not-subsiption-div"}`} onClick={() => onSelectOption("ONE-TIME")} style={{ height: "48px" }}>

          <div id="onetime-incriment" className="onetime-incriment">
            <div id="name-check-container" className="name-check-container">
              <CheckBox id="one_time_checkBox" isChecked={isSelectedOneTime} />
              <div className='item-pricing-btn-one-time-text'>One-time purchase</div>
            </div>
          </div>
          <div id="price_div" className="price-div">
            <div className="retail-final">
              <div id="final_price" className="final-price"> {currency} {finalPrice}</div>
              
                {/* <div className="retail-price">SAR 400</div> */}

                
              
            </div>
          </div>
        </div>
       
    <div className={`one-time-outer-div margin-subscription ${"SUBSCRIPTION" === packageOption ? "is-subscription-div" : "not-subsiption-div"}`} onClick={() => onSelectOption("SUBSCRIPTION")}>
    <div id="subscribe_div" className="onetime-incriment">
    <div className="name-check-container">
    <CheckBox  id="subscribe_check" isChecked={isSelectedSubscription} />
    <div id="subscribe_txt" className="item-pricing-btn-one-time-text">Subscribe & Save 10%
    </div>
    
    </div>
    <div className="subscription-dropDownDiv">
    <DropDown
                          selectedValue={selectedSubscriptionItems.id || ""}
                          itemList={getSubscriptionData(
                            subscriptionData,
                          
                          )}
                          onSelect={onSelectSubscription}
                        />
    </div>
    </div>
    <div id="price_div" className="price-div">
            <div className="retail-final">
              <div id="final_price" className="final-price">{currency} 270</div>
                {/* <div className="retail-price"></div> */}

                
              
            </div>
          </div>
    </div>
    </div>
    <div id="subscription_work" className="how-subscriptoin-work">
    <span className="txt">How do subscriptions work?</span>
    <span  className="click-here"
    onClick={() => {setIsHowSubcription(true)}}
    >Learn More</span>
    </div>
    </div>
    {isHowSubcription && (
          <HowSubcriptionWork
            HowItsWorkData={HowItsWorkData}
            setIsHowSubcription={setIsHowSubcription}
          />
        )}
    </div>
  )
}

const CheckBox = ({ isChecked }) => {
  return (
    <div className="checkbox-container">
      <input type="checkbox" checked={isChecked} />
      <span className="checkmark"></span>
    </div>
  );
};

export default SubscriptionOption