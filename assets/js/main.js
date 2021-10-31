// side bar menu

function openNav() {
  document.getElementById("Sidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("Sidenav").style.width = "0";
}

// main

 const elementStrings = {
    loader: 'loader'
};

 const renderLoader = () => {
    const loader = `
        <div class="${elementStrings.loader}">
         <img src="./img/loading1.png" alt="">
            
        </div>
    `;
    document.querySelector('#loading').insertAdjacentHTML('afterbegin', loader);
};

 const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};

document.querySelector('#searchForm').addEventListener('submit',(e)=>{
    e.preventDefault();
    const googlRes = document.querySelector('#resSea').value;
    document.querySelector('#movieRes').innerHTML = '';
    document.querySelector('#mapres').innerHTML = '';
    document.querySelector('#queryRes').innerHTML = '';
    renderLoader();

    fetch(`http://api.serpstack.com/search?access_key=e87670e9c0bc022606f2d69dd53ae725&query=${googlRes}`)
    .then(result =>{
        return result.json();
    })
    .then(data =>{
        console.log(data);
        clearLoader();
        data.organic_results.forEach(res => {
            const markup = `
            <div class="col-12  my-2" id="design">
            <p class="mb-n1">${res.displayed_url}</p>
            <a target="_blank" href="${res.url}"><h4 id="colors" >${res.title}</h4></a>
            <p>${res.snippet}</p>
            </div>
            `;
              document.querySelector('#movieRes').insertAdjacentHTML('beforeend',markup)
        });
        
        data.local_results.forEach(res0 => {
            const markup2 = `
                          <div class="col" >
                            <h5>${res0.title}</h5>
                            <address>${res0.address}</address>
                            <h6>Coordinates: Latitude - ${res0.coordinates.latitude}</h6>
                            <h6>Ratings : ${res0.rating}</h6>
                            <h6>Reviews : ${res0.reviews}</h6>
                           </div>
            `;
              document.querySelector('#mapres').insertAdjacentHTML('beforeend',markup2)
        });

        data.related_searches.forEach(res1 => {
            const markup1 = ` 
                  <li class="list-group-item col-5 mb-4 text-dark rounded-pill"><a href="${res1.url}">${res1.query}</a></li>     
            `;
              document.querySelector('#queryRes').insertAdjacentHTML('beforeend',markup1)
        });

    })
    .catch(error =>{
        console.log(error);
    })
});


// change theme

function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}