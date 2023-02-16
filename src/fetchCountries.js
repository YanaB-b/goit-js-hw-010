const URL = 'https://restcountries.com/v3.1/name';


function fetchCountries(name) {
    return fetch (`${URL}/${name}?frields=name,capital,population,flags,languages`).then(response => {
        if (!response.ok){
            throw new Error(response.status);
        }
        close.log(response.json());
        return response.json()
    });
}



export {fetchCountries};