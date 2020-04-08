const { ApiExecutor } = require('./workers/apiExecutor')
const { CurveModeler } = require('./workers/curveModeler')
const { CountryDataAggregator} = require('./workers/CountryDataAggregator')
const apiExecutor = new ApiExecutor('covid-193.p.rapidapi.com', 'a105fbc46emsh9211cb134c839b1p1d1031jsn8f45ca70b43d' )


const curveModeler = new CurveModeler([
                                          0.99,
                                          0.9702,
                                          0.916839,
                                          0.780163976592,
                                          0.47735465174115765,
                                          0.04559549641903382,
                                          0.025532119296638386,
                                          0.008768554102548759,
                                          0.0002995205360159757,
                                          0.00007169442381589448,
                                          0.000029671067281748675
                                        ],
                                        [
                                          0.01,
                                          0.0275,
                                          0.074536,
                                          0.194067743408,
                                          0.45224148727500235,
                                          0.7799851005238756,
                                          0.6717161431190564,
                                          0.4829207568024862,
                                          0.38031801630444717,
                                          0.2930726986666244,
                                          0.22570800132983493
                                        ],
                                        [
                                          0,
                                          0.0023,
                                           0.008625,
                                          0.02576828,
                                          0.07040386098384001,
                                          0.17441940305709056,
                                          0.353815976177582,
                                          0.5083106890949649,
                                          0.6193824631595367,
                                          0.7068556069095595,
                                          0.7742623276028832
                                        ]
)
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
})
*/

console.log(curveModeler.rateOfRecovery)
console.log(curveModeler.rateOfTransmission)
console.log(curveModeler.generateInfoGraph(10))

