import axios from "axios";

// function to get data from api and return only the data that was asked for
export function sanitizer(data: axios.AxiosResponse<any, any>): Array<any> {
    const fetchedData: Array<any> = data.data;
    const mappedData: Array<any> = fetchedData.map((resp) => {
        const objData = {
            name: resp.name,
            flags: resp.flags.png,
            region: resp.region,
            subregion: resp.subregion,
            capital: resp.capital,
            population: resp.population,
            languages: resp.languages,
            currencies: resp.currencies,
        };
        return objData;
    });
    return mappedData;
}
