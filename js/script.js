

window.onscroll = function() {
    var upBtn = document.getElementById("upButton");
    if (window.pageYOffset > 100){
        upBtn.classList.remove("hideBtn");
    }else {
        upBtn.classList.add("hideBtn");
    }
}
$('.slct').click(function(){
	/* Заносим выпадающий список в переменную */
	var dropBlock = $(this).parent().parent().parent().find('.dropBlock');
	// 	/* Работаем с событием клика по элементам выпадающего списка */
		$('.drop').find('li').click(function(){

			/* Заносим в переменную HTML код элемента
			списка по которому кликнули */
			var selectResult = $(this).html();

			/* Находим наш инпут и передаем в него
			значение из переменной selectResult */
			$(this).parent().parent().find('input').val(selectResult);

			/* Передаем значение переменной selectResult в ссылку которая
			открывает наш выпадающий список и удаляем активность */
			$(this).parent().parent().parent().find('.slct').html(selectResult);

			/* Скрываем выпадающий блок */
			dropBlock.slideUp();
		});
});



$(function(){
 
    $( "#slider-range" ).slider({
    animate: "slow",
    range: true,
    min: 0,
    max: 100000,
    values: [ 10000, 80000 ],
    value: 10,
    step: 100,
    slide: function( event, ui ) {
    $( "#price" ).val( ui.values[ 0 ] + " руб. - " + ui.values[ 1 ] + " руб.");
    }
    });
    $( "#price" ).val( $( "#slider-range" ).slider( "values", 0 ) +
    ' руб. - ' + $( "#slider-range" ).slider( "values", 1 ) + " руб.");
    
});

function upBtn(){
    var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
    if(top > 0) {
        window.scrollBy(0,-100);
        var t = setTimeout('upBtn()', 20);
    } else clearTimeout(t);
    return false;
    
}
function plus(elem){
    var num = Number(elem.nextElementSibling.innerText);
    var numFrom = document.getElementById("from"); 
    var numTo = document.getElementById("to");
    if (Number(numFrom.innerText) + 1 <= 20 && Number(numTo.innerText) + 1 <= 20){
        if (Number(numFrom.innerText) + 1 > Number(numTo.innerText) && elem.nextElementSibling === numFrom){
            numFrom.innerHTML = Number(numFrom.innerText) + 1;
            numTo.innerHTML = Number(numTo.innerText) + 1;
            
        }else{
            elem.nextElementSibling.innerHTML = num + 1;
        }
         
    }
   
}
function minus(elem){
    var num = Number(elem.previousElementSibling.innerText);
    var numFrom = document.getElementById("from"); 
    var numTo = document.getElementById("to"); 
    if (num > 0 && Number(numTo.innerText) - 1 >= 1){
        if (Number(numFrom.innerText) > Number(numTo.innerText) - 1 && elem.previousElementSibling === numTo){
            numFrom.innerHTML = Number(numFrom.innerText) - 1;
            numTo.innerHTML = Number(numTo.innerText) - 1;
            
        }else{
            elem.previousElementSibling.innerHTML = num - 1;
        }
        //elem.previousElementSibling.innerHTML = num - 1;
    }
}


function selectCountPeople(elem){
    var buttons = elem.parentElement.getElementsByTagName("div");
    for (var i = 0; i < buttons.length; i++){
        if (buttons[i].classList.contains("active")){
            buttons[i].classList.remove("active");
            break;
        }
    }
    if (!elem.classList.contains("active")){
        elem.classList.add("active");
    }
    if (elem.parentElement == document.getElementById("old")){
        var outputElem = document.getElementById("resultOld");
        outputElem.innerHTML = "<span>" + elem.innerText + "</span>" + " взрослый";
    }else {
        var outputElem = document.getElementById("resultYoung");
        outputElem.innerHTML = "и " + "<span>" + elem.innerText + "</span>"  + " детский";
    }
    if (elem.innerText == "нет"){
        var outputElem = document.getElementById("resultYoung");
        outputElem.innerHTML = "";
    }
   
}
function toggleList(elem){
    $(elem.nextElementSibling).slideToggle();
}

