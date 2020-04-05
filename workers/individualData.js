class IndividualData {
    constructor(dataMap){
        this.country = dataMap['country']
        this.casesMap = dataMap['cases']
        this.testsMap = dataMap['tests']
        this.deathsMap = dataMap['deaths']
        this.casesTotal = dataMap['cases']['total']
        this.getNewCases = dataMap['cases']['new']
        this.activeCases = dataMap['cases']['active']
        this.criticalCases = dataMap['cases']['critical']
        this.recoveredCases = dataMap['cases']['recovered']
        this.deathTotal = dataMap['deaths']['total']
        this.newDeaths = dataMap['deaths']['new']
        this.tests = dataMap['tests']['total']
        this.day = dataMap['day']
        this.time = dataMap['time']
    }

}

module.exports = {
    IndividualData: IndividualData
}