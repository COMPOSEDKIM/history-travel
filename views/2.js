let geocoder;

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.749933, lng: -73.98633 },
      zoom: 13,
      mapTypeControl: false,
    });
    const card = document.getElementById("pac-card");
    const input = document.getElementById("pac-input");
    const biasInputElement = document.getElementById("use-location-bias");
    const strictBoundsInputElement =
      document.getElementById("use-strict-bounds");
    const options = {
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
      types: ["establishment"],
    };

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

    const autocomplete = new google.maps.places.Autocomplete(
      input,
      options
    );
    autocomplete.bindTo("bounds", map);

    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById("infowindow-content");

    infowindow.setContent(infowindowContent);

    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    });

    autocomplete.addListener("place_changed", () => {
      infowindow.close();
      marker.setVisible(false);

      const place = autocomplete.getPlace();

      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert(
          "No details available for input: '" + place.name + "'"
        );
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      infowindowContent.children["place-name"].textContent = place.name;
      infowindowContent.children["place-address"].textContent =
        place.formatted_address;
      infowindow.open(map, marker);
    });

    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    function setupClickListener(id, types) {
      const radioButton = document.getElementById(id);

      radioButton.addEventListener("click", () => {
        autocomplete.setTypes(types);
        input.value = "";
      });
    }

    setupClickListener("changetype-all", []);
    setupClickListener("changetype-address", ["address"]);
    setupClickListener("changetype-establishment", ["establishment"]);
    setupClickListener("changetype-geocode", ["geocode"]);
    setupClickListener("changetype-cities", ["(cities)"]);
    setupClickListener("changetype-regions", ["(regions)"]);
    biasInputElement.addEventListener("change", () => {
      if (biasInputElement.checked) {
        autocomplete.bindTo("bounds", map);
      } else {
        // User wants to turn off location bias, so three things need to happen:
        // 1. Unbind from map
        // 2. Reset the bounds to whole world
        // 3. Uncheck the strict bounds checkbox UI (which also disables strict bounds)
        autocomplete.unbind("bounds");
        autocomplete.setBounds({
          east: 180,
          west: -180,
          north: 90,
          south: -90,
        });
        strictBoundsInputElement.checked = biasInputElement.checked;
      }

      input.value = "";
    });
    strictBoundsInputElement.addEventListener("change", () => {
      autocomplete.setOptions({
        strictBounds: strictBoundsInputElement.checked,
      });
      if (strictBoundsInputElement.checked) {
        biasInputElement.checked = strictBoundsInputElement.checked;
        autocomplete.bindTo("bounds", map);
      }

      input.value = "";
    });


    geocoder = new google.maps.Geocoder();

    let test1 = [];
    let placename = [];
    let k = 0;

    //
    marker.addListener("click", () => {
      test1.push(marker.getPosition());

      geocoder.geocode({ location: test1[k] }, function (results, status) {
        if (status === "OK") {
            const place = results[0].place_id;
            console.log(place);
            qqq = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${place}&fields=name%2Crating%2Cformatted_address%2Creviews&language=ko&key=AIzaSyAXaYwwO82iGqPtEN2-PJi5tKFMwN5VFG4`
            fetch(qqq).then((response) => response.json())
              .then((data) => {
                console.log(data.result.name);
                placename.push(data.result.name);
                console.log(placename);

              })
        }
      });
      k = k + 1;
  })


    const addbutton = document.getElementById("add");
    addbutton.addEventListener('click', addMaker);
    i = 0;
    ic = 0;
    plannum = 0;

    markerlist = [];

    function addMaker() {
        const myLatLng =  test1[i] ;
        const mk = new google.maps.Marker({
            position: myLatLng,
            map,
          });

          
          const planList = document.getElementById("plan");
          const nameli = document.createElement("li");
          const menuBox =document.getElementById("rightClickMenu");
          const menuItems = document.getElementsByClassName("item");
          

          nameli.textContent = placename[plannum];
          planList.appendChild(nameli);
          plannum = plannum + 1;


          menuItems.addEventListener("click",onItemClick);
          for (var it=0;it<menuItems.length;it++) {
            menuItems[it].addEventListener("click",onItemClick);
        }

        nameli.addEventListener("contextmenu", () => {

            hospitalMarker();
        })
  
          nameli.addEventListener("contextmenu", popMenu);
          document.body.addEventListener("click",onBodyClick);
  
          const qw12 = document.querySelectorAll('#plan li');
          function onItemClick(){
            var itemNumber = this.getAttribute("number");
            if(itemNumber=="1"){
              console.log(qw12[0].textContent);
                hideMenu();
                
            }
            if(itemNumber=="2"){
                hideMenu();
                
            }
            if(itemNumber=="3"){
                hideMenu();
  
            }
            if(itemNumber=="4"){
                hideMenu();
  
            }
        }
          function onBodyClick(){
            hideMenu();
        }
        function hideMenu() {
            menuBox.style.display="none";
        }
        
        function popMenu(e) {
            e.preventDefault();
            menuBox.style.display="block";
            menuBox.style.top=e.pageY+"px";
            menuBox.style.left=e.pageX+"px";
        }

        
          markerlist.push(mk);

          mk.addListener("click", () => {
            geocoder.geocode({ location: test1[ic] }, function (results, status) {
              if (status === "OK") {
                  const place = results[0].place_id;
                  console.log(place);
                  imf = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${place}&key=AIzaSyAXaYwwO82iGqPtEN2-PJi5tKFMwN5VFG4`
                  fetch(imf).then((response) => response.json())
                    .then((data) => {
                      console.log(data.result.formatted_phone_number);
                    })
              }
            });

            console.log(test1);
            console.log(markerlist);
            ic = ic + 1;
        })

        i = i +1;

          
    }

    const deletebutton = document.getElementById("delete");
    deletebutton.addEventListener('click', deleteMarker);

    l = 0;
    function deleteMarker() {
      markerlist[l].setMap(null);
      markerlist.splice(l,1);
      test1.splice(l,1);

      console.log(test1);
      console.log(markerlist);
      console.log(a_marker.length)

    }

    const restaurantbutton = document.getElementById("restaurant");
    restaurantbutton.addEventListener('click', restaurantMarker);

    const service = new google.maps.places.PlacesService(map);
    let getNextPage;
    const moreButton = document.getElementById("more");

    moreButton.onclick = function () {
      moreButton.disabled = true;
      if (getNextPage) {
        getNextPage();
      }
    };

    const hospitalbutton = document.getElementById("hospital");
    hospitalbutton.addEventListener('click', hospitalMarker);

    function hospitalMarker() {
      const pivot = test1[0]
      service.nearbySearch(
        { location: pivot, radius: 700, type: "hospital" },
        (results, status, pagination) => {
          if (status !== "OK" || !results) return;
    
          addPlaces(results, map, a_marker);
          moreButton.disabled = !pagination || !pagination.hasNextPage;
          if (pagination && pagination.hasNextPage) {
            getNextPage = () => {
              // Note: nextPage will call the same handler function as the initial call
              pagination.nextPage();
            };
          }
        },
      );

    }
    
    function restaurantMarker() {
      const pivot = test1[0]
      service.nearbySearch(
        { location: pivot, radius: 700, type: "restaurant" },
        (results, status, pagination) => {
          if (status !== "OK" || !results) return;
    
          addPlaces(results, map, a_marker);
          moreButton.disabled = !pagination || !pagination.hasNextPage;
          if (pagination && pagination.hasNextPage) {
            getNextPage = () => {
              // Note: nextPage will call the same handler function as the initial call
              pagination.nextPage();
            };
          }
        },
      );
      
    }

    let dayNightButton = document.querySelector(".dayNightButton");
    hospitalbutton.addEventListener("click", change);
    restaurantbutton.addEventListener("click", change);
    function change() {
      if (dayNightButton.value === "night") {
          dayNightButton.value = "day";
      } else {
          dayNightButton.value = "night";
      }
  }

  let a_marker = [];

    function addPlaces(places, map) {
      console.log(a_marker);
      
      let num = a_marker.length;
      change()
      if(dayNightButton.value ==="night"){
        for( i = 0; i < num; i++){
          a_marker[0].setMap(null);
          a_marker.splice(0,1);
        }
    }
        const placesList = document.getElementById("places");
        while(placesList.firstChild){
          placesList.removeChild(placesList.firstChild);
        }
        for (const place of places) {
          if (place.geometry && place.geometry.location) {
            const image = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25),
            };
      
            const anymarker = new google.maps.Marker({
              map,
              icon: image,
              title: place.name,
              position: place.geometry.location,
            });
            a_marker.push(anymarker);
            const li = document.createElement("li");
      
            li.textContent = place.name;
            placesList.appendChild(li);
            li.addEventListener("click", () => {
              map.setCenter(place.geometry.location);
            });
          }
        }
        console.log(a_marker);
    }

  }

  