$( ".formInput").click(function(){
    $(this).parent().find(".dropBlock").slideToggle();
});
$( "#buttonExtra").click(function(){
    $(this).parent().find(".extra").slideToggle();
    if ($(this).text() == "дополнительно"){
        $(this).text("скрыть") 
    }else{
        $(this).text("дополнительно");
    }
});
function checkedExtraInfo(elem){
    var brnTurnOn = elem.children[0];
    var brnTurnOff = elem.children[2];
    if (elem.classList.contains("active")){
        elem.classList.remove("active");
        brnTurnOff.style.display = "none";
        brnTurnOn.style.display = "flex";
    }else{
        elem.classList.add("active");
        brnTurnOff.style.display = "flex";
        brnTurnOn.style.display = "none";
    }
   
}




function errorShow(flag, status){
    document.getElementById("resultContent").style.display = "block";
    var errorBlock = document.getElementById("errorBlock");
    if (flag){
        errorBlock.style.display = "block";
    }else{
        errorBlock.style.display = "none";
        return 1;
    }
    errorBlock.innerHTML = "";
    switch (status){
        case "ErrorFindHotels":
            var h4 = document.createElement("h4");
            h4.innerText = "Hotels is not found";
            errorBlock.appendChild(h4);

            var p_1 = document.createElement("p");
            p_1.innerText = "Unfortunately, this country doesn't have hotels that you are looking for.";
            errorBlock.appendChild(p_1);

            var p_2 = document.createElement("p");
            p_2.innerText = "Please, select other information about counry and we maybe can find your love hotel";
            errorBlock.appendChild(p_2);
            break;
        default:
            console.log("ERROR: errorShow don't work");

        case "NullCountry":
                var p = document.createElement("p");
                p.innerText = "Error: You don't type the country!";
                errorBlock.appendChild(p);
                p.classList.add("errorType");
    
    }
    return 0;
   

}
function reboot(){
    var country = document.getElementById("countryName");
    var costFrom = $("#slider-range").slider("values", 0);
    var costTo = $("#slider-range").slider("values", 1);
    var dayFrom = document.getElementById("from");
    var dayTo = document.getElementById("to");
    var olds = document.getElementById("old").getElementsByTagName("div");
    var pepoleOld = document.getElementById("resultOld").children[0];
    var youngs = document.getElementById("young").getElementsByTagName("div");
    var pepoleYoung = document.getElementById("resultYoung");
    var rusPlace = document.getElementById("rusPlace");
    var personTransport = document.getElementById("personTransport");
    var alhogol = document.getElementById("alhogol");
    var resultBlock = document.getElementById("resultContent");
    var errorBlock = document.getElementById("errorBlock");
    var tourDaysBlock = document.getElementById("tourDaysBlock");
    var infoTourDays = document.getElementById("infoTourDays");
    var blockTourDays = document.getElementById("blockTourDays");
        
    country.innerText =  "Выберети страну посещения";
    dayFrom.innerText = 1;
    dayTo.innerText = 2;

    pepoleOld.innerText = 1;
    for (var i = 0; i < olds.length; i++){
        if (olds[i].classList.contains("active")){
            olds[i].classList.remove("active");
            break;
        }
    }
    olds[0].classList.add("active");

    pepoleYoung.innerHTML = "<span></span>";
    for (var i = 0; i < youngs.length; i++){
        if (youngs[i].classList.contains("active")){
            youngs[i].classList.remove("active");
            break;
        }
    }
    youngs[0].classList.add("active");
    
    rusPlace.classList.remove("active"); 
    personTransport.classList.remove("active");
    alhogol.classList.remove("active");

    resultBlock.style.display = "none";
    errorBlock.style.display = "none";
    tourDaysBlock.style.display = "none";
    infoTourDays.style.display = "none";
    blockTourDays.style.display = "none";

    $("#slider-range").slider( "values", [10000, 20000] );
    $( "#price" ).val( 10000 + " руб. - " + 20000 + " руб.");
}
function request(elem){
    var country = document.getElementById("select").getAttribute("value");
    var costFrom = $("#slider-range").slider("values", 0);
    var costTo = $("#slider-range").slider("values", 1);
    var dayFrom = document.getElementById("from").innerText;
    var dayTo = document.getElementById("to").innerText;
    var pepoleOld = document.getElementById("resultOld").children[0].innerText;
    var pepoleYoung = document.getElementById("resultYoung").children[0].innerText;
    
    var rusPlace = is_cheked(document.getElementById("rusPlace"));
    var personTransport = is_cheked(document.getElementById("personTransport"));
    var alhogol = is_cheked(document.getElementById("alhogol")); 
   
    var hotelObj = searchHotel(country, costFrom, costTo, dayFrom, dayTo, pepoleOld, pepoleYoung, rusPlace, personTransport, alhogol);
    var infoTourDays = document.getElementById("blockTourDays");

    var resultBlock = document.getElementById("resultContent");
        
        resultBlock.children[0].children[1].style.display = "none";

    
    var tourDaysBlock = document.getElementById("tourDaysBlock");
    var infoTourDays = document.getElementById("infoTourDays");
    var blockTourDays = document.getElementById("blockTourDays");

    var errorBlock = document.getElementById("errorBlock");
    if (!country){
        scrollDown(elem, 2);
        var countryBlock = document.getElementById("countryName");
        countryBlock.classList.add("error");
        setTimeout(function() {
            countryBlock.classList.remove("error");
        }, 5000);
        errorShow(true, "NullCountry");
        return;
    }
    var progressBarHotels = document.getElementById("preloaderHotels");
    progressBarHotels.style.display = "block";
    errorShow(false, "ErrorFindHotels");
    if (hotelObj == -1){
        scrollDown(elem, 0);
        setTimeout(function() {
            tourDaysBlock.style.display = "none";
            blockTourDays.style.display = "none";
            progressBarHotels.style.display = "none";
            errorShow(true, "ErrorFindHotels");
            scrollDown(elem, 2);
        }, 5000);
    }else{
        
        resultBlock.style.display = "none";
        tourDaysBlock.style.display = "none";
        infoTourDays.style.display = "none";
        blockTourDays.style.display = "none";
        scrollDown(elem, 0);
        setTimeout(function() {
            hotelObj.result();
            resultBlock.style.display = "block";
            infoTourDays.style.display = "none";
            createBtnDays(Number(dayTo - dayFrom));
            progressBarHotels.style.display = "none";
            scrollDown(elem, 1);
        }, 5000);
        
        
    }
    return;
}

