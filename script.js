const body = document.querySelector('body');

const movies = document.querySelector('.movies');
const setaDireita = document.querySelector('.btn-next');
const setaEsquerda = document.querySelector('.btn-prev');

const highlight__video = document.querySelector('.highlight__video');
const highlight__title = document.querySelector('.highlight__title');
const highlight__rating = document.querySelector('.highlight__rating');
const highlight__genres = document.querySelector('.highlight__genres');
const highlight__launch = document.querySelector('.highlight__launch');
const highlight__description = document.querySelector('.highlight__description');

const modal = document.querySelector('.modal');
const modal__title = document.querySelector('.modal__title');
const modal__img = document.querySelector('.modal__img');
const modal__description = document.querySelector('.modal__description');
const modal__average = document.querySelector('.modal__average');
const modal__genre_average = document.querySelector('.modal__genre-average');

const bntPlay = document.querySelector('.highlight__video');
const videoPlay = document.querySelector('.highlight__video-link');

const btn_theme = document.querySelector('.btn-theme');

let icone = 'sol';

btn_theme.addEventListener('click', () => {
    if (icone === 'sol') {
        icone = 'lua';
        btn_theme.src = './assets/dark-mode.svg';
        body.style.setProperty('--background-body', '#242424');
        body.style.setProperty('--contraste-body', '#FFFFFF')
        body.style.setProperty('background-card', '#454545');
        body.style.setProperty('--contraste-input', '#FFFFFF');

        setaDireita.src = './assets/seta-direita-branca.svg';
        setaEsquerda.src = './assets/seta-esquerda-branca.svg';

    } else {
        icone = 'sol';
        btn_theme.src = './assets/light-mode.svg'
        body.style.setProperty('--background-body', '#FFFFFF')
        body.style.setProperty('--contraste-body', '#000000')
        body.style.setProperty('background-card', '#FFFFFF');
        body.style.setProperty('--contraste-input', '#979797');

        setaDireita.src = './assets/seta-direita-preta.svg';
        setaEsquerda.src = './assets/seta-esquerda-preta.svg';
    }
})
const input = document.querySelector('.input');

const header__title = document.querySelector('.header__title');


let arrayDeFilmes;
let pagina = 0;

let primeiraPagina = 0;
let ultimaPagina = 15;

const promessa = fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false');
promessa.then(function (resposta) {
    const promessaBody = resposta.json();
    promessaBody.then(function (body) {
        arrayDeFilmes = body.results;
        console.log(arrayDeFilmes)
        atualizarListaDeFilmes();
    })
})

let id;

function atualizarListaDeFilmes() {
    movies.innerHTML = '';
    for (let i = pagina; i < pagina + 5; i++) {
        const filme = arrayDeFilmes[i];

        const movie = document.createElement('div');
        movie.classList.add('movie');
        movie.style.backgroundImage = `url(${filme.poster_path})`;

        movie.addEventListener('click', () => {
            modal.classList.remove('hidden');

            const promessaModal = fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${filme.id}?language=pt-BR`);
            promessaModal.then(function (resposta) {
                const modalBody = resposta.json();
                modalBody.then(function (body) {
                    console.log(body);
                    modal__title.textContent = body.title;
                    modal__img.src = body.backdrop_path;
                    modal__description.textContent = body.overview;
                    modal__average.textContent = body.vote_average;

                    modal__genre_average.innerHTML = '';
                    modal__genre_average.append(modal__average)

                    for (let i = 0; i < body.genres.length; i++) {
                        const modal__genre = document.createElement('span');
                        modal__genre.classList.add('modal__genre');
                        modal__genre.textContent = body.genres[i].name;
                        modal__genre_average.append(modal__genre)
                    }
                })
            })
        })

        const infos = document.createElement('div');
        infos.classList.add('movie_info');

        const title = document.createElement('span');
        title.classList.add('movie_title');
        title.textContent = filme.title;

        const rating = document.createElement('span');
        rating.classList.add('movie_rating');
        rating.textContent = filme.vote_average;

        const img = document.createElement('img');
        img.src = "./assets/estrela.svg"

        rating.append(img);
        infos.append(title, rating);
        movie.append(infos);
        movies.append(movie);
    }
}
setaDireita.addEventListener('click', () => {
    if (pagina === ultimaPagina) {
        pagina = 0;
    } else {
        pagina += 5;
    }
    console.log(pagina);
    atualizarListaDeFilmes()
    console.log(arrayDeFilmes)
})
setaEsquerda.addEventListener('click', () => {
    if (pagina === primeiraPagina) {
        pagina = 15;
    } else {
        pagina -= 5;
    }
    console.log(pagina)
    atualizarListaDeFilmes();
    console.log(arrayDeFilmes)
})

const geral = fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR');
geral.then(function (resposta) {
    const promessaBody = resposta.json();
    promessaBody.then(function (body) {
        console.log(body)

        highlight__video.style.backgroundImage = `url(${body.backdrop_path})`;
        highlight__title.textContent = body.title;
        highlight__rating.textContent = body.vote_average;

        let generos = '';
        for (let i = 0; i < body.genres.length; i++) {
            generos += body.genres[i].name + ', ';
        }
        highlight__genres.textContent = generos.substring(0, generos.length - 2);
        const meses = [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro"
        ];

        const data = new Date(body.release_date);
        const dataFormatada = data.getDate() + " de " + meses[(data.getMonth()) - 1] + " de " + data.getFullYear();
        highlight__launch.textContent = dataFormatada;

        highlight__description.textContent = body.overview;
    })
})

let trailer;

const exibirFilme = fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR');
exibirFilme.then(function (resposta) {
    const playBody = resposta.json();
    playBody.then(function (body) {
        trailer = body.results;
    })
})

function exibirTrailer() {
    videoPlay.href = `https://www.youtube.com/watch?v=${trailer[0].key}`;
}

bntPlay.addEventListener('click', () => {
    exibirTrailer()
})

console.log(movies)

let page = 0;

input.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
        const filmeDesejado = input.value;
        const promessaFilme = fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${filmeDesejado}'`
        );
        promessaFilme.then(function (resposta) {
            const filmeBody = resposta.json();
            filmeBody.then(function (body) {
                console.log(body)
                arrayDeFilmes = body.results;
                atualizarListaDeFilmes();
            })
        })
        input.value = '';
    }
})

modal.addEventListener('click', () => {
    modal.classList.add('hidden')
})
header__title.addEventListener('click', () => {
    pagina = 0;
    atualizarListaDeFilmes();
})