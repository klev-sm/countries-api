import mongoose, { Schema } from "mongoose";

const CountrieSchema = new Schema({
    name: Object,
    flags: String,
    region: String,
    subregion: String,
    capital: Array,
    population: Number,
    languages: {
        type: Map,
        of: String,
    },
    currencies: Object,
});

const Countrie = mongoose.model("Countrie", CountrieSchema);

export default Countrie;