function is_cheked(obj){
    if (obj.classList.contains("active")){
        return true;
    }else {
        return false;
    }
}
function scrollDown(elem, id){
    
    var nameAnchor = elem.getAttribute("name");
    var moveToAnchor = nameAnchor + "_";
    var toAnchor = document.getElementsByName(moveToAnchor);
    var start = Date.now();
    var timer = setInterval(function() {
        var time = 1000;
        var timePassed = Date.now() - start;
        if (timePassed >= time) {
            clearInterval(timer);
            return;
        }
        
        const value = time / toAnchor[id].getBoundingClientRect().top; // 2000 / 400 = 5 
        const offsetY = timePassed / value;
        
        window.scrollBy(0, offsetY) ;
    }, 20);
    
   
}
class Landmark{
    constructor(country, name, urlImage, description){
        this.country = country;
        this.name = name;
        this.urlImage = urlImage;
        this.description = description;
        this.flagLooked = false;
    }
    resultShow(elem){

        var blockHotel = document.createElement("div");
        blockHotel.classList.add("blockHotel");
        elem.appendChild(blockHotel);

        var divRow = document.createElement("div");
        divRow.classList.add("row");
        blockHotel.appendChild(divRow);

        var divCol12_1 = document.createElement("div");
        divCol12_1.classList.add("col-md-12");
        divRow.appendChild(divCol12_1);

        var inmLandmarks = document.createElement("img");
        inmLandmarks.setAttribute("src", this.urlImage);
        divCol12_1.appendChild(inmLandmarks);

        var divCol12_2 = document.createElement("div");
        divCol12_2.classList.add("col-md-12");
        divRow.appendChild(divCol12_2);

        var h3 = document.createElement("h3");
        h3.innerText = this.name;
        divCol12_2.appendChild(h3);

        var descriptionLandmark = document.createElement("p");
        descriptionLandmark.innerText = this.description;
        divCol12_2.appendChild(descriptionLandmark);     
        
        var btnReadMore = document.createElement("div");
        btnReadMore.classList.add("readMore");
        btnReadMore.innerText = "READ MORE";
        divCol12_2.appendChild(btnReadMore); 
    }
}
class Hotel{
    
