
function get_weather(){

document.getElementById('answer_hide').style.visibility="hidden";
document.getElementsByClassName('invalid_box')[0].style.display="none";
    
const city=document.getElementById('city').value;



if((city == "") || (!/^[a-zA-Z]+$/.test(city))){
    document.getElementsByClassName('invalid_box')[0].style.display="block";
    document.getElementById('city_wrong').innerHTML="Please Enter Valid City Name !!";
}

else
{
const key="185caae60099e86958b86efa464757d7";
const unit="metric";
const current_weather_url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${unit}`


async function check_weather() {
    const response= await fetch(current_weather_url);
    var data=await response.json();
    console.log(data);

    
    if(data.cod=='404')
        {
         
        document.getElementsByClassName('invalid_box')[0].style.display="block";
        document.getElementById('city_wrong').innerHTML="City Name not found !!";
        
    }
    else
    {
        document.getElementsByClassName('invalid_box')[0].style.display="none";
        document.getElementById('answer_hide').style.visibility="visible";

        document.getElementById('name_of_city').innerHTML=data.name;
        document.getElementById('city_temp').innerHTML=`${data.main.temp}   °C`;

        let date=data.sys.sunrise;
        function data_conversion(){
            let dateObj = new Date(date * 1000);
            let fulldate= dateObj.toLocaleDateString();
            let day=dateObj.toLocaleString('en-US', {weekday:'long'});
            return {fulldate, day};
        }
        let sunrise_date= data_conversion();
        document.getElementById('country').innerHTML=data.sys.country;
        document.getElementById('date').innerHTML=sunrise_date.fulldate;
        document.getElementById('day').innerHTML=sunrise_date.day;
        
    }
        document.getElementById('city_climate').innerHTML=data.weather[0].main;
        document.getElementById('wind_speed').innerHTML=`Wind Speed: ${data.wind.speed} km\hr`;
    
    
}
check_weather();


}
document.getElementById('city').value="";
}


