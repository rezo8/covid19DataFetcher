const { ApiExecutor } = require('./workers/apiExecutor')
const apiExecutor = new ApiExecutor('covid-193.p.rapidapi.com', 'a105fbc46emsh9211cb134c839b1p1d1031jsn8f45ca70b43d' )

apiExecutor.getCountries(function(body){ console.log('there are ' + body.results + ' countries available to look at') })

apiExecutor.getStatsForToday(function(result){ console.log(result) })
apiExecutor.doesCountryDataExist("Trinidad-and-Tobago", function(result){ console.log(result) })

apiExecutor.getHistoryStatsForCountry("Trinidad-and-Tobago", function(result){ console.log(result) })
apiExecutor.getHistoryStatsForCountryForDay("Trinidad-and-Tobago", "2020-04-05", function(result){ console.log(result) })

