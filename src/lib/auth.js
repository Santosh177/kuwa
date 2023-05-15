

export async function getUserDetails() {
    const userLoginResp  =  await fetch('http://localhost:3000/api/login', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + "didToken",
        }
      })



    
    console.log("userLoginResp",userLoginResp)
}