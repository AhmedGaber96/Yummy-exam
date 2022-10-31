'use strict'
$('#sideBarIcon').click(function(){
   let x=  $(".slideInformation").outerWidth();
   if($(".sideBar").css('left')== `-${x}px`){
      $(".sideBar").animate({left:"0px"},500 , function(){
         $('.listcontainer').css('visibility','visible');
         $('.listcontainer').animate({'margin-top':"0px"},500)
         $('.listcontainer ul li a').animate({'padding-top':"25px"},500)
         })
      }
   else{
      $('.listcontainer').css('visibility','hidden');
      $('.listcontainer').animate({'margin-top':"100px"},500)
      $(".sideBar").animate({left:`-${x}px`},500)
      $('.listcontainer ul li a').animate({'padding-top':"50px"},500)
   }
})
let arr= [];
async function main(){
   let getDate= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
   let first = await getDate.json()
   arr=first.meals
   let carton=``
   for(let i = 0 ; i<first.meals.length;i++){
      carton += `<div class="col-md-3" >
      <div class="one">
      <img src="${arr[i].strMealThumb}" alt="" class="w-100 rounded-2">
      <div class="layer rounded-2 d-flex align-items-center">
      <h2>${arr[i].strMeal}</h2>
         </div>
      </div>
   </div>`
   }
   document.querySelector(".add").innerHTML=carton;
   return carton; 
}


