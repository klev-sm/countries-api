import mongoose, { Schema } from "mongoose";

const CountrieSchema = new Schema({
    name: Object,
    officialName: String,
    countrieCode: String,
    flag: String,
    region: String,
    subregion: String,
    capital: Array,
    population: Number,
    languages: {
        type: Map,
        of: String,
    },
    currencies: Object,
    topLevelDomains: Array<String>,
    borders: Array,
    likes: Number,
});

const Countrie = mongoose.model("Countrie", CountrieSchema);

export default Countrie;
