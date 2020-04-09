const { IndividualData } = require('./individualData')
const { moment } = require("moment")
const fs = require('fs');
let populations = JSON.parse(fs.readFileSync('./public/populations.json'));
const { CurveModeler } = require('./curveModeler')
class CountryDataAggregator {

    constructor(country, dataList){
        this.country = country
        this.dataMap = {}
        this.organize(dataList)
        this.population = populations[country] // It is paramount that this is populated
    }

    generateCurveModeler(){
        return new CurveModeler(this.country, this.getDataMapForSIRModeler())
    }

    getDataMapForSIRModeler(){
      let sirList = []
      for (const date in this.dataMap){
        if(date){ // check that date is not undefined
            let toAdd = {}
            toAdd['date'] = date
            toAdd['recovered'] = (this.totalCategoryByDay(date, 'deaths') +  this.getRecoveredCasesByDay(date)) / this.population
            toAdd['infected'] = (this.totalCategoryByDay(date, 'cases')) / this.population
            toAdd['susceptible'] = (this.population - toAdd['infected'] - toAdd['recovered']) / this.population
            sirList.push(toAdd)

        }
      }
      return sirList
    }


    totalCategoryByDay(date, category){
        return this.dataMap[date][category]['total']
    }

    getActiveCasesByDay(date){
        return this.dataMap[date]['cases']['active']
    }

    getRecoveredCasesByDay(date){
        return this.dataMap[date]['cases']['recovered']
    }


    currentTotalCategory(category){
        var currDay = new Date().toISOString().slice(0,10); // TODO This is a little unsafe as it assumes that data for this date exists.
        return this.totalCategoryByDay(currDay, category)
    }

    currentDeaths(){
        return this.currentTotalCategory('deaths')
    }

    currentTests(){
        return this.currentTotalCategory('tests')
    }

    currentCases(){
        return this.currentTotalCategory('cases')
    }


    totalDeathsByDay(date) {
        return this.totalCategoryByDay(date, 'deaths')
    }

    totalTestsByDay(date) {
        return this.totalCategoryByDay(date, 'tests')
    }

    organize(allData){
        const filtered = allData.filter(dataPoint => dataPoint['country'] === this.country)
        filtered.forEach(dataPoint => {
            const currLeader = this.dataMap[dataPoint['day']] // Can be null
            if(currLeader){
                if(currLeader['time'] <= dataPoint['time']){
                    this.dataMap[dataPoint['day']] = dataPoint
                }
            }else{
                this.dataMap[dataPoint['day']] = dataPoint
            }
        })
    }

}

module.exports = {
    CountryDataAggregator: CountryDataAggregator
}