async function ttt(){
   await main()
   await displayOnemeal()
}
ttt()
  

 function displayOnemeal(){
   return new Promise(function(){
      $(".layer").click(function (e) { 
        let x = e.target.parentElement
        let imgsrc = x.children[0].getAttribute("src")
        let meall=e.currentTarget.children[0].innerHTML
        let indexOfMeal= arr.findIndex(Object=>{
         return Object.strMeal===meall
        })
        console.log(indexOfMeal)
       
        $('.one').css('display','none');
        $('.informationBOX').css('display','block');
        let carton=`            <div class="col-md-4 text-white text-center">
        <img src="${imgsrc}" alt="" class="w-100">
        <h1>${meall}</h1>
      </div>
      <div class="col-md-8 text-white">
        <h2>Instructions</h2>
        <p class="fw-light">${arr[indexOfMeal].strInstructions}</p>
        <p><span class="fw-bolder">Area :</span> ${arr[indexOfMeal].strArea}</p>
        <p><span class="fw-bolder">Category :</span>${arr[indexOfMeal].strCategory}</p>
        <h3>Recipes :</h3>
        <ul class="d-flex flex-wrap list-unstyled fw-light fs-6" id="recipes"> 
          <li class="my-3 mx-1 p-1 alert-success rounded">${arr[indexOfMeal].strMeasure1}</li>
          <li class="my-3 mx-1 p-1 alert-success rounded"> ${arr[indexOfMeal].strMeasure2}</li>
          <li class="my-3 mx-1 p-1 alert-success rounded"> ${arr[indexOfMeal].strMeasure3}</li>
          <li class="my-3 mx-1 p-1 alert-success rounded"> ${arr[indexOfMeal].strMeasure4}</li>
          <li class="my-3 mx-1 p-1 alert-success rounded"> ${arr[indexOfMeal].strMeasure5}</li>
          <li class="my-3 mx-1 p-1 alert-success rounded"> ${arr[indexOfMeal].strMeasure6}</li>
        </ul>
        <h3>Tags :</h3>
        <ul class="d-flex flex-wrap list-unstyled fw-light fs-6" id="tags">
          <li class="my-3 mx-1 p-1 alert-danger rounded">
            ${arr[indexOfMeal].strTags}
          </li>
        </ul>
        <a href="${arr[indexOfMeal].strSource}" target="_blank" class="d-inline-block btn btn-success text-white">
          Source 
        </a>
        <a href="${arr[indexOfMeal].strYoutube}" target="_blank" class="d-inline-block btn youtube text-white">
          Youtube 
        </a>




      </div>`
      document.getElementById("singleMeal").innerHTML=carton;
       



         });

   })
   
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




let searchByName= document.getElementById('serByName')
arr=[]
 async function getSeachData(mealSearch){
   let getserdata= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealSearch}`)
   let getData = await getserdata.json()
   arr=getData.meals
   console.log(getData.meals[0]);
   let carton = ``
   for(let i = 0 ; i<getData.meals.length;i++){
      carton += `<div class="col-md-3" >
      <div class="one">
      <img src="${arr[i].strMealThumb}" alt="" class="w-100 rounded-2">
      <div class="layer rounded-2 d-flex align-items-center">
      <h2>${arr[i].strMeal}</h2>
         </div>
      </div>
   </div>`
   }
   document.querySelector(".add").innerHTML=carton;
   await displayOnemeal();
   
}

searchingName()
function searchingName(){
   return new Promise(function(){
      $('#serByName').keydown( async function (callback) { 
         if(searchByName.value.length==1){
            ttt()
            
         }
         else if(searchByName.value.length>1){
            getSeachData(searchByName.value)
           
         }

       
      })
   })

}
$("#searchNav").click(function () { 
   $("#searchBar").css('visibility','visible');
   
   
});

//////////////////////////////////////////////////////   c a t o g r y   ///////////////////////////////////////////////////////////////



let catogryArr=[]
async function getCatogry(){
    let getDate = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let setdata = await getDate.json()
    catogryArr=setdata.categories;
    console.log(catogryArr)
    let carton=``
    for(let i =0;i<catogryArr.length;i++){
      carton += `<div class="col-md-3">
      <div class="one">
        <img src="${catogryArr[i].strCategoryThumb}" alt="" class="w-100">
        <div class="layer rounded-2 d-flex align-items-center justify-content-center flex-wrap">
          <h2 class="fs-5">${catogryArr[i].strCategory}</h2>
          <p>${catogryArr[i].strCategoryDescription}</p>
        </div>
      </div>
    </div>`

    }
    document.querySelector(".add").innerHTML=carton;
    
    displayCatogryList()
}




function displayCatogryList(){
   return new Promise(function( ){
      $('.layer').click(function (e) { 
         console.log(e.currentTarget.children[0].innerHTML)
         getCatogByfilter(e.currentTarget.children[0].innerHTML)
         
      });
      

   })

   
}

async function getCatogByfilter(filter){

   let getserdata= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`)
   let getData = await getserdata.json()
   arr=getData.meals
   console.log(getData.meals[0]);
   let carton = ``
   for(let i = 0 ; i<getData.meals.length;i++){
      carton += `<div class="col-md-3" >
      <div class="one">
      <img src="${arr[i].strMealThumb}" alt="" class="w-100 rounded-2">
      <div class="layer rounded-2 d-flex align-items-center">
      <h2>${arr[i].strMeal}</h2>
         </div>
      </div>
   </div>`
   }
   document.querySelector(".add").innerHTML=carton;
   await targ();
   
}
function targ (){
   return new Promise(function( ){
      $('.layer').click( async function (e) { 
         let data = e.currentTarget.children[0].innerHTML;
         await getSeachData(data)
         await displayOnemeal()

         
         
      });
      

   }) 

}
$('#CategoriesNav').click(function (e) { 
   $("#mainDisplayContainer").css('display','block');
   $("#conactContainer").css('display','none');

   getCatogry()
   
});
//////////////////////////////////////////            a r e a                  ///////////////////////////////////////////////////////////
let areaArr=[]
async function getArea(){
   let getDate = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let setdata = await getDate.json()
    areaArr=setdata.meals;
    console.log(areaArr)
    let carton=``
    for(let i =0;i<areaArr.length;i++){
      carton += `<div class="col-md-3">
      <div class="two text-center">
        <i class="fa-solid fa-city fa-3x text-danger"></i>
        <h2 class="text-white">${areaArr[i].strArea}</h2>
      </div>
    </div>`

    }
    document.querySelector(".add").innerHTML=carton;
    displayAreaList()

}


$('#AreaNav').click(function (e) {
   $("#mainDisplayContainer").css('display','block');
   $("#conactContainer").css('display','none'); 
   getArea()
   
});



