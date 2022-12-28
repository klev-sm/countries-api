import { Router } from "express";
import axios from "axios";
const router: Router = Router();

router.get("/countries", async (_, res) => {
    /* GET infos about all countries
     * Offical and common names
     * Flag
     * Region
     * SubRegion
     * Capital
     * Population
     * Languages
     * Currencie
     */

    axios
        .get("https://restcountries.com/v3.1/all")
        .then((allCountries) => {
            // everything goes fine!
            const sanitizedData: Array<any> = sanitizeData(allCountries);
            res.json({
                status: "Success!",
                data: sanitizedData,
            }).status(200);
        })
        .catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                res.json({
                    status: "Failed!",
                    data: error.response.data,
                    header: error.response.headers,
                    error: error.config,
                }).status(error.response.status);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                res.json({
                    status: "Failed!",
                    requestError: error.request,
                    error: error.config,
                }).status(error.response.status);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log(error);
                res.json({
                    status: "Failed!",
                    requestError: error.request,
                    message: error.message,
                    error: error.config,
                }).status(error.response.status);
            }
        });
});

function sanitizeData(data: axios.AxiosResponse<any, any>): Array<any> {
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

export { router };
