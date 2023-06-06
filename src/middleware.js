import { NextResponse } from "next/server";

const getUser = async (data) => {

    try {
      const userLoginResp  =  await fetch(`https://api.kuwa.bevaleo.dev/api/v1/customer/${data.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token,
        }
      })
      const userData = await userLoginResp.json();
      if(data && data.token){
        return {isLogin:true, userData:userData};
      }else{
        return {isLogin:false, userData:userData};
      }
     } catch (err) {
      return {isLogin:false,userData:null}
     }

};


const getCountryList = async() => {
  const getCountryListResp  =  await fetch('https://api.kuwa.bevaleo.dev/api/v1/country/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const countryListData = await getCountryListResp.json();
  if(countryListData && countryListData.length > 0){
      return countryListData;
  }
}



export async function middleware(req) {
  let token = req.cookies.get("token");
  let userId = req.cookies.get("userId");
  let countryId = req.cookies.get("countryId");
  let userData = {};
  let countryList = {};
  const response  = NextResponse.next()
  if((token && token.value && userId && userId.value) && (!countryId || !countryId.value)){
    userData = await getUser({token:token.value , userId:userId.value});
    countryList = await getCountryList();
    if(userData && userData.isLogin){
      const filteredCountry = countryList.find((data,index)=>data.id == userData.userData.country)
      const selectedCountryData = filteredCountry;
      response.cookies.set("countryId",selectedCountryData.id);
    }
  }

  return response;
}