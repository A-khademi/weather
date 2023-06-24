const box = document.querySelector(".box");
const h1 = document.querySelector(".h1.d-flex");
const icon = document.querySelector("img");
const inp = document.querySelector("input");
const loder = document.querySelector(".lds-ripple.d-flex");

const img = [
  "./Pictures/neda-astani-KWTkd7mHqKE-unsplash.jpg",
  "./Pictures/noaa-kcvlb727mn8-unsplash.jpg",
  "./Pictures/osman-rana-HOtPD7Z_74s-unsplash.jpg",
  "./Pictures/pexels-andre-furtado-1162251.jpg",
  "./Pictures/pexels-egor-kamelev-813872.jpg",
  "./Pictures/pexels-gabriela-palai-395196.jpg",
  "./Pictures/pexels-genaro-servín-763398.jpg",
  "./Pictures/pexels-pixabay-76969.jpg",
];
let index = 0;
setInterval(() => {
  box.style.backgroundImage = "url('" + img[index] + "')";
  index = (index + 1) % img.length;
}, 10000);

inp.addEventListener("keyup", myfunc);
function myfunc(e) {
  if (e.keyCode === 13) {
    loder.style = "display:block";
    h1.innerHTML='<div class="lds-ripple d-flex"><div></div><div></div></div>'
    let val = inp.value;
    inp.value = "";
    console.log(val);
    fetch(`https://api.weatherapi.com/v1/current.json?key=fc80bd11766e45f3b6b93347231406&q=${val}&aqi=no`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        loder.style = "display:none";
        h1.style = "opacity:1";
        h1.style = "width: 100%";
        h1.innerHTML = `<div class="box-data">
                        <h2 style="color:crimson; style="margin-bottom: 15px;"">${data.location.name}</h2>
                        <img src="${data.current.condition.icon}" alt="" style="display:block;">  
                        <h3 style="margin-bottom: 15px;">Country : ${data.location.country}</h3>
                        <h3 style="margin-bottom: 15px;">Weather :  ${data.current.condition.text}</h3>
                        <div class="time"  style="margin-bottom: 15px;">
                            <span style="padding-right: 40px;">Localtime: ${data.location.localtime}</span>
                            <span>UV: ${data.current.uv}</span>
                        </div>
                        <div class="border-image-clip-path">
                            <div class="c"  style="margin-bottom: 15px;">
                                <span style="padding-right: 20px;">Temp_c  :  ${data.current.temp_c}</span>
                                <span style="padding-right: 20px;">Feelslike_c : ${data.current.feelslike_c}</span>
                                <span>wind_kph: ${data.current.wind_kph}</span>
                            </div>
                            <div class="f" style="margin-bottom: 15px;">
                                <span style="padding-right: 20px;">Temp_f  :  ${data.current.temp_f} </span>
                                <span style="padding-right: 20px;">Feelslike_f : ${data.current.feelslike_f}</span>
                                <span>wind_mph : ${data.current.wind_mph}</span>
                            </div>
                        </div>
                </div>`;
        console.log(data);
      })
      .catch((error) => {
        loder.style = "display:none";
        h1.style = "opacity:1";
        h1.innerText=`No information received, please enter the city name again.`
        console.log(error);
      });
  }
}
