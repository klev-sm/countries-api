import { Router } from "express";
import CountrieController from "../controllers/CountrieController.js";

const router: Router = Router();

router
    // get
    // all countries
    .get("/countries", CountrieController.getCountries)
    // countrie by one identifier
    .get("/countries/filterBy", CountrieController.getCountrieByIdentifier)
    // delete all countries
    .delete("/countries", CountrieController.deleteAllCountries)
    // update likes quantity
    .put("/countries/likes/", CountrieController.changeLikesCount);

export default router;
