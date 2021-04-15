
/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey =  '&APPID=af553c8fab27813100876dd482e76c94&units=metric';


const feelings =document.getElementById('feelings');
const btn = document.getElementById('generate');
const zip = document.getElementById('zip');


const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();



//client side code


btn.addEventListener('click',handleGenerateBtnClick);
function handleGenerateBtnClick () {
  const content = feelings.value;
  const zipCode =zip.value;
  if (!zip.value) {alert('please, enter a zip code');}
  else {
    getData(baseURL , zipCode , apiKey)
    .then(function(data){
        console.log(data)
        postData('/addData' , {temp : data.main.temp , date:newDate , content : content});

    })
    .then(()=>{

      updateUI();
    })
  }
}


const getData = async(baseURL, zipCode, apiKey) => {
  const req = await fetch (baseURL + zipCode + apiKey);
  try {
       const data = await req.json()
       return data;
}
  catch (error) {
       console.log('error', error);
  }
}




const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    try {
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.log("error", error);
    }
};




//updateUI
const updateUI = async () => {
  const request = await fetch('/allData');
  try{
    const allData = await request.json();
    temp.innerHTML = `Temp: ${allData.temp} celsius`;
    date.innerHTML = `Date: ${allData.date}`;
    content.innerHTML = `Feelings: ${allData.content}`;


    feelings.value = '';
    zip.value = '';
  }
  catch(error){
    console.log("error", error);
  }
};
