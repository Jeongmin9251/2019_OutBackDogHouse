const weather = document.querySelector(".temp");

const API_KEY = "feab79710cf43c5946579544cfa2cbc6"; // 위에서 복사한 API key (뒤에 세자리 가림***) 
const COORDS = "coords";  // localStoraged에 저장할 키 이름

// 날씨 api사용 함수
function getWeather(lat,lng)
{               
    // 위도 경도 넘겨받음
    // then은 api가 정보를 다 가져올때까지 기다리겠다는 함수
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response)
    {
        // json 데이터 가져오기
        return response.json();                
    }).then(function(json)
    { 
        // then을 한번 더 사용해 json데이터 가져올 때까지 기다림    
        // 온도
        const temperature = json.main.temp; 
        // 도시 이름   
        //const place = json.name;                
        //weather(".js-weather"인 html위치)에 온도 
        weather.innerHTML = `${temperature}`
        //@ ${place}  @ 도시 출력
    });
}

// localStorage에 저장하는 메소드
function saveCoords(coordsObj)
{
    // localStorage에 저장하려면 string이어야하므로 바꿔서 저장
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));  
}   

// 위치정보 성공적으로 읽올 시 실행 - 읽은 정보에서 좌표값 가져옴
function handleGeoSuccess(position)
{ 
    // 위도           
    const latitude = position.coords.latitude;    
    // 경도
    const longitude = position.coords.longitude; 
    // 객체에 저장 
    const coordsObj = {
        // 객체의 변수 이름과 객체의 key이름이 같다면 이렇게 생략가능         
        latitude,                 
        longitude
    }
     // localStorage에 저장하는 함수 호출
    //saveCoords(coordsObj);     

    // 날씨 api사용 함수 호출
    getWeather(latitude, longitude);    
}

// 위치정보 에러 시 실행 할 메소드
function handleGeoError()
{
    console.log("Can't access geo location");
}


// 좌표 요청 함수
function askForCoords()
{
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);   // 위치 정보 읽음
}

// 위치정보 로드 함  
function loadedCoords()
{
    // 일단 저장된 coords 가져옴 
    //const loadedCoords = localStorage.getItem(COORDS);

    // 저장된 값 없으면 위치정보 읽는 메소드 실행
    //if(loadedCoords === null)
    //{  
        askForCoords(); 
    //}
    //else
    //{
        // 있다면 가져와서 object로 파싱
        //const parsedCoords = JSON.parse(loadedCoords);  
        // 파싱된 object를 날씨api메소드로 넘겨줌
        //getWeather(parsedCoords.latitude,parsedCoords.longitude); 
   // }
}

function init(){
    // 위치정보 로드
    loadedCoords();   
}

init();
NowDay();

//현재 날짜 가져오기
function NowDay()
{
	let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth()+1; //January is 0!

	if(dd<10) {
		dd='0'+dd
	} 
	if(mm<10) {
		mm='0'+mm
	} 
	
	today = mm+' 월 '+ dd + ' 일 ';
	console.log(today);
	document.querySelector(".nowday").innerHTML = today;
}