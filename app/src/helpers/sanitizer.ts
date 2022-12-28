import axios from "axios";

export function sanitizer(data: axios.AxiosResponse<any, any>): Array<any> {
    const fetchedData: Array<any> = data.data;
    const mappedData: Array<any> = fetchedData.map((resp) => {
        return {
            name: resp.name,
            flags: resp.flags.png,
            region: resp.region,
            subregion: resp.subregion,
            capital: resp.capital,
            population: resp.population,
            languages: resp.languages,
            currencies: resp.currencies,
        };
    });
    return mappedData;
}
