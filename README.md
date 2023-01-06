# Routes

## GET /countries

returns all countries

## GET /countries/filterBy

returns countries by name, region, sub region or cca3 code, values ​​are passed by query params, example:

### /countries/filterBy?name=Brazil

filter the country with name Brazil

### /countries/filterBy?region=Americas

countries of the "Americas" continent

### /countries/filterBy?subregion=North America

countries of the continent "North America"

### /countries/filterBy?countrieCode=BRA

filter country Brazil with acronym BRA

## DELETE /countries

delete all countries saved in the bank (I use it only for testing, I will remove it later)

## PUT /countries/likes

you must pass the name of the country and if you want to increase or decrease the amount of likes, passing like = 1, for example, you increase, like = -1, you decrease

the names of the countries must also match what is saved in the api (in English)
Brazil is different from "brasil", "Brasil", "brazil", for example, I did not validate the names and it is possible that it does not return anything or returns an error if you try to pass names that are not in English
