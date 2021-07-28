let page = 1;
let totalPages;
let currentPage = 1;
let prevLayout = '';
let isSearching = false;
let moviesList = Array();
let pesquisa;

const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=`;
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
let SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${pesquisa}&page=${currentPage}`;

const mainDiv = document.getElementById("movies");

document.getElementById("btn-page").addEventListener("click", () => {
  if(!isSearching){
    page = document.getElementById("pageNumber").value;

    if(page<1 || page>500)
      window.alert("Digite um valor entre 1 e 500");
    else
      apiCall();

  }else{
    if(document.getElementById("pageNumber").value  < 1 || document.getElementById("pageNumber").value > 24){
      window.alert(`Digite um valor entre 1 e ${totalPages}`)
    }
    else{
      currentPage = document.getElementById("pageNumber").value;
      searchCall()
    }
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
  SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${pesquisa}&page=${currentPage}`;  
  isSearching = true;

  mainDiv.innerHTML = ''
  moviesList = []
  fetch(SEARCHAPI)
    .then((resp) => resp.json())
    .then(function(data) {
        let results = data.results;
        results.forEach(movie => {
          moviesList[movie.id] = movie
          listMovies(movie)
        });
        
        totalPages = data['total_pages'];
        document.getElementById('txtPages').innerHTML = `Página ${data['page']} de ${totalPages}`

    })
    .catch(function(error) {
        console.log(error);
    });
}

function showBack(id){
  document.getElementById('card-'+id).classList.toggle('flip')
  let div = document.getElementById('card-'+id);
  console.log(prevLayout.innerHTML)

  if(prevLayout == ''){
    prevLayout = div.innerHTML;
    console.log(prevLayout.innerHTML);
    
    div.innerHTML =
    `
    <div class="back" id="back-${id}">
      <p style="margin: 10px 5px 15px 5px; font-size: 20px">${moviesList[id].title}</p>
      <p style="margin-bottom: 10px; text-align:justify;" class="overview">Sinopse: ${moviesList[id].overview}</p>`
    let teste = document.getElementById('back-'+id);

    moviesList[id].release_date != '' ? teste.innerHTML += `
      <p style="margin-bottom: 10px">Lançamento: ${dateFormat(moviesList[id].release_date)}</p>` : null;

    if(moviesList[id].vote_average != 0){
      teste.innerHTML += `<p style="margin-bottom: 10px">Nota: ${moviesList[id].vote_average.toFixed(1)}</p>`;
      teste.innerHTML += `<p>Avaliações: ${moviesList[id].vote_count}</p>`;
    }

    document.getElementById('back-'+id).style.backgroundColor = 'rgb(3, 9, 44)';
    console.log(prevLayout.innerHTML)
  }else{
    console.log(prevLayout.innerHTML)
    div.innerHTML = prevLayout
    console.log(div)
    prevLayout = ''
  }

}

function showFront(id){
  if(prevLayout != ''){
    document.getElementById('card-'+id).innerHTML = prevLayout;
    document.getElementById('card-'+id).classList.toggle('flip')
    prevLayout = ''
  }
}

function listMovies(movie) {
  let imgSource = IMGPATH + movie.poster_path;
  if(imgSource == 'https://image.tmdb.org/t/p/w1280null'){
    imgSource = 'http://www.protec.com.br/app/webroot/img/fonto-indisponivel.png'
  }

  let div = `
            <div class="card" id="card-${movie.id}" onmousedown="showBack(${movie.id})" onmouseleave="showFront(${movie.id})">
              <div class="filme front" id="${movie.id}">
                <h3 class="title">${movie.title}</h3>
                <img src='${imgSource}' height='300px' width='200px'>
              </div>
            </div>
            `;
  
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