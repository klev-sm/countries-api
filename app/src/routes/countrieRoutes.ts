import { Router } from "express";
import CountrieController from "../controllers/countrieController";

const router: Router = Router();

router
    .get("/countries", CountrieController.getCountries)
    .delete("/countries", CountrieController.deleteAllCountries);

export default router;
