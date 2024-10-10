let geocoder;
fetch('/get-post-data')  // 데이터를 가져오는 비동기 작업
  .then(response => response.json())
  .then(data => {
    let post = data;

    let testGET = post.test1;
    let jsonArray = JSON.parse(testGET);
    let test1 = jsonArray.map(innerArray => innerArray.map(obj => ({ lat: obj.lat, lng: obj.lng })));

    let placenameGET = post.placename1;
    let jsonArray1 = JSON.parse(placenameGET);
    let placename1 = jsonArray1.map(innerArray => innerArray.map(str => str.replace(/\"/g, '')));

    // 이제 test1과 placename을 사용할 수 있음
    // initMap 함수 호출
    initMap(test1, placename1);
  })
  .catch(error => console.error('Error fetching data:', error));

  function initMap(test1, placename) {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: true
  });
 
  // let test11 = <%= JSON.stringify(test1) %>;
  // let placename11 = <%= JSON.stringify(placename1) %>;
  // fetch('/get-data')
  // .then(response => response.json())
  // .then(data => {
  //   let test12 = data.test12;
  //   let placename12 = data.placename12;

    // 이제 test12와 placename12를 사용할 수 있음
    // ... (지도 초기화 및 기타 작업)
  // })
  // .catch(error => console.error('Error fetching data:', error));
  // let testGET = post.test1;
  // let jsonArray = JSON.parse(testGET);
  // let test1 = jsonArray.map(innerArray => innerArray.map(obj => ({ lat: obj.lat, lng: obj.lng })));


  // let placenameGET = post.placename1;
  // let jsonArray1 = JSON.parse(placenameGET);
  // let placename = jsonArray1.map(innerArray => innerArray.map(str => str.replace(/\"/g, '')));
  let markerlist = [[]];    
  const wayps = []

  
    const map = new google.maps.Map(document.getElementById("map"), {
      center: test1[0][0],
      zoom: 13,
      mapTypeControl: false,
    });
    directionsRenderer.setMap(map);
  

    geocoder = new google.maps.Geocoder();



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
  
    let dayCounter = 2;
    pq = 0;
    ct = 0;
    plannum = 0;
    count = 0;
    let labelnum = 1;
    const checkbox = document.getElementById("Direction");
    const walkD = document.getElementById("Walk");
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

    }

    

    for (let i =0; i < test1.length; i++){
      placename.push([]);
      markerlist.push([]);
        if(i > 0){
        const selectBox = document.getElementById("selectBox");
        const sidebar = document.getElementsByClassName("moreplan")[0];
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
        }
      for(let j = 0;  j < test1[i].length; j ++)
      {
        const nameli = document.createElement("li");
        const planList = document.getElementById("D" + (i+1));
       // fetchData(test1[i][j],i,j)
        const mk = new google.maps.Marker({
          position: test1[i][j],
          label: `${i+1}`,
          map,
        });
        markerlist[i].push(mk);
        mk.addListener("click", () => {
          information(mk.getPosition());
        })

        nameli.textContent = placename[i][j];
        planList.appendChild(nameli);
        nameli.addEventListener("click", () => {
          for( pq = 0; pq<placename[labelnum - 1].length; pq++){
            if(placename[labelnum - 1][pq] == nameli.textContent){
              ct = pq;
            }
          }
          map.setCenter(test1[labelnum - 1][ct]);
          information(test1[labelnum - 1][ct]);
        })
      }
    }

    
   /* async function fetchData(rr,i,j){
      
      try {
        const results = await geocodePromise(rr);
        const place = results[0].place_id;
        await testData(place, i, j);
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    }
    async function geocodePromise(location) {
      return new Promise((resolve, reject) => {
        geocoder.geocode({ location }, (results, status) => {
          if (status === "OK") {
            resolve(results);
          } else {
            reject(new Error(`Geocoding failed with status: ${status}`));
          }
        });
      });
    }
    async function testData(res,i,j){
      try {
      const nameli = document.createElement("li");
      const planList = document.getElementById("D" + (i+1));

      qqq = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${res}&key=AIzaSyAXaYwwO82iGqPtEN2-PJi5tKFMwN5VFG4`
      const response = await fetch(qqq);
      const data = await response.json();
      placename[i].push(data.result.name);
      console.log(`i: ${i}, j: ${j}`)
      console.log(placename[i][j])
      console.log(nameli)
      nameli.textContent = placename[i][j];
      console.log(`i: ${i}, j: ${j}`)
      console.log(placename[i][j])
      console.log(nameli)
      planList.appendChild(nameli);
    } catch (error) {
      console.error('Error in testData:', error);
    }}
    */

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
            imf0 = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${place0}&key=AIzaSyAXaYwwO82iGqPtEN2-PJi5tKFMwN5VFG4`
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
                    photoBox.push(`https:maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=100&photo_reference=${data.result.photos[photonum].photo_reference}&key=AIzaSyAXaYwwO82iGqPtEN2-PJi5tKFMwN5VFG4`)
                  }
                  i0.src = `https:maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=100&photo_reference=${data.result.photos[0].photo_reference}&key=AIzaSyAXaYwwO82iGqPtEN2-PJi5tKFMwN5VFG4`;
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


  }

window.initMap = initMap;
