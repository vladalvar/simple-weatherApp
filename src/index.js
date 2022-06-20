import cityJson from './json/citylist.json'

const app = document.getElementById('app');
const form = document.querySelector('form');
const input = document.querySelector('#inputSearch');


form.addEventListener('submit', e => {
    e.preventDefault();
    cleanCard();
    const data = Object.fromEntries(new FormData(e.target));

    const array = [...searchCity(cityJson, data.search)];
    dataApi(array);
})

const searchCity = (json, input) => {
    const array = [];

    json.forEach(item => {
        if (item.name === input) {
            const id = item.id
            const name = item.name
            const country = item.country;

            array.push({
                'id': id,
                'name': name,
                'country': country,
            });
        }
    })
    return array;
}





const dataApi = (citys) => {
    try {
        const array = []

        citys.forEach( async item => {
            const respuesta = await window.fetch(`https://api.openweathermap.org/data/2.5/weather?id=${item.id}&appid=f9264d52fa553c74c1825d1338b6bfb5&lang=MX&units=metric`);
            const resJSON = await respuesta.json();
            // console.log(`${resJSON.main.temp} °C`);

            const card = document.createElement('div');
            card.className = 'card'

            const cityText = document.createElement('p');
            cityText.textContent = resJSON.name;
            cityText.className = 'city';

            const countryText = document.createElement('span');
            countryText.textContent = resJSON.sys.country;
            countryText.className = 'country';

            const temp = document.createElement('p');
            temp.textContent = `${resJSON.main.temp} °C`
            temp.className = 'temp';

            const img = document.createElement('img');
            img.src = `http://openweathermap.org/img/wn/${resJSON.weather[0].icon}@2x.png`;
            img.className = 'icon';

            const description = document.createElement('p');
            description.textContent = resJSON.weather[0].description;
            description.className = 'description';

            card.append(cityText, temp, img, description);
            cityText.appendChild(countryText);

            // array.push(card);
           app.append(card);

        })
        // console.log(array);
        app.append(...array);
    } catch (err) {
        console.error(err);
    }

}

const cleanCard = (event) => {

    const card = app.childNodes;
    [...card].forEach(child => {
        child.remove();
    })
}