    constructor(name, country, cost, stars, urlImg, rusPlace, personTransport, alcogol){
        this.countDays = 0;
        this.resultCost = 0;
        this.name = name;
        this.country = country;
        this.cost = cost;
        this.stars = stars;
        this.urlImg = urlImg;

        this.rusPlace = rusPlace;
        this.personTransport = personTransport;
        this.alcogol = alcogol;
    }
    result(){
        var resultBlock = document.getElementById("resultContent");
        resultBlock.style.display = "block";
        resultBlock.children[0].children[1].style.display = "flex";
        document.getElementById("imgHotel").src = this.urlImg;
        document.getElementById("infoHotel").children[0].innerHTML = "отель " + this.name;
        document.getElementById("infoHotel").children[1].innerHTML = '<i class="fas fa-globe-americas"></i> ' + this.country;
        document.getElementById("costHotel").innerHTML = '<i class="fas fa-ruble-sign"></i> ' +  Math.round(this.resultCost);
        document.getElementById("infoHotel").children[2].innerHTML = "";
        document.getElementById("infoHotel").children[3].innerHTML = "";
        for (var i = 0; i < this.stars; i++){
            document.getElementById("infoHotel").children[2].innerHTML += '<i class="fas fa-star"></i>';
        }
        if (this.rusPlace){
            document.getElementById("infoHotel").children[3].innerHTML += '<i class="fas fa-child"></i>';
            document.getElementById("infoHotel").children[3].children[0].setAttribute("title", "Часто посещаемо россиянами");
        }
        if (this.personTransport){
            document.getElementById("infoHotel").children[3].innerHTML += '<i class="fas fa-car-alt"></i>';
            document.getElementById("infoHotel").children[3].children[1].setAttribute("title", "Разрешёно личное транспортное средство");
        }
        if (this.alcogol){
            document.getElementById("infoHotel").children[3].innerHTML += '<i class="fas fa-wine-bottle"></i>';
            document.getElementById("infoHotel").children[3].children[2].setAttribute("title", "Разрешён алкоголь");
        }
    }
}

var listHotelsObj = [];
var listLandmarkObj = [];

$(".dropMenuList").click(function(){
    $(".dropMenuList").find(".dropMenuListChild").slideToggle();
});

