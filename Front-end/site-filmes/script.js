const body = document.querySelector('body');
const btnTheme = document.querySelector('.btn-theme');
const input = document.querySelector('input');

const movies = document.querySelector('.movies');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

const highlightInfo = document.querySelector('.highlight__info');
const highlight_title = document.querySelector('.highlight__title');
const video_link = document.querySelector('.highlight__video-link');
const video_img = document.querySelector('.highlight__video');
const highlight_rating = document.querySelector('.highlight__rating');
const highlight_genres = document.querySelector('.highlight__genres');
const highlight_launch = document.querySelector('.highlight__launch');
const highlight_description = document.querySelector('.highlight__description');

const modal = document.querySelector('.modal');
const modal_title = document.querySelector('.modal__title');
const modal_img = document.querySelector('.modal__img');
const modal_description = document.querySelector('.modal__description');
const modal_average = document.querySelector('.modal__average');
const modal_genres = document.querySelector('.modal__genres');

//Inserindo fimes pre-definidos no carrossel
defaultMovies()
movies.children[0].remove();

//pesquisando filmes
input.addEventListener('keydown', (event)=> { 
  if (event.code !== 'Enter') return;
  btnPrev.classList.remove('hidden')
  btnNext.classList.remove('hidden')
  if (input.value === '') {
    removeMovies(); 
    defaultMovies();
    return;
  }
  const query = input.value; 
  
  const promiseSearch = fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${query}`)
  promiseSearch.then(async response =>{
    const movieSearch = await response.json(); 
    
    removeMovies(); 
    insertMovies(movieSearch.results)
    
    const moviesChildren = [...movies.children]; 
    
    
    if (moviesChildren.length === 0) { 
      const movieNotFound = document.createElement('span');
      movieNotFound.textContent = "Sinto muito, não foi encontrado nenhum filme com esse título! :("
      movieNotFound.style.color = "var(--preto)"
      btnPrev.classList.add('hidden')
      btnNext.classList.add('hidden')
      
      movies.append(movieNotFound);

    } else if (moviesChildren.length <= 5) { 
      btnPrev.classList.add('hidden')
      btnNext.classList.add('hidden')
    }

    moviesChildren.forEach((movie, index )=> { 
      
      movie.addEventListener('click', ()=> { 
        modal.classList.remove('hidden');
        createModal(movieSearch.results, index);
      })
      
      modal.addEventListener('click', ()=> { 
        modal.classList.add('hidden');
        modal_img.addEventListener('click', (event)=> { 
          event.stopPropagation();
        })
      })  
    })
  })

  input.value ='';
})


//Alterando tema 
btnTheme.addEventListener('click', ()=> { 
  highlightInfo.classList.toggle('background_color_gray')
  btnTheme.src = btnTheme.src.includes('light-mode')? "./assets/dark-mode.svg" : "./assets/light-mode.svg"
  body.style.setProperty('--branco', body.style.getPropertyValue('--branco') === '#242424' ? "rgba(255, 255, 255, 0.801)" : "#242424" )
  body.style.setProperty('--preto', body.style.getPropertyValue('--preto') === 'rgba(255, 255, 255, 0.801)' ? "#000" : "rgba(255, 255, 255, 0.801)")
  btnNext.classList.toggle('btn-claro')
  btnPrev.classList.toggle('btn-claro')
})


let click = 0; 
btnNext.addEventListener('click', ()=> {
  click++;
  if(click === 4) { 
    click = 0 
  } 
  changePage(click);
})

btnPrev.addEventListener('click', ()=> {
  click--;
  if (click === -1) { 
    click = 3;
  }      
  changePage(click);
})

//Inserindo highlight
const promiseInformation = fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR`)
promiseInformation.then(async response => { 
  const movieInfo = await response.json(); 
  insertMovieHighlight(movieInfo);
})


//Funções auxiliares daqui pra baixo!!!!
function changePage(click) {
  let inicio = click*5; 
  const moviesChildren = [...movies.children];
  moviesChildren.forEach((movie, index)=> {
    if(index >= inicio && index < inicio+5) { 
      movie.classList.remove('hidden'); 
    } else {
      movie.classList.add('hidden'); 
    }
  })
}  
function defaultMovies() {  
  const promiseMovies = fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false')
  promiseMovies.then( async (resultado) => { 
    const resultadoJson = await resultado.json(); 
    const moviesData = resultadoJson.results;
    
    insertMovies(moviesData);
    
    const moviesChildren = [...movies.children]; 
    moviesChildren.forEach((movie, index )=> { 
  
      movie.addEventListener('click', ()=> { 
        modal.classList.remove('hidden');
        createModal(moviesData, index);
      })
      
      modal.addEventListener('click', ()=> { 
        modal.classList.add('hidden');
        modal_img.addEventListener('click', (event)=> { 
          event.stopPropagation();
        })
      })  
    })
  })
}

async function createModal(movie, index) {
  modal_title.textContent = movie[index].title;
  modal_img.src = movie[index].backdrop_path;
  modal_description.textContent = movie[index].overview;
  modal_average.textContent = movie[index].vote_average;

  await setMovieGenres(movie[index].id);

}

function insertMovies(moviesData) {
  moviesData.forEach((filme, index)=> {    
    
    const movie = document.createElement('div'); 
    movie.classList.add('movie', 'hidden');
    movie.style.backgroundImage = `url(${filme.poster_path})`;
    
    const movieTitle = document.createElement('span');
    movieTitle.classList.add('movie__title');
    movieTitle.textContent = filme.title;
    
    const movieInfo = document.createElement('div');
    movieInfo.classList.add('movie__info', 'flex-row', 'space-between');
    
    const ratingStar = document.createElement('img');
    ratingStar.src = './assets/estrela.svg';
    ratingStar.alt = 'Estrela';
    
    const ratingScore = document.createElement('span');
    ratingScore.classList.add('movie__rating');
    ratingScore.textContent = filme.vote_average;
    
    ratingScore.append(ratingStar);
    movieInfo.append(movieTitle, ratingScore)
    movie.append(movieInfo);
    movies.append(movie);
    
    if (index >= 0 && index < 5) { 
      movie.classList.remove('hidden');
    };
  })
}

function removeMovies() {
  const moviesChildren = [...movies.children]; 
  moviesChildren.map(movie => movie.remove())
}

function insertMovieHighlight(movieInfo) {
  const imgUrl = movieInfo.backdrop_path;
  video_img.style.backgroundImage = `url(${imgUrl})`;
  
  const movieTitle = movieInfo.title; 
  highlight_title.textContent = movieTitle; 
  
  const movieRating = movieInfo.vote_average;
  highlight_rating.textContent = movieRating;
  
  const movieLaunch = movieInfo.release_date;
  highlight_launch.textContent = movieLaunch;
  
  movieGenres = movieInfo.genres.map(genre => genre.name);
  highlight_genres.textContent = (movieGenres.join(', ')).toUpperCase() 
  
  const movieDescription = movieInfo.overview;
  highlight_description.textContent = movieDescription; 
  
  const promiseVideo = fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR`)
  promiseVideo.then(async response =>{
    const body = await response.json(); 
    const videoUrl = body.results[0].key; 
    video_link.href = `https://www.youtube.com/watch?v=${videoUrl}`
  })
}

async function setMovieGenres(id) {
  const promiseMovieData = await fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${id}?language=pt-BR`)
  const movieData = await promiseMovieData.json();
  const genres =  movieData.genres;
  const genres_text = document.querySelectorAll('.modal__genres-text');
  
  genres_text.forEach(genre => {
    genre.remove();
  })
  
  for (let i=0; i < genres.length; i++) { 
    const genre = document.createElement('p');
    genre.classList.add('modal__genres-text');
    genre.textContent = genres[i].name;
    modal_genres.append(genre);
  }
}