// get favourites heros id from local storage and store in an array
// stores the charcter id

// var arr =localStorage.favourites.split(",");
// console.log(arr);

if (localStorage.getItem("favourites") !== null) {
    // Parse the string from local storage to an array
    // var arr = JSON.parse(localStorage.getItem("favourites"));
    // Split the array by comma
    var arr = JSON.parse(localStorage.favourites);
    console.log(arr);
}
else {
    // Initialize an empty array if the key 'favourites' doesn't exist in the localstorage
    var arr = [];
}

// // function for show heros full details in a new page
// function showDetails(idnumber) {
//     localStorage.setItem("id", idnumber);
//     window.location = "index2.html";
// }


// function for remove hero from favourites, update localstorage and reload page



//function for show all favourites heros in html page 
// 

 let html="";
    
    for (let i = 0; i < arr.length; i++) {
        const idnumber=arr[i];
        console.log(idnumber);
        fetch(`https://gateway.marvel.com/v1/public/characters/${idnumber}?ts=1&apikey=18086c4dd0bd7ebef399cb83f6fd8ce3&hash=d7a1feeac37019ce89a01ea921e6a870`)
    .then(response => response.json())
    .then(response => {
      console.log(response.data);
      const characterAttributes = response.data.results;
           
      html += "<div class='row'>";
      characterAttributes.forEach((element) => {
        html += `
          <div class="col-4" style="margin-top: 50px;">
            <div class="card" style="width: 18rem;">
            <a  onclick="showDetailss(${element.id})"><img class="card-img-top" id="${element.id}" onclick="showDetails(${element.id})" src="${element.thumbnail.path+".jpg"}"></a>
              <div class="card-body">
                <span>
                  <h5 class="card-title" onclick="showDetailss(${element.id})">${element.name}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <i id="${element.id}" class="fa-solid fa-minus icon" onclick="removeHero(${element.id})" style="align-items: right; cursor:pointer"></i>
                  </h5>
                </span>
              </div>
            </div>
          </div>
        `;
      });
      html += "</div>";
      document.getElementById("cardsgroup").innerHTML = html;
  })

}
      
 function removeHero(id) {
    var arr=JSON.parse(localStorage.favourites);
    var index=arr.indexOf(id);
    console.log(index);

    arr.splice(index,1);
    console.log(arr);
    localStorage.setItem("favourites",JSON.stringify(arr));

    alert("your hero remove successfulled");
    location.reload();
}
   //  catch(error => {
   //    console.log(error);
   // });

// setTimeout(() => {
//     document.getElementById("cards-group").innerHTML=html;
// }, 1000);
function showDetailss(idnumber) {
  console.log('idnumber', idnumber)
  
  fetch(`https://gateway.marvel.com/v1/public/characters/${idnumber}?ts=1&apikey=18086c4dd0bd7ebef399cb83f6fd8ce3&hash=d7a1feeac37019ce89a01ea921e6a870`)
    .then(response => response.json())
    .then(response => {
      // console.log(response.data);
      const charachterDetails = response.data.results;
      // console.log(charachterDetails);
      let html = "";
      html += "<div class='row'>";
      charachterDetails.forEach((element) => {
        html += `
          <img class="card-img-top" src="${element.thumbnail.path+".jpg"}" style="width: 315px; height: 215px; justify: center; margin-left: 35%; padding-left: 0px">
              <div class="container">
                <span>
                <br>
                  <h5 class="card-title" style="color: lightblue; font-size: 35px">${element.name}
                    </h5>
                </span>
                <br>
                <p class="description" style="color: white; font-size: 15px; text-align:justify; margin-left:20%; margin-right: 20%">${element.description}</p>
               
                <p style="color: white; font-size: 15px; text-align:justify; margin-left:20%; margin-right: 20%">No. of Series: ${element.series.available}</p>
                <p style="color: white; font-size: 15px; text-align:justify; margin-left:20%; margin-right: 20%">No. of Comics: ${element.comics.available}</p>
                <p style="color: white; font-size: 15px; text-align:justify; margin-left:20%; margin-right: 20%">No. of Stories: ${element.stories.available}</p>
                <p style="color: white; font-size: 15px; text-align:justify; margin-left:20%; margin-right: 20%">No. of Events: ${element.events.available}</p>
              </div>
            </div>
          </div>
        `;
    });
      html += "</div>";
      document.getElementById("cardsgroup").innerHTML = html;
    })
    .catch(error => {
      console.log(error);
    });
}
