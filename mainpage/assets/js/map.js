let geocoder;

function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: true
  });
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.749933, lng: -73.98633 },
      zoom: 13,
      mapTypeControl: false,
    });
    directionsRenderer.setMap(map);
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

    geocoder = new google.maps.Geocoder();

    //DB저장
    let test1 = [[]];
    let placename = [[]];
    let markerlist = [[]];    
    const wayps = []


    let a_marker = [];
    
    const i0 = document.getElementById("0");
    const i1 = document.getElementById("1");
    const i2 = document.getElementById("2");
    const i3 = document.getElementById("3");
    const i4 = document.getElementById("4");
    const i5 = document.getElementById("5");
    const i6 = document.getElementById("6");
    const i7 = document.getElementById("7");
    const i8 = document.getElementById("8");
    const placesList = document.getElementById("places");
    const dsee = document.getElementById("dsee");

    //검색창에 검색해서 나온 마커 클릭
    marker.addListener("click", () => {
      hm = marker.getPosition()
      console.log(`{lat: ${hm.lat()}, lan: ${hm.lng()}}`)
      photoBox = [];
      geocoder.geocode({ location: marker.getPosition() }, function (results, status) {
        if (status === "OK") {
            const place = results[0].place_id;

            qqq = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${place}&key=AIzaSyApouHIsecCqlOzmJPlCClAKgY9TSnVn1w`
            fetch(qqq).then((response) => response.json())
              .then((data) => {
                prevBtn.style.display = 'inline-block'
                nextBtn.style.display = 'inline-block'
                dsee.style.display = 'block'
                if(data.result.photos == undefined){
                  i0.src = "";
                }
                else{
                  for(photonum = 0; photonum < data.result.photos.length; photonum++){
                    photoBox.push(`https:maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=100&photo_reference=${data.result.photos[photonum].photo_reference}&key=AIzaSyApouHIsecCqlOzmJPlCClAKgY9TSnVn1w`)
                  }
                  i0.src = `https:maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=100&photo_reference=${data.result.photos[0].photo_reference}&key=AIzaSyApouHIsecCqlOzmJPlCClAKgY9TSnVn1w`;
                }
                i1.innerHTML = data.result.name;
                if(data.result.rating == undefined){
                  i2.innerHTML = "별점: X"
                }
                else
                  i2.innerHTML = `별점: ${data.result.rating}`;
                if(data.result.reviews == undefined){
                  i3.innerHTML = "";
                  i4.innerHTML = "";
                  i5.innerHTML = "";
                  i6.innerHTML = "";
                  i7.innerHTML = "";
                  i8.innerHTML = "";
                  i3.style.display = 'none'
                  i4.style.display = 'none'
                  i5.style.display = 'none'
                  i6.style.display = 'none'
                  i7.style.display = 'none'
                  i8.style.display = 'none'
                }
                else{
                  i3.style.display = 'block'
                  i4.style.display = 'block'
                  i5.style.display = 'block'
                  i6.style.display = 'block'
                  i7.style.display = 'block'
                  i8.style.display = 'block'
                  i3.innerHTML = `작성자: ${data.result.reviews[0].author_name}`;
                  i4.innerHTML = ` ${data.result.reviews[0].text}`;
                  i5.innerHTML = `작성자: ${data.result.reviews[1].author_name}`;
                  i6.innerHTML = ` ${data.result.reviews[1].text}`;
                  i7.innerHTML = `작성자: ${data.result.reviews[2].author_name}`;
                  i8.innerHTML = ` ${data.result.reviews[2].text}`;
                }

                
                
              })
        }
      });
  })
    const sb = document.getElementById("sortR");

    const addbutton = document.getElementById("add");
    addbutton.addEventListener('click', addMaker);
    pq = 0;
    ct = 0;
    plannum = 0;
    count = 0;
    let labelnum = 1;
    const checkbox = document.getElementById("Direction");
    const walkD = document.getElementById("Walk");
    const menuBox =document.getElementById("rightClickMenu");
    const menuItems = document.getElementsByClassName("item");
    const selectBox = document.getElementById("selectBox");
    selectBox.addEventListener("change", function() {
      changenum(selectBox)
      checkbox.checked = false;
      let event = new Event("change");
      checkbox.dispatchEvent(event);
      walkD.checked = false;
      walkD.dispatchEvent(event);
    })

    function changenum(num) {
      labelnum = num.value.replace("D", "");
      console.log(labelnum)
      let selectValue = selectBox.value;
      var planDiv = document.querySelector('.moreplan');
      var lisInPlan = planDiv.querySelectorAll('ul');
      lisInPlan.forEach(function(ul) {
        ul.classList.add("hidden");
      });

      var selectedUL = document.getElementById(selectValue);
      if (selectedUL) {
        selectedUL.classList.remove("hidden");
      }

      plannum = placename[labelnum - 1].length;
  
      countMaker = labelnum -1;
      if(countMaker > 6){
        countMaker = countMaker - 7
      }

    }


//우수리스크 역 추가43.80158   샌프란페어몬트 {lat: 37.7923897, lan: -122.4104443}, 오클랜드한인교회{lat: 37.79569000000001, lan: -122.2489952}
// 상한한인 {lat: 37.7615248, lan: -122.4173683}, 페리빌딩{lat: 37.7954425, lan: -122.3936136}, 위안부동상{lat: 37.79204180000001, lan: -122.4052396} 
//골든브릿지{lat: 37.8199109, lan: -122.4785598}, 상하이교회{lat: 31.233275, lng: 121.475868}, 상하이도서관{lat: 31.207374, lan: 121.444766}
//상하이학교{lat: 31.044013, lng: 121.233905}, 징안공원{lat: 31.22154879999999, lan: 121.4460741}
const histroy = [ {lat: 31.044013, lng: 121.233905},{lat: 31.233275, lng: 121.475868},{lat: 37.79204180000001, lng: -122.4052396},{lat: 31.22154879999999, lng: 121.4460741},{lat: 31.044013, lng: 121.233905},{lat: 31.207374, lng: 121.444766},{lat: 31.233275, lng: 121.475868},
  {lat: 37.8199109, lng: -122.4785598}, {lat: 37.79204180000001, lng: -122.4052396}, 
  {lat: 37.7954425, lng: -122.3936136}, {lat: 37.7615248, lng: -122.4173683}, {lat: 37.79569000000001, lng: -122.2489952}, 
  {lat: 37.7923897, lng: -122.4104443}, { lat: 	37.76123, lng: -122.49491},{ lat: 43.80158, lng: 131.98083},
  { lat: 45.76210985281581, lng: 126.6337034100921},
        { lat: 31.241438, lng: 121.490814},{ lat: 25.033097004094394, lng: 121.5270371401177},{ lat: 43.134967, lng: 131.895384},
        { lat: 43.79157313603113, lng: 131.94513130207125},{ lat: 55.724929, lng: 37.554110},{ lat: 55.835413, lng: 37.635160},
        { lat: 45.463283028577614, lng: 9.191168241826672},{ lat: 48.91132132496467, lng: 2.230127055204047},
        { lat: 19.406669156628244, lng: -99.20352081880564},{ lat: 34.20408604229037, lng: 129.28616672209066},
        { lat: 32.77274501938534, lng: 129.86347675922565},{ lat: 33.59317493002938, lng: 130.4104617426811},
        { lat: 34.39466873726077, lng: 132.4519907537671},{ lat: 34.815646517182905, lng: 135.66073194997742},
        { lat: 34.99183453529833, lng: 135.77215016053253},{ lat: 35.71476976050975, lng: 139.6622186498341},
        { lat: 35.6741945522342, lng: 139.75603383011753},
        {lat: 38.78818868867804, lng: 141.09152646627183},{ lat: 39.76587231960352, lng: 140.69640833658394},
           { lat: 36.759638, lng: 127.307461},{ lat: 37.5445535, lng: 126.9594821},{ lat: 36.7812042, lng: 127.2264822},
           { lat: 36.6875548, lng: 126.6515994},{ lat: 37.5527571, lng: 127.001864},{ lat: 36.4566357, lng: 126.617257},
           { lat: 36.951645, lng: 126.7716941},{ lat: 37.5446683, lng: 126.9605573},{ lat: 37.477299, lng: 127.180813},
           { lat: 36.7389836, lng: 128.8629974},{ lat: 35.0280311, lng: 126.726283},{ lat: 36.4566357, lng: 126.617257},
           { lat: 36.6809007, lng: 128.1364494},{ lat: 34.9586306, lng: 127.1950182},{ lat: 37.5669022, lng: 126.9751381},
           { lat: 37.7440259, lng: 127.5706512},{ lat: 38.89443266752845, lng: -77.04074518377136},
           { lat: 37.672870661740426, lng: -122.45617585286303},{ lat: 36.57966663822704, lng: -119.45787941725565},
           { lat: 30.43601538565954, lng: -84.27596362362084},
           { lat: 42.26257654654356, lng: -71.79598510480852},{ lat: 40.07020042050363, lng: -75.08772741939013},
           { lat: 15.281066561210816, lng: 145.8045579010042},{ lat: 21.3135330382944, lng: -157.84274943815944},
           { lat: 34.68439, lng: 135.52722},{ lat: 34.6842971, lng: 135.5263235},
           {lat: 34.650661, lng: 135.51196},{ lat: 34.68829, lng: 135.53371},
           { lat: 34.69358, lng: 135.50392},{ lat: 34.61473, lng: 135.73418},
           { lat: 34.66261, lng: 135.70121},{ lat: 35.66788, lng: 139.60556},
           { lat: 35.6709322, lng: 139.6050668},{lat: 35.6623119, lng: 139.6111442},
           { lat: 35.71451, lng: 139.66201},{ lat: 35.70782, lng: 139.71626},
           { lat: 35.63664, lng: 139.69692},{ lat: 35.68003, lng: 139.73793},
           { lat: 35.67362, lng: 139.75588},{ lat: 35.68025, lng: 139.75358},
           { lat: 31.19503, lng: 121.41069},{ lat: 31.24144, lng: 121.49082},
           { lat: 30.75334, lng: 120.74630},{ lat: 30.38042, lng: 120.86440},
           { lat: 30.22933, lng: 120.13065},{ lat: 40.72302, lng: -73.89927},
           { lat: 42.26230, lng: -71.79597},{ lat: 38.89408, lng: -77.04051},
           { lat: 38.91037499999999, lng: -77.0298336},{ lat: 43.79172, lng: 131.94514},{ lat: 43.81264, lng: 131.93067}] 
   /*   const histroy = [{ lat: 34.68439, lng: 135.52722},{ lat: 34.6842971, lng: 135.5263235},
        {lat: 34.650661, lng: 135.51196},{ lat: 34.68829, lng: 135.53371},
        { lat: 34.69358, lng: 135.50392},{ lat: 34.61473, lng: 135.73418},
        { lat: 34.66261, lng: 135.70121},{ lat: 35.66788, lng: 139.60556},
        { lat: 35.6709322, lng: 139.6050668},{lat: 35.6623119, lng: 139.6111442},
        { lat: 35.71451, lng: 139.66201},{ lat: 35.70782, lng: 139.71626},
        { lat: 35.63664, lng: 139.69692},{ lat: 35.68003, lng: 139.73793},
        { lat: 35.67362, lng: 139.75588},{ lat: 35.68025, lng: 139.75358},
        { lat: 31.19503, lng: 121.41069},{ lat: 31.24144, lng: 121.49082},
        { lat: 30.75334, lng: 120.74630},{ lat: 30.38042, lng: 120.86440},
        { lat: 30.22933, lng: 120.13065},{ lat: 40.72302, lng: -73.89927},
        { lat: 42.26230, lng: -71.79597},{ lat: 38.89408, lng: -77.04051},
        { lat: 38.91037499999999, lng: -77.0298336},{ lat: 43.79172, lng: 131.94514},{ lat: 43.81264, lng: 131.93067}]*/
           
      let countcount = 0;
      const naemcheck = document.getElementById('praa');
      naemcheck.addEventListener("click", checkname);
    function checkname() {
      console.log(countcount)
      console.log(histroy[countcount])
      hm = histroy[countcount];
      addMaker();
      countcount = countcount + 1;
    }

    const btn = document.getElementById('qwe');
    btn.addEventListener('click', qweqwe)

   // const qweras = [{ lat: 35.68025, lng: 139.75358}, { lat: 35.67362, lng: 139.75588},{ lat: 35.63664, lng: 139.69692}, { lat: 35.70782, lng: 139.71626}]
     function qweqwe() {
    /*  for(let i =0; i<4; i++){
        hm = qweras[i];
        addMaker();
        addplan();
        labelnum = labelnum + 1;
      } */
    hm = { lat: 35.68025, lng: 139.75358}
    addMaker2();
    addplan();
    labelnum = labelnum + 1;
    //selectBox.value = 'D2';
    hm = { lat: 35.67362, lng: 139.75588}
     addMaker2();
    addplan();

    labelnum = labelnum + 1;
    hm = { lat: 35.63664, lng: 139.69692}
     addMaker2();
    addplan();

    labelnum = labelnum + 1;
    hm = { lat: 35.70782, lng: 139.71626}
    addMaker2();
    //addplan();
    console.log(selectBox.value)
    console.log(labelnum)

    hardnum = 0;
    if(hardnum == 0){
      window.addEventListener('click', resetnum)
    }

    function resetnum(){
      labelnum = 1;
      window.removeEventListener('click', resetnum)
    }
  }

    var rainbowColors = ["#FFC0CB", "#FFA500", "#FFFF00", "#90EE90", "#ADD8E6", "#a151da", "#9370DB"];
    let countMaker = 0;
    labelcount = 0;

    function addMaker2() {
      checkbox.checked = false;
      let event = new Event("change");
      checkbox.dispatchEvent(event);
        const myLatLng =  hm;
        console.log(myLatLng)
        test1[labelnum - 1].push(hm);
    
        const mk = new google.maps.Marker({
            position: myLatLng,
            label: `${labelnum}`,
            map,
            icon: {
              path: "M8,0C3.58,0,0,3.58,0,8c0,5.02,8,15.53,8,15.53s8-10.51,8-15.53C16,3.58,12.42,0,8,0z",
              fillColor: rainbowColors[countMaker],
              fillOpacity: 1,
              strokeColor: "#FFFFFF",
              strokeWeight: 2,
              scale: 1.5,
              labelOrigin: new google.maps.Point(8, 8),
              anchor: new google.maps.Point(8, 18)
            },
          });
          markerlist[labelnum - 1].push(mk);
    
        
          const planList = document.getElementById("D" + labelnum);
          const nameli = document.createElement("li");
    
    
          geocoder.geocode({ location: hm }, function (results, status) {
            if (status === "OK") {
                const place = results[0].place_id;
                fetchData(place);
    
            }
            async function fetchData(res) {
              try{
    
                qqq = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${res}&key=AIzaSyApouHIsecCqlOzmJPlCClAKgY9TSnVn1w`
                const response = await fetch(qqq);
                const data = await response.json();
                placename[labelnum - 1].push(data.result.name);
    
    
                nameli.textContent = placename[labelnum - 1][plannum];
                planList.appendChild(nameli);
                plannum = plannum + 1;      
              nameli.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                menuBox.style.display="block";
                menuBox.style.top=e.pageY+"px";
                menuBox.style.left=e.pageX+"px";
                count = 0;

              
              })

    
    
              nameli.addEventListener("click", () => {
                map.setCenter(test1[labelnum - 1][0]);
                information(test1[labelnum - 1][0]);
                hm = test1[labelnum-1][0]
                
              });
              labelcount = labelcount + 1;
      
                //nameli.addEventListener("contextmenu", popMenu);
                document.body.addEventListener("click",onBodyClick);
        
      
                function onBodyClick(){
                  hideMenu();
              }
              function hideMenu() {
                  menuBox.style.display="none";
              }
    
    
      //marker.getPosition()
                mk.addListener("click", () => {
                  information(mk.getPosition());
      
              })
              }catch (error){
                console.error("Error fetching data:", error);
              }
    
              let placenamedb = document.getElementById("placenamedb");
              let arrayHandler1 = {
                set: function (target, property, value) {
                  target[property] = value;
                  displayArrayInInput1();
                  return true;
                }
              }; //O
            
              placename = new Proxy(placename, arrayHandler1);
            
              function displayArrayInInput1() {
                placenamedb.value = JSON.stringify(placename); // 배열을 JSON 문자열로 변환하여 입력 필드에 표시
              } //O
              placename.push([]);
              placename.pop();
          
            }
          });
          
          test1.push([]);
          test1.pop();
    }

    function addMaker() {
      checkbox.checked = false;
      let event = new Event("change");
      checkbox.dispatchEvent(event);
        const myLatLng =  hm;
        console.log(myLatLng)
        test1[labelnum - 1].push(hm);
    
        const mk = new google.maps.Marker({
            position: myLatLng,
            label: `${labelnum}`,
            map,
            icon: {
              path: "M8,0C3.58,0,0,3.58,0,8c0,5.02,8,15.53,8,15.53s8-10.51,8-15.53C16,3.58,12.42,0,8,0z",
              fillColor: rainbowColors[countMaker],
              fillOpacity: 1,
              strokeColor: "#FFFFFF",
              strokeWeight: 2,
              scale: 1.5,
              labelOrigin: new google.maps.Point(8, 8),
              anchor: new google.maps.Point(8, 18)
            },
          });
          markerlist[labelnum - 1].push(mk);
    
        
          const planList = document.getElementById("D" + labelnum);
          const nameli = document.createElement("li");
    
    
          geocoder.geocode({ location: hm }, function (results, status) {
            if (status === "OK") {
                const place = results[0].place_id;
                fetchData(place);
    
            }
            async function fetchData(res) {
              try{
    
    
                qqq = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${res}&key=AIzaSyApouHIsecCqlOzmJPlCClAKgY9TSnVn1w`
                const response = await fetch(qqq);
                const data = await response.json();
                console.log('label = ' +labelnum)
                console.log(data.result.name)
                placename[labelnum - 1].push(data.result.name);
    
    
                nameli.textContent = placename[labelnum - 1][plannum];
                planList.appendChild(nameli);
                plannum = plannum + 1;
                
      
              nameli.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                menuBox.style.display="block";
                menuBox.style.top=e.pageY+"px";
                menuBox.style.left=e.pageX+"px";
                count = 0;
      
                for( pq = 0; pq<placename[labelnum - 1].length; pq++){
                  if(placename[labelnum - 1][pq] == nameli.textContent){
                    ct = pq;
                  }
                }         
              })
    
      
    
    
              nameli.addEventListener("click", () => {
                console.log(nameli.textContent)
                for( pq = 0; pq<placename[labelnum - 1].length; pq++){
                  if(placename[labelnum - 1][pq] == nameli.textContent){
                    ct = pq;
                  }
                }
                map.setCenter(test1[labelnum - 1][ct]);
                information(test1[labelnum - 1][ct]);
                hm = test1[labelnum-1][ct]
                
    
              });
      
                //nameli.addEventListener("contextmenu", popMenu);
                document.body.addEventListener("click",onBodyClick);
        
      
                function onBodyClick(){
                  hideMenu();
              }
              function hideMenu() {
                  menuBox.style.display="none";
              }
    
    
      //marker.getPosition()
                mk.addListener("click", () => {
                  information(mk.getPosition());
      
              })
              }catch (error){
                console.error("Error fetching data:", error);
              }
    
              let placenamedb = document.getElementById("placenamedb");
              let arrayHandler1 = {
                set: function (target, property, value) {
                  target[property] = value;
                  displayArrayInInput1();
                  return true;
                }
              }; //O
            
              placename = new Proxy(placename, arrayHandler1);
            
              function displayArrayInInput1() {
                placenamedb.value = JSON.stringify(placename); // 배열을 JSON 문자열로 변환하여 입력 필드에 표시
              } //O
              placename.push([]);
              placename.pop();
          
            }
          });
          
          test1.push([]);
          test1.pop();
    }

    while(count < 1){
      menuItems[0].addEventListener("click", () => {
        restaurantMarker(test1[labelnum - 1][ct]);
      });

      menuItems[1].addEventListener("click", () => {
        parkMarker(test1[labelnum - 1][ct]);
      });

      menuItems[2].addEventListener("click", () => {
        resetMarker(test1[labelnum - 1][ct]);
        resetMarker(test1[labelnum - 1][ct]);
      });
      menuItems[3].addEventListener("click", () => {
        deleteMarker(ct);
      })
      count = count + 1;
    }

    let photoBox = [];
    let currentImageIndex = 0;
    let displayedImage = document.getElementById("0");
    let prevBtn = document.getElementById("prevBtn");
    let nextBtn = document.getElementById("nextBtn");


    prevBtn.addEventListener("click", prevImage);
    nextBtn.addEventListener("click", nextImage);

    function prevImage() {
      currentImageIndex = (currentImageIndex - 1 + photoBox.length) % photoBox.length;
      showImage(currentImageIndex);
    }
    
    function nextImage() {
      currentImageIndex = (currentImageIndex + 1) % photoBox.length;
      showImage(currentImageIndex);
    }
      function showImage(index) {
        displayedImage.src = photoBox[index];
      }

    function information(rq){
      photoBox = [];
      geocoder.geocode({ location: rq }, function (results, status) {
        if (status === "OK") {
            const place0 = results[0].place_id;
            imf0 = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${place0}&key=AIzaSyApouHIsecCqlOzmJPlCClAKgY9TSnVn1w`
            fetch(imf0).then((response) => response.json())
              .then((data) => {
                prevBtn.style.display = 'inline-block'
                nextBtn.style.display = 'inline-block'
                dsee.style.display = 'block'
                if(data.result.photos == undefined){
                  i0.src = "";
                }
                else{
                  for(photonum = 0; photonum < data.result.photos.length; photonum++){
                    photoBox.push(`https:maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=100&photo_reference=${data.result.photos[photonum].photo_reference}&key=AIzaSyApouHIsecCqlOzmJPlCClAKgY9TSnVn1w`)
                  }
                  i0.src = `https:maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=100&photo_reference=${data.result.photos[0].photo_reference}&key=AIzaSyApouHIsecCqlOzmJPlCClAKgY9TSnVn1w`;
                }
                i1.innerHTML = data.result.name;
                if(data.result.rating == undefined){
                  i2.innerHTML = "별점: X"
                }
                else
                  i2.innerHTML = `별점: ${data.result.rating}`;
                if(data.result.reviews == undefined){
                  i3.innerHTML = "";
                  i4.innerHTML = "";
                  i5.innerHTML = "";
                  i6.innerHTML = "";
                  i7.innerHTML = "";
                  i8.innerHTML = "";
                  i3.style.display = 'none'
                  i4.style.display = 'none'
                  i5.style.display = 'none'
                  i6.style.display = 'none'
                  i7.style.display = 'none'
                  i8.style.display = 'none'
                }
                else{
                  i3.style.display = 'block'
                  i4.style.display = 'block'
                  i5.style.display = 'block'
                  i6.style.display = 'block'
                  i7.style.display = 'block'
                  i8.style.display = 'block'
                  i3.innerHTML = `작성자: ${data.result.reviews[0].author_name}`;
                  i4.innerHTML = ` ${data.result.reviews[0].text}`;
                  i5.innerHTML = `작성자: ${data.result.reviews[1].author_name}`;
                  i6.innerHTML = ` ${data.result.reviews[1].text}`;
                  i7.innerHTML = `작성자: ${data.result.reviews[2].author_name}`;
                  i8.innerHTML = ` ${data.result.reviews[2].text}`;
                }
              })
        }})
    }

    
    function deleteMarker(ct) {
      let event = new Event("change");
      checkbox.dispatchEvent(event);
      plannum = plannum - 1;

        markerlist[labelnum - 1][ct].setMap(null);
        markerlist[labelnum - 1].splice(ct,1);
        test1[labelnum - 1].splice(ct,1);
        placename[labelnum - 1].splice(ct,1);
    
        const planList = document.getElementById("D" + labelnum);
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
        i0.src = "";
        i1.innerHTML = "";
        i2.innerHTML = "";
        i3.innerHTML = "";
        i4.innerHTML = "";
        i5.innerHTML = "";
        i6.innerHTML = "";
        i7.innerHTML = "";
        i8.innerHTML = "";
        prevBtn.style.display = 'none'
        nextBtn.style.display = 'none'
        dsee.style.display = 'none'

        test1.push([]);
        test1.pop();
        placename.push([]);
        placename.pop();
    }

    const planbutton = document.getElementById("addplan");
    planbutton.addEventListener("click", addplan);
    let dayCounter = 2;

    function addplan() {
      const selectBox = document.getElementById("selectBox");
      const sidebar = document.getElementsByClassName("moreplan")[0];
 
    
      // 새로운 날짜를 생성하고 추가
      const option = document.createElement("option");
      option.text = "day" + dayCounter;
      option.value = "D" + dayCounter;
      
      selectBox.appendChild(option);
      const ul = document.createElement("ul");
      ul.setAttribute("id", "D" + dayCounter);
      ul.setAttribute("value", dayCounter);
      ul.classList.add("hidden");
      sidebar.appendChild(ul);

      dayCounter++; // 다음 날짜를 위해 카운터를 증가
      test1.push([]);
      markerlist.push([]);
      placename.push([]);
      wayps.push([]);

      countMaker = dayCounter -2;
    }


    const service = new google.maps.places.PlacesService(map);


    function parkMarker(pi) {
      sb.value = "default";
      change();
      changeim(a_marker);
      const pivot = pi;
      service.nearbySearch(
        { location: pivot, radius: 700, type: "park" },
        (results, status, pagination) => {
          if (status !== "OK" || !results) return;
    
          addPlaces(results, map, a_marker);
        },
      );

    }

    function resetMarker(pi){
      sb.value = "default";
      reverse();
      const pivot = pi;
      i0.src = "";
      i1.innerHTML = "";
      i2.innerHTML = "";
      i3.innerHTML = "";
      i4.innerHTML = "";
      i5.innerHTML = "";
      i6.innerHTML = "";
      i7.innerHTML = "";
      i8.innerHTML = "";
      prevBtn.style.display = 'none'
      nextBtn.style.display = 'none'
      dsee.style.display = 'none'
      service.nearbySearch(
        { location: pivot, radius: 1, type: "hospital" },
        (results, status, pagination) => {
          
    
          addPlaces(results, map, a_marker);
          changeim(a_marker);
        },
      );

      
    }
    
    function restaurantMarker(pi) {
      sb.value = "default";
      change();
      changeim(a_marker);
      const pivot = pi;
      service.nearbySearch(
        { location: pivot, radius: 700, type: "restaurant" },
        (results, status, pagination) => {
          if (status !== "OK" || !results) return;
    
          addPlaces(results, map, a_marker);
        },
      );
      
    }

    let dayNightButton = document.querySelector(".dayNightButton");
    let rbutton = document.querySelector(".resetbutton");
    function change() {
      if (dayNightButton.value === "night") {
          dayNightButton.value = "day";
      } else {
          dayNightButton.value = "night";
      }
  }
  function reverse() {
    if(rbutton.value === "true"){
      rbutton.value = 'false';
    }
    else{rbutton.value = "true"};
  }

  rnum = 0;
    function addPlaces(places, map, a_marker) {
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
            anymarker.addListener("click", () => {
              information(anymarker.getPosition());
            })
            li.addEventListener("click", () => {
              map.setCenter(place.geometry.location);
              information(place.geometry.location);
              hm = place.geometry.location;
              mk = anymarker;
    
            });
          }
        }
        rnum = a_marker.length;
        if(rbutton.value === false){
          for( iz = 0; iz < rnum; iz++ ){
            a_marker[0].setMap(null);
            a_marker.splice(0,1);
          }
        }

        sb.addEventListener("change", function() {
          while(placesList.firstChild){
            placesList.removeChild(placesList.firstChild);
          }
          changesort(sb)
      
        })
      
        function changesort(ch){
          if(ch.value == "num"){
            places.sort((a,b) => -a.rating + b.rating);
            for (const place of places) {
              if (place.geometry && place.geometry.location) {
                const li = document.createElement("li");
                li.textContent = place.name;
                placesList.appendChild(li);
                li.addEventListener("click", () => {
                  map.setCenter(place.geometry.location);
                  information(place.geometry.location);
                  
                });
              }
            }
          }
          else if(ch.value == "many"){
            places.sort((a,b) => -a.user_ratings_total + b.user_ratings_total);
            for (const place of places) {
              if (place.geometry && place.geometry.location) {
                const li = document.createElement("li");
                li.textContent = place.name;
                placesList.appendChild(li);
                li.addEventListener("click", () => {
                  map.setCenter(place.geometry.location);
                  information(place.geometry.location);
                              
                });
              }
            }
          }
          else{
            for (const place of places) {
              if (place.geometry && place.geometry.location) {
                const li = document.createElement("li");
                li.textContent = place.name;
                placesList.appendChild(li);
                li.addEventListener("click", () => {
                  map.setCenter(place.geometry.location);
                  information(place.geometry.location);
                              
                });
              }
            }
          }
        }
    }

    function changeim(a_marker) {
      let num = a_marker.length;
      change();
      if(dayNightButton.value ==="night"){
        for( ix = 0; ix < num; ix++){
          a_marker[0].setMap(null);
          a_marker.splice(0,1);
        }
    }
        while(placesList.firstChild){
          placesList.removeChild(placesList.firstChild);
        }
    }



    const displayDirection = function () {
      checkOnlyOne(this);
      calculateAndDisplayRoute(directionsService, directionsRenderer);

    };


    
    checkbox.addEventListener("change", displayDirection);
    function calculateAndDisplayRoute(directionsService, directionsRenderer) {
      last = test1[labelnum-1].length;
      for(z=1; z<last-1; z++){
        wayps[labelnum - 1].push({location: test1[labelnum - 1][z]})
      }
      if (checkbox.checked) {        
        directionsService
        .route({
          origin: {
            location: test1[labelnum - 1][0],
          },
          destination: {
            location: test1[labelnum - 1][last-1],
          },
          waypoints: wayps[labelnum - 1],
          travelMode: google.maps.TravelMode.DRIVING,
        })
        .then((response) => {
          directionsRenderer.setDirections(response);
        })
        .catch((e) => window.alert("Directions request failed due to " + status));
      } else {
        directionsRenderer.setDirections({routes: []});
      }
      wayps[labelnum - 1] = [];
    }

    const walkDirection = function () {
      checkOnlyOne(this);
      calculateAndDisplayRoute1(directionsService, directionsRenderer);

    };

    walkD.addEventListener("change", walkDirection);
    function calculateAndDisplayRoute1(directionsService, directionsRenderer) {
      last = test1[labelnum-1].length;


      for(z=1; z<last-1; z++){
        wayps[labelnum - 1].push({location: test1[labelnum - 1][z]})
      }
      if (walkD.checked) {        
        directionsService
        .route({
          origin: {
            location: test1[labelnum - 1][0],
          },
          destination: {
            location: test1[labelnum - 1][last-1],
          },
          waypoints: wayps[labelnum - 1],
          travelMode: google.maps.TravelMode.WALKING,
        })
        .then((response) => {
          directionsRenderer.setDirections(response);
        })
        .catch((e) => window.alert("Directions request failed due to " + status));
      } else {
        directionsRenderer.setDirections({routes: []});
      }
      wayps[labelnum - 1] = [];
    }
    function checkOnlyOne(checkbox) {
      var checkboxes = document.getElementsByName('option');
      checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false;
      });
    }

    let testdb = document.getElementById("testdb"); //O , HTML INPUT ID와 같아야함
      // Proxy 객체를 사용하여 배열 변경 감지
  let arrayHandler = {
    set: function (target, property, value) {
      target[property] = value;
      displayArrayInInput();
      return true;
    }
  }; //O



  function displayArrayInInput() {
    testdb.value = JSON.stringify(test1); // 배열을 JSON 문자열로 변환하여 입력 필드에 표시
  } //O

  test1 = new Proxy(test1, arrayHandler); //O
}



window.initMap = initMap;


