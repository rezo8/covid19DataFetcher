var request = require("request");
var JSON = require("JSON")
const { CountryDataAggregator} = require('./CountryDataAggregator')
const { DataAggregator} = require('./DataAggregator')

class ApiExecutor {
    constructor(apiHost, apiKey) {
        this.apiKey = apiKey
        this.apiHost = apiHost
    }

    genericRequest(method, queryBody, url, callback){
        var options = {
                  method: method,
                  url: url,
                  qs: queryBody,
                  headers: {
                    'x-rapidapi-host': this.apiHost,
                    'x-rapidapi-key': this.apiKey
                  }
                };

        request(options, function (error, response, body) {
            if(error){ console.log(error)}
            callback(error, response, body)

        });
    }

    getCountries(cb){
        this.genericRequest('GET', {}, 'https://covid-193.p.rapidapi.com/countries', function(err, response, body){ cb(JSON.parse(body)) })
    }

    doesCountryDataExist(countryToCheckout, cb){
        this.genericRequest('GET', {}, 'https://covid-193.p.rapidapi.com/countries', function(err, response, body){
            const parsed = JSON.parse(body)
            var res = false
            parsed.response.forEach(function ( item, index){
                                if(item === countryToCheckout) res = true
                              })
            cb(res)
            });
    }

    getStatsForToday(cb){
        this.genericRequest('GET', {}, 'https://covid-193.p.rapidapi.com/statistics', function(err, response, body){ cb(new DataAggregator(JSON.parse(body)['response'])) })
    }

    getHistoryStatsForCountry(inputCountry, cb){
        this.genericRequest('GET', { country : inputCountry  }, 'https://covid-193.p.rapidapi.com/history', function(err, response, body){ cb(new CountryDataAggregator(inputCountry, JSON.parse(body)['response'])) })
    }

    /*
        date must be in in yyyy-mm-dd format
    */
    getHistoryStatsForCountryForDay(inputCountry, date, cb){
        this.genericRequest('GET', { "country" : inputCountry, "day" : date }, 'https://covid-193.p.rapidapi.com/history', function(err, response, body){ cb(new CountryDataAggregator(inputCountry, JSON.parse(body)['response'])) })
    }

}



module.exports = {
    ApiExecutor: ApiExecutor
}