function createBtnDays(countDays){
    document.getElementById("tourDaysBlock").style.display = "block";
    var daysPlace = document.getElementById("daysPlace");
    daysPlace.setAttribute("name", "landmarksInThisDay")
    daysPlace.innerHTML = "";
    for (var i = 1; i <= countDays; i++){
        var divDay = document.createElement("div");
        divDay.classList.add("dayNumber");
        divDay.setAttribute("id", "dayMove");
        divDay.setAttribute("onclick", "searchMove(this)");
        divDay.innerHTML= "<span>" + i + "</span>" + "<span class = 'word'>день</span>";
        
        daysPlace.appendChild(divDay);
        if (i < countDays){
            var divLine = document.createElement("div");
            divLine.classList.add("line");
            daysPlace.appendChild(divLine);
        }
    }
    
}
function findLandmarks(){
    var listAcceptMove = [];
    var country = document.getElementById("countryName").innerText;
    var dayFrom = document.getElementById("from").innerText;
    var dayTo = document.getElementById("to").innerText;
    var days = dayTo - dayFrom;
    var count = 0;
    
    for (var i = 0; i < listLandmarkObj.length; i++){
        if (listLandmarkObj[i].country == country){
            listAcceptMove.push(listLandmarkObj[i]);
        }
    }
    return listAcceptMove
}
function searchMove(elem){
    var dayPlace = document.getElementById("daysPlace");
    for(var i = 0; i < dayPlace.childNodes.length; i++){
        if (dayPlace.children[i].id == "dayMove"){
            if (dayPlace.children[i].classList.contains("active")){
                dayPlace.children[i].classList.remove("active");
            }
            
            if (dayPlace.children[i].nextElementSibling && dayPlace.children[i].nextElementSibling.classList.contains("active")){
                dayPlace.children[i].nextElementSibling.classList.remove("active")
            }
        }
    }
    elem.classList.add("active");
    if (elem.nextElementSibling){
        elem.nextElementSibling.classList.add("active");
    }
   


    var resultBlock = document.getElementById("infoTourDays");
    var titleResultBlock = document.getElementById("blockTourDays");
    resultBlock.style.display = "block";
    titleResultBlock.style.display = "block";
    document.getElementById("numDay").innerText = elem.children[0].innerText;
    resultBlock.innerHTML = " ";
    
    var arrayLandmarks = findLandmarks();
    var countLandmarks = Math.floor(Math.random() * (arrayLandmarks.length - 2)) + 2;
    for (var i = 0; i < countLandmarks; i++){
        if (arrayLandmarks[i]){
            
            arrayLandmarks[i].resultShow(document.getElementById("infoTourDays"));
        }
    }
    setTimeout(function() {
        scrollDown(dayPlace, 0);
    }, 100);
}
function searchHotel(country, costFrom, costTo, dayFrom, dayTo, pepoleOld, pepoleYoung, rusPlace, personTransport, alcogol){
    var listAcceptHotels = [];
    for (var i = 0; i < listHotelsObj.length; i++){
        if (
                listHotelsObj[i].country == country &&
                listHotelsObj[i].cost >= costFrom &&
                listHotelsObj[i].cost <= costTo &&
                listHotelsObj[i].rusPlace == rusPlace &&
                listHotelsObj[i].personTransport == personTransport &&
                listHotelsObj[i].alcogol == alcogol
            )
            {
                if (dayTo != dayFrom){
                    listHotelsObj[i].countDays = dayTo - dayFrom;
                }else {
                    
                    listHotelsObj[i].countDays = 1;
                }
                listHotelsObj[i].resultCost = 0;
                if (pepoleYoung ){
                    listHotelsObj[i].resultCost = (Number(pepoleOld) + Number(pepoleYoung) * 0.8) * listHotelsObj[i].countDays * listHotelsObj[i].cost;
                    
                }else {
                    listHotelsObj[i].resultCost = pepoleOld *  listHotelsObj[i].countDays * listHotelsObj[i].cost;
                }
                listAcceptHotels.push(listHotelsObj[i]);
            
        }
    }
    var index = Math.floor(Math.random() * listAcceptHotels.length);
    if (listAcceptHotels.length == 0){
        return -1;
    }
    return listAcceptHotels[index];
    
}
const hotel1 = new Hotel(
    "Club St. George Resort",
    "Кипр",
    55000,
    3,
    "img/testHotel.jpg",
    true,
    true,
    true
);
listHotelsObj.push(hotel1);
const hotel2 = new Hotel(
    "Forty Winks Phuket (ex. Arimana)",
    "Тайланд",
    20000,
    4,
    "img/testHotel.jpg",
    true,
    false,
    true
);
listHotelsObj.push(hotel2);
const hotel3 = new Hotel(
    "Klas Dom Suite Annexe (ex. Sahin Klas)",
    "Алания",
    66000,
    1,
    "img/testHotel.jpg",
    false,
    false,
    true
);
listHotelsObj.push(hotel3);
const hotel4 = new Hotel(
    "Bella Elena",
    "Греция (Крит)",
    20816,
    2,
    "img/testHotel.jpg",
    false,
    false,
    false
);
listHotelsObj.push(hotel4);
const hotel5 = new Hotel(
    "Villa Diasselo",
    "Греция (Крит)",
    21630,
    3,
    "img/testHotel.jpg",
    false,
    false,
    false
);
listHotelsObj.push(hotel5);
const hotel6 = new Hotel(
    "Rena",
    "Греция (Крит)",
    12432,
    1,
    "img/testHotel.jpg",
    false,
    false,
    false
);
listHotelsObj.push(hotel6);
const hotel7 = new Hotel(
    "Tsanotel (ex. Azur Beach)",
    "Кипр",
    50775,
    3,
    "img/tsanotel.jpg",
    false,
    false,
    false
);
listHotelsObj.push(hotel7);
const hotel8 = new Hotel(
    "Sunny Blue (ex. Mastro Napa Apartments)",
    "Кипр",
    61122,
    3,
    "img/Sunny Blue.jpg",
    false,
    false,
    false
);
listHotelsObj.push(hotel8);
const hotel9 = new Hotel(
    "Konnos Bay Hotel Apartments",
    "Кипр",
    53140,
    3,
    "img/Konnos Bay Hotel Apartments.jpg",
    true,
    false,
    false
);
listHotelsObj.push(hotel9);
const hotel10 = new Hotel(
    "Bella Napa",
    "Кипр",
    79082,
    3,
    "img/Konnos Bay Hotel Apartments.jpg",
    false,
    true,
    false
);
listHotelsObj.push(hotel10);
const hotel11 = new Hotel(
    "Bella Napa",
    "Кипр",
    79082,
    3,
    "img/Bella Napa.jpg",
    false,
    true,
    false
);
listHotelsObj.push(hotel11);
const hotel12 = new Hotel(
    "Queens Bay",
    "Кипр",
    57796,
    3,
    "img/Queens Bay.jpg",
    false,
    false,
    true
);
listHotelsObj.push(hotel12);
const hotel13 = new Hotel(
    "Veronica",
    "Кипр",
    53879,
    3,
    "img/Veronica.jpg",
    true,
    true,
    false
);
listHotelsObj.push(hotel13);
const hotel14 = new Hotel(
    "Tsokkos Holiday Hotel Apartments",
    "Кипр",
    57649,
    3,
    "img/Tsokkos Holiday Hotel Apartments.jpg",
    true,
    false,
    true
);
listHotelsObj.push(hotel14);
const hotel15 = new Hotel(
    "Atlantica Miramare Beach",
    "Кипр",
    59052,
    4,
    "img/Atlantica Miramare Beach",
    false,
    true,
    true
);
listHotelsObj.push(hotel15);






