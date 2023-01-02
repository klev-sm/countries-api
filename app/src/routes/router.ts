import { Response, Router } from "express";
import axios from "axios";
import { sanitizer } from "../helpers/Sanitizer";
import Countrie from "../models/Countrie";

const router: Router = Router();

router.get("/countries", async (req, res) => {
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

    try {
        const documentQuantity: number = await Countrie.count();
        console.log("quantidade: " + documentQuantity);
        if (documentQuantity > 0 && documentQuantity <= 250) {
            // there are countries saved on database
            // so I must return these countries
            Countrie.find((error, countries) => {
                if (error) {
                    res.json({
                        status: "Failed!",
                        message: "Could not return data!",
                    }).status(404);
                }
                res.json({
                    status: "Success! Data returned.",
                    origin: "MongoDB",
                    data: countries,
                }).status(200);
            });
        } else {
            // there are not countries saved on database
            // so I must get through api
            fetchApi(res);
        }
    } catch (error) {
        throw new Error(error);
    }
});

function fetchApi(res: Response): void {
    axios
        .get("https://restcountries.com/v3.1/all")
        .then((allCountries) => {
            // getting the right data
            const sanitizedData: Array<any> = sanitizer(allCountries);
            Countrie.create(sanitizedData)
                .then(() => {
                    // everything goes fine!
                    res.json({
                        status: "Success! Data returned.",
                        data: sanitizedData,
                    }).status(200);
                })
                .catch((error) => {
                    throw new Error(error);
                });
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
}

export { router };
