import { fetchApi } from "../helpers/fetchApi";
import Countrie from "../models/Countrie";
import { Request, Response } from "express";

export default class CountrieController {
    static async getCountries(_: Request, res: Response) {
        try {
            const documentQuantity: number = await Countrie.count();
            if (documentQuantity > 0 && documentQuantity <= 250) {
                // there are countries saved on database
                // so I must return these countries
                Countrie.find((error, countries) => {
                    if (error) {
                        res.json({
                            status: "Failed!",
                            message: "Could not return countries!",
                            error: error,
                        }).status(404);
                    }
                    res.json({
                        status: "Success! Data returned.",
                        origin: "MongoDB",
                        data: countries,
                    }).status(200);
                });
            } else {
                // there are no countries saved on database
                // so I must get through api
                fetchApi(res);
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    // get one countrie by: name, code, region or subregion
    static getCountrieByIdentifier(req: Request, res: Response) {
        const query = req.query;
        for (let i in query) {
            finder(i, query[i]);
        }

        function finder(key: string, value: any) {
            Countrie.find({
                [key]: value,
            })
                .exec()
                .then((countrie) => {
                    if (countrie.length === 0) {
                        res.json({
                            status: "Success but does not find any data.",
                            data: countrie,
                        }).status(200);
                    } else {
                        res.json({
                            status: `Success! Returned data filtered by ${key}.`,
                            data: countrie,
                        }).status(200);
                    }
                })
                .catch((error) => {
                    res.json({
                        status: "Failed!",
                        message: "Could not return countrie!",
                        error: error,
                    }).status(404);
                });
        }
    }

    static deleteAllCountries(_: Request, res: Response) {
        try {
            Countrie.remove({}, () => {
                res.json({
                    status: "Success! Data removed.",
                }).status(200);
            });
        } catch (error) {
            res.json({
                status: "Error!",
            }).status(400);
            throw new Error(error);
        }
    }

    static changeLikesCount(req: Request, res: Response) {
        const { name, like } = req.body;

        let likesCounter: Number = 0;
        if (like > 0) {
            likesCounter = 1;
        } else if (like < 0) {
            likesCounter = -1;
        }

        Countrie.findOneAndUpdate(
            { name: name },
            {
                $inc: { likes: likesCounter },
            }
        )
            .then((countrie) => {
                if (countrie == undefined) {
                    res.json({
                        status: "Error!",
                        message:
                            "It was impossible to find countrie with the given name",
                    }).status(404);
                    return;
                }
                res.json({
                    status: "Success! Likes quantity updated.",
                }).status(200);
            })
            .catch((error) => {
                res.json({
                    status: "Error!",
                    message: error,
                }).status(400);
                throw new Error(error);
            });
    }
}