const landmark1 = new Landmark(
    "Кипр",
    "Дворец Архиепископа",
    "img/dvorets-arhiepiskopa.jpg",
    "Сооружение XX в. в псевдовенецианском стиле в столице Кипра Никосии. Рядом есть старое здание дворца XVIII в., которое сильно пострадало после вторжения турок в 1974 г. Это место служит резиденцией для главы местной церкви – Архиепископа Кипра. Во дворце есть музей, библиотека, галерея искусств и собор."
);
listLandmarkObj.push(landmark1);

const landmark2 = new Landmark(
    "Греция (Крит)",
    "Ираклион",
    "img/heraklion.jpg",
    "Древний исторический центр острова Крит, названный в честь мифологического героя Геракла. Если верить «Географии» древнегреческого мыслителя, географа и историка Страбона, город уже существовал в I веке н.э. и являлся морским портом минойского города Кносс. Ираклионом в разное время владели арабы, византийцы, венецианцы и турки. В Средние века здесь находился крупнейший рынок по торговле рабами на всем Средиземноморье. Остров соединился с Грецией только в начале XX столетия."
);
listLandmarkObj.push(landmark2);

const landmark3 = new Landmark(
    "Греция (Крит)",
    "Аквапарк «Water City»",
    "img/akvapark-water-city.jpg",
    "Аквапарк находится в Ираклионе, его территория занимает площадь более 80 тысяч м². Это самый большой парк водных развлечений на Крите. В него входит 13 бассейнов и множество скоростных горок разного уровня сложности. Также в аквапарке имеются менее экстремальные аттракционы, поэтому каждый посетитель найдет себе занятие. Для детей оборудованы отдельные бассейны и площадки с разнообразными водными играми."
);
listLandmarkObj.push(landmark3);

