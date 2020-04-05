const { IndividualData } = require('./individualData')
const { moment } = require("moment")
class CountryDataAggregator {

    constructor(country, dataList){
        this.country = country
        this.dataMap = {}
        this.organize(dataList)
    }

    totalCategoryByDay(date, category){
        return this.dataMap[date][category]['total']
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