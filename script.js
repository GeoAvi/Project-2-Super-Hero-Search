var marvel = {
render: function(){
	var url = "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=18086c4dd0bd7ebef399cb83f6fd8ce3&hash=d7a1feeac37019ce89a01ea921e6a870";

	var message = document.getElementById("message");
	var marvelContainer = document.getElementById("marvel-container");

	$.ajax({
		url: url,
		type: "GET",
		beforeSend: function(){
		message.innerHTML = 'Loading...';
	},

		complete: function(){
			message.innerHTML='Successfully Connected';
		},
	});
}
};
// marvel.render();


const fetchHero = () => {
	// 
  var name = document.getElementById('name');
  // console.log("element",name.value)
  fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name.value}&limit=60&ts=1&apikey=18086c4dd0bd7ebef399cb83f6fd8ce3&hash=d7a1feeac37019ce89a01ea921e6a870`)
    .then(response => response.json())
    .then(response => {
    	// console.log(response.data);
      const characterAttributes = response.data.results;
      // console.log(characterAttributes);
      let html = "";
      html += "<div class='row'>";
      characterAttributes.forEach((element) => {
        html += `
          <div class="col-4" style="margin-top: 50px;">
            <div class="card" style="width: 18rem;">
            <a  onclick="showDetails(${element.id})"><img class="card-img-top" id="${element.id}" onclick="showDetails(${element.id})" src="${element.thumbnail.path+".jpg"}"></a>
              <div class="card-body">
                <span>
                  <h5 class="card-title" onclick="showDetails(${element.id})">${element.name}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <i id="${element.id}" class="fa-solid fa-plus icon" onclick="addFavourite(event,${element.id})" style="align-items: right; cursor:pointer"></i>
                  </h5>
                </span>
              </div>
            </div>
          </div>
        `;
      });
      html += "</div>";
      document.getElementById("cards-group").innerHTML = html;
    })
    .catch(error => {
      // console.log(error);
    });

// var image = document.getElementById("cardclick");
// image.addEventListener("click", function() {
//     var imageData = image.id;
//     console.log('image.id');
    // window.location.href = "details.html?image=" + imageData;
// });
}

    function showDetails(idnumber) {
  // console.log('idnumber', idnumber)
  
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
      document.getElementById("cards-group").innerHTML = html;
    })
    .catch(error => {
      // console.log(error);
    });
}

// make a favourites key for storing all favourites hero's id in local storage if not available
if (localStorage.getItem("favourites")==null) {
  localStorage.setItem("favourites",JSON.stringify([]));
}else{
  // var arr = localStorage.favourites.split(",");
	var arr = JSON.parse(localStorage.favourites)
	console.log('ele',arr);
}


function addFavourite(e,id) {
	// console.log(e,id);
	var arr = JSON.parse(localStorage.favourites);
	e.stopPropagation();
  if (!arr.includes(id) == true) {
    console.log(arr);
    arr.push(id);
    localStorage.setItem("favourites", JSON.stringify(arr));
    alert("your hero added in favourites")
  }else{
    alert("your hero already added in favourites")
  }
}