window.initMap = initMap;

//https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJa1ImVlaMcTURJaJzqe26hX4&fields=name%2Crating%2Cformatted_address%2Creviews&language=ko&key=AIzaSyAXaYwwO82iGqPtEN2-PJi5tKFMwN5VFG4 이름 얻기
//https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJa1ImVlaMcTURJaJzqe26hX4&key=AIzaSyAXaYwwO82iGqPtEN2-PJi5tKFMwN5VFG4    장소 정보
//https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AcJnMuEQUX0fF6d4oBuIeyW82l8pt7W5gypjSGxnWw2HhZZg5NqWCotxTnviMnlndCUJAlxz0ZJpf7nhC0O81mFGllb9ggzk6-2GWbZa69w0WeRXmshoUBghTZIcBBpPbTKlmmGTTcG8oPgmABJ31S1TGnDW4zYJruNpmN6qUT6NOb1cuj5R&key=AIzaSyAXaYwwO82iGqPtEN2-PJi5tKFMwN5VFG4  장소 사진
//https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=cruise&location=34.687403256759424%2C135.52584463969487&radius=1500&type=restaurant&key=AIzaSyAXaYwwO82iGqPtEN2-PJi5tKFMwN5VFG4 오사카 성 주변 음식점
/*
        const qwe = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=cruise&location=${test1[k].lat()}%2C${test1[k].lng()}&radius=1500&type=restaurant&key=AIzaSyAXaYwwO82iGqPtEN2-PJi5tKFMwN5VFG4`;
        fetch(qwe).then((response) => response.json())
          .then((data) => {
            for( j=0; j < 10; j++){
              new google.maps.Marker({
                position: data.results[j].geometry.location,
                map
              })
            }
            
          k = k+1;



                const qwe = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=cruise&location=${test1[k].lat()}%2C${test1[k].lng()}&radius=1500&type=restaurant&key=AIzaSyAXaYwwO82iGqPtEN2-PJi5tKFMwN5VFG4`;
      fetch(qwe).then((response) => response.json()).then((data) => {
        for( j= 0; j < 100; j++){
          new google.maps.Marker({
            position: data.results[j].geometry.location,
            map
          })
        }
      })

            if(b_marker.lengh != 0){
        anydelete(b_marker);
      }
      */


      qqq = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${place}&fields=name%2Crating%2Cformatted_address%2Creviews&language=ko&key=AIzaSyAXaYwwO82iGqPtEN2-PJi5tKFMwN5VFG4`
      fetch(qqq).then((response) => response.json())
        .then((data) => {
          placename.push(data.result.name);
          console.log(placename);

        })


        function deleteMarker(ct) {
          markerlist[ct].setMap(null);
          markerlist.splice(ct,1);
          test1.splice(ct,1);
          placename.splice(ct,1);
      
          const planList = document.getElementById("plan");
          const listItems = planList.getElementsByTagName("li");
          if(planList.childElementCount == 1){
            while (planList.firstChild) {
              planList.removeChild(listItems[0]);
            }
            plannum = 0;
          }
          else{
            planList.removeChild(listItems[ct]);
          }
  
      }
  