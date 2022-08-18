import filmsData from './main.js'
const cardDiv = document.querySelector('.card-div');
const searchInput = document.querySelector('.searchInput');
let button1 = document.querySelector('.button1');
let h1 = document.querySelector('.h1');
let reset = document.querySelector('.reset');

let arr = [];

function importData() {
    return new Promise((res, rej) => {
        setTimeout(() => {
           res(filmsData);
        }, 2000);
    });
};

async function getData() {
    return await importData();
}


function render(data) {
    cardDiv.innerHTML = '';
    let filterUrlData = data.filter((objdata) => {
        if(objdata.imageurl.length) {
           return objdata.imageurl;
        }
    }).forEach(function(filmObj) {
            let card = document.createElement('div');
            card.classList.add('card');
            let img = document.createElement('img');
            img.src = filmObj.imageurl[0];
            let title = document.createElement('p');
            title.textContent = filmObj.title;
            let genre = document.createElement('span');
            genre.textContent = filmObj.genre;
            let heart = document.createElement('h3');
            heart.className = 'heart';
             heart.innerHTML = arr.includes(filmObj) ? '❤️' : '🤍';
             heart.addEventListener('click', () => {
                if(!arr.includes(filmObj)) {
                  arr.push(filmObj);
                 heart.innerHTML = '❤️';
                }
                else {
                  arr = arr.filter(item => item !== filmObj);
                  heart.innerHTML = '🤍';
                }
                })
            card.append(heart, img, title, genre);
            cardDiv.append(card);
    
    });
    if(!data.length) {
        let p = document.createElement('p');
        let img = document.createElement('img');
        img.style.margin='10px';
        p.textContent = 'Sorry favorite section is ampty';
        img.src = './sad.png';
        cardDiv.append(p, img);
    };
};

    render(filmsData.results);

    button1.addEventListener('click', () => {
          render(arr);
          searchInput.disabled = true;
          reset.style.display='block';
    });

    h1.addEventListener('click', () => {
        render(filmsData.results);
        searchInput.disabled = false;
        searchInput.value = '';
        reset.style.display='none';
    });

    reset.addEventListener('click', () => {
        render(arr);
        cardDiv.innerHTML = 'Sorry favorite section is ampty';
        arr = [];
    })

searchInput.addEventListener('input', () => {
   let filterData = filmsData.results.filter((item) => item.title.toLowerCase().includes(searchInput.value.toLowerCase()));
   render(filterData);
});