function displayAreaList(){
   return new Promise(function( ){
      $('.two').click(function (e) { 
         let area = e.currentTarget.children[1].innerHTML
         getareaByfilter(area)
        
         
      });
      

   })

   
}
async function getareaByfilter(filter){

   let getserdata= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${filter}`)
   let getData = await getserdata.json()
   arr=getData.meals
   console.log(getData.meals[0]);
   let carton = ``
   for(let i = 0 ; i<getData.meals.length;i++){
      carton += `<div class="col-md-3" >
      <div class="one">
      <img src="${arr[i].strMealThumb}" alt="" class="w-100 rounded-2">
      <div class="layer rounded-2 d-flex align-items-center">
      <h2>${arr[i].strMeal}</h2>
         </div>
      </div>
   </div>`
   }
   document.querySelector(".add").innerHTML=carton;
   await targ();
}





/////////////////////////////////////////   I n g r e d i e n t s            ////////////////////////////////////////////////////// 
let Ingredientsarr=[]
async function getIngredient(){
   let getDate = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let setdata = await getDate.json()
    Ingredientsarr=setdata.meals.splice(0,20);
    console.log(Ingredientsarr)
    let carton=``
    for(let i =0;i<Ingredientsarr.length;i++){
      carton += `<div class="col-md-3">
      <div class="two text-center text-white">
        <i class="fa-solid fa-bowl-food fa-3x  text-success"></i>
        <h2 class="text-white fw-lighter fs-4">${Ingredientsarr[i].strIngredient}</h2>
       
      </div>
    </div>`

    }
    document.querySelector(".add").innerHTML=carton;
    displayIngredientsList()
}
$('#IngredientsNav').click(function (e) {
   $("#mainDisplayContainer").css('display','block');
   $("#conactContainer").css('display','none'); 
   getIngredient()
   
});

function displayIngredientsList(){
   return new Promise(function( ){
      $('.two').click(function (e) { 
         let Ingredients = e.currentTarget.children[1].innerHTML
         getIngredientsByfilter(Ingredients)
        
         
      });
      

   })

   
}
async function getIngredientsByfilter(filter){

   let getserdata= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${filter}`)
   let getData = await getserdata.json()
   arr=getData.meals
   console.log(getData.meals[0]);
   let carton = ``
   for(let i = 0 ; i<getData.meals.length;i++){
      carton += `<div class="col-md-3" >
      <div class="one">
      <img src="${arr[i].strMealThumb}" alt="" class="w-100 rounded-2">
      <div class="layer rounded-2 d-flex align-items-center">
      <h2>${arr[i].strMeal}</h2>
         </div>
      </div>
   </div>`
   }
   document.querySelector(".add").innerHTML=carton;
   await targ();
}
////////////////////////////////////////////////////// validation///////////////////////////////////////////////////////////

$("#ContactUsNav").click(function () { 
   $("#mainDisplayContainer").css('display','none');
   $("#conactContainer").css('display','block');

   
   
});



$('#name').keydown(function () { 
   if(userNameValid()==false){
      $("#namealert").css('display','block');
   }
   else{
      $("#namealert").css('display','none');
      console.log(",vfdlf")
   }

});

$('#email').keydown(function () { 
   if(userEmailValid()==false){
      $("#emailalert").css('display','block');
   }
   else{
      $("#emailalert").css('display','none');
   }

});


$('#password').keydown(function () { 
   if(userPasswordValid()==false){
      $("#passwordalert").css('display','block');
   }
   else{
      $("#passwordalert").css('display','none');
   }

});
$('#rePassword').keydown(function () { 
   if(userPasswordValid()==false){
      $("#repasswordalert").css('display','block');
   
   }
   else{
      $("#repasswordalert").css('display','none');
      $("#submitBtn").removeAttr('disabled');
   }

});
$('#phone').keydown(function () { 
   if(userPasswordValid()==false){
      $("#phonealert").css('display','block');
   }
   else{
      $("#phonealert").css('display','none');
   }

});
$('#age').keydown(function () { 
   if(userPasswordValid()==false){
      $("#phonealert").css('display','block');
     
   }
   else{
      $("#phonealert").css('display','none');
   }

});




function userNameValid() {
    return /^[a-zA-Z ]+$/.test($("#name").val())
}

function userEmailValid() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($("#email").val())
}

function userPhoneValid() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test($("#phone").val())
}

function userAgeValid() {
    return /^[1-9][0-9]?$|^100$/.test($("#age").val())
}

function userPasswordValid() {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test($("#password").val())
}

function userRePasswordValid() {
    return $("#password").val() == $("#rePassword").val()
}











































