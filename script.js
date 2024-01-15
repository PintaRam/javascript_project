const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select"); 
const msg  = document.querySelector(".msg");




for(let select of dropdowns)
{
    for(currcode in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        
        if(select.name === "from" && currcode === "USD")
        {
            newOption.selected = "selected";
        }
        if(select.name === "to" && currcode === "INR")
        {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change" ,(evt)=>
    { 
        updateFlag(evt.target);  
    });
}





const updateExchange = async () =>
{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1 )
    {
        amtVal = 1;
        amount.value = "1";
    }


    const URL  = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`

    let response = await fetch(URL);
    let data  = await response.json();
    // console.log(data)
    // console.log(toCurr.value)
    let rate  = data[toCurr.value.toLowerCase()];
    //console.log(rate)
    let finalAmt  =amtVal*rate;

    msg.innerText = `${amtVal} ${fromCurr.value} =  ${finalAmt} ${toCurr.value}`;
};

updateFlag=(element)=>
{   //console.log(element)
    let currcode = element.value;
    //console.log(currcode)
    let coutryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${coutryCode}/flat/64.png`;
    let img  = element.parentElement.querySelector("img");
    img.src = newSrc;
}


btn.addEventListener("click" , (evt)=>
{
    evt.preventDefault();  //prevent form loading the form 
    updateExchange();
    
});
window.addEventListener("load", ()=>
{
    updateExchange();
});