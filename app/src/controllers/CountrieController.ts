import { fetchApi } from "../helpers/fetchApi";
import Countrie from "../models/Countrie";
import { Request, Response } from "express";

export default class CountrieController {
    static async getCountries(_: Request, res: Response) {
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
    }

    static deleteAllCountries(_: Request, res: Response) {
        try {
            Countrie.remove({}, () => {
                console.log("removi tudo com sucesso");
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
}
