const { IndividualData } = require('./individualData')
const { moment } = require("moment")
class DataAggregator {

    constructor(dataList){
        this.dataMap = {}
        this.countryList = []
        this.organize(dataList)
    }

    getCountryList(){
        return Object.keys(this.dataMap)
    }

    getTopNCountriesForCategory(n, category){
        return this.countryList.sort((a, b) => parseFloat(b[category]['total']) - parseFloat(a[category]['total'])).slice(0, Math.min(n, this.countryList.length))
    }

    currentTotalCategoryForCountry(country, category){
        return this.totalCategoryForCountryByDay(country, category)
    }

    currentDeathsCategoryForCountry(country){
        return this.currentTotalCategoryForCountry(country, 'deaths')
    }

    currentTestsCategoryForCountry(country){
        return this.currentTotalCategoryForCountry(country, 'tests')
    }

    currentCasesCategoryForCountry(country){
        return this.currentTotalCategoryForCountry(country, 'cases')
    }

    totalCategoryForCountryByDay(country, category){
        const mapToLookAt = this.dataMap[country]
        return mapToLookAt[category]['total']
    }


    organize(allData){
        // No need to wrangle with current as this API doesn't give us multiple hits per date
        allData.forEach(dataPoint => {
                this.dataMap[dataPoint['country']] = dataPoint
                if(dataPoint['country'] !== 'All' && dataPoint['country'] !== 'World'){
                    this.countryList.push( dataPoint ) // country list does not need this information
                }  
                
         })


    }


}

module.exports = {
    DataAggregator: DataAggregator
}