const landmark4 = new Landmark(
    "Греция (Крит)",
    "Айос-Николаос",
    "img/agios-nikolaos.jpg",
    "Небольшой город на севере Крита, известное и популярное туристическое направление. Предшественник современного Айос-Николаоса возник на месте древнего дорийского поселения Лато, но постепенно пришел в упадок. Новые жители появились уже в Средние века во время венецианского владычества. В 1646 году в результате войны с турками венецианцы сожгли поселение. В третий раз Айос-Николаос возродился в середине XIX столетия."
);
listLandmarkObj.push(landmark4);

const landmark5 = new Landmark(
    "Кипр",
    "Купальня Афродиты",
    "img/kupalnya-afrodity.jpg",
    "Небольшой укромный грот, окруженный пышной растительностью и цветами. По легенде, богиня Афродита принимала тут ванны и познакомилась с возлюбленным ею Адонисом. Считается, что вода из купальни омолаживает тело, придает сил и бодрости. Но посетителям купаться в гроте запрещено, поэтому проверить эту версию невозможно."
);
listLandmarkObj.push(landmark5);

const landmark6 = new Landmark(
    "Кипр",
    "Винный завод КЕО",
    "img/vinnyi-zavod-keo.jpg",
    "Находится в одном из центров местного виноделия — городе Лимассоле. На Кипре делают вино не одну тысячу лет, виноградники КЕО дают урожаи уже более 150 лет. Во время бесплатной экскурсии по заводу туристам рассказывают об истории и процессе производства разных сортов вина. Дегустация тоже бесплатная, после чего предлагается купить понравившиеся напитки."
);
listLandmarkObj.push(landmark6);

const landmark7 = new Landmark(
    "Кипр",
    "Лимассольский замок",
    "img/limasolskiy-zamok.jpg",
    "Форт периода Османской империи, возведенный в IV веке. В XVI стал использоваться турками для охраны гавани Лимассола. В ранние периоды на месте форта находилась христианская базилика и византийская крепость, где по преданию произошло венчание короля Ричарда Львиное Сердце с принцессой Беренгарией."
);
listLandmarkObj.push(landmark7);

const landmark8 = new Landmark(
    "Кипр",
    "Киренийский замок (Северный Кипр)",
    "img/kirenijskij-zamok.jpg",
    "Был построен византийцами для целей защиты от набегов арабов. Замок был обновлен в период владычества венецианцев. В XVI веке он пал под ударами османской армии и до XIX столетия использовался турками в качестве военной базы. В 1974 году после оккупации Северного Кипра войсками Турции в замке разместили музей."
);
listLandmarkObj.push(landmark8);