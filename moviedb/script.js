let page = 1;
let prevLayout;
let isClicked = false;
let moviesList = Array();
let pesquisa;

const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=`;
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const mainDiv = document.getElementById("container");

document.getElementById("btn-page").addEventListener("click", () => {
  page = document.getElementById("pageNumber").value;
  if(page<1 || page>500){
    window.alert("Digite um valor entre 1 e 500");
  }else{
    apiCall();
  }
})

document.getElementById("search-btn").addEventListener("click", () => {
  pesquisa = document.getElementById("pesquisa").value;
  if(pesquisa != null)
    searchCall();
})

function apiCall(){
  mainDiv.innerHTML = ''
  moviesList = []
  fetch(url+page)
    .then((resp) => resp.json())
    .then(function(data) {
        let results = data.results;
        results.forEach(movie => {
          moviesList[movie.id] = movie
          listMovies(movie)
        });
    })
    .catch(function(error) {
        console.log(error);
    });
}

apiCall();

function searchCall(){
  mainDiv.innerHTML = ''
  moviesList = []
  fetch(SEARCHAPI+pesquisa)
    .then((resp) => resp.json())
    .then(function(data) {
        let results = data.results;
        results.forEach(movie => {
          moviesList[movie.id] = movie
          listMovies(movie)
        });
    })
    .catch(function(error) {
        console.log(error);
    });
}

function showDetails(id) {
  if(!isClicked){
    let filme = document.getElementById(id);
    filme.classList.add("extended");

    let filmeAtual = moviesList[id]
  
    prevLayout = filme.innerHTML;
    filme.innerHTML += `<p style="text-align: center; margin: 10px 5px; font-size: 20px">${filmeAtual['title']}</p>
                        <p style="margin-bottom: 10px">Lançamento: ${dateFormat(filmeAtual['release_date'])}</p>`

    if(filmeAtual['vote_average'] != 0){
      filme.innerHTML += `<p style="margin-bottom: 10px">Nota: ${filmeAtual['vote_average'].toFixed(1)}</p>`
      filme.innerHTML += `<p>Avaliações: ${filmeAtual['vote_count']}</p>`
    }

    isClicked = true;
  }  
}

function dismissDetails(id) {

  isClicked = false;
  
  if(prevLayout != undefined){
    document.getElementById(id).classList.remove("extended");
    let filme = document.getElementById(id);
    filme.innerHTML = prevLayout;
    prevLayout = undefined
  } 
}

function listMovies(movie) {
  let imgSource = IMGPATH + movie.poster_path;
  if(imgSource == 'https://image.tmdb.org/t/p/w1280null'){
    imgSource = 'http://www.protec.com.br/app/webroot/img/fonto-indisponivel.png'
  }

  let div = `<div class="filme" id="${movie.id}" onmousedown="showDetails(${movie.id})" onmouseout="dismissDetails(${movie.id})">
              <h3 class="title">${movie.title}</h3>
              <img src='${imgSource}' height='300px' width='200px'>
            </div>`;
  
  mainDiv.innerHTML += div;
}

function addZero(numero){
  if (numero <= 9) 
      return "0" + numero;
  else
      return numero; 
}

function dateFormat(date){
  if(date === undefined){
    return 'Em breve';
  }else{
    let dataAtual = new Date(date)
    let dataAtualFormatada = (addZero((dataAtual.getDate()+1).toString()) + "/" + (addZero(dataAtual.getMonth()+1).toString()) + "/" + dataAtual.getFullYear());
    
    return dataAtualFormatada;
  }
}