const { ApiExecutor } = require('./src/workers/apiExecutor')
const { CurveModeler } = require('./src/workers/curveModeler')
const { CountryDataAggregator} = require('./src/workers/CountryDataAggregator')
const apiExecutor = new ApiExecutor('covid-193.p.rapidapi.com', 'a105fbc46emsh9211cb134c839b1p1d1031jsn8f45ca70b43d' )

let curveModeler
apiExecutor.getHistoryStatsForCountry("Italy", function(data){

    //data.organize()
    curveModeler = data.generateCurveModeler()
    console.log(curveModeler)
    console.log(curveModeler.generatePopulationPredictionGraph(60))
 })
/*
apiExecutor.getCountries(function(body){ console.log('there are ' + body.results + ' countries available to look at') })




apiExecutor.getHistoryStatsForCountry("USA", function(data){

    //data.organize()
    console.log(data.totalDeathsByDay('2020-04-05'))
    console.log(data.totalTestsByDay('2020-04-05'))
    console.log(data.currentDeaths())
 })

apiExecutor.getHistoryStatsForCountryForDay("Trinidad-and-Tobago", "2020-04-05", function(result){
    console.log(result.currentDeaths())

})



apiExecutor.getStatsForToday(function(data){
    console.log(data.currentDeathsCategoryForCountry("S.-Korea"))
    console.log(data.getTopNCountriesForCategory(10, 'deaths'))
    console.log(data.getTopNCountriesForCategory(10, 'tests'))
    console.log(data.getTopNCountriesForCategory(10, 'cases'))
    console.log(curveModeler.rateOfTransmission)


})
*/

