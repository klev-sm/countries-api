import axios from "axios";

// function to get data from api and return only the data that was asked for
export default function sanitizer(
    data: axios.AxiosResponse<any, any>
): Array<any> {
    const fetchedData: Array<any> = data.data;
    const mappedData: Array<any> = fetchedData.map((resp) => {
        const objData = {
            name: resp.name["common"],
            countrieCode: resp.cioc,
            flag: resp.flags.png,
            region: resp.region,
            subregion: resp.subregion,
            capital: resp.capital,
            population: resp.population,
            languages: resp.languages,
            currencies: resp.currencies,
            topLevelDomains: resp.tld,
            borders: resp?.borders,
            likes: 0,
        };
        return objData;
    });
    return mappedData;
}
