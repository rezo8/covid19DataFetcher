
const fs = require('fs');

/**
    This class takes in actual population data and will build a curve on top of that.
    Can take in fixed values or calculate the values, depending on parameters in the constructor.
*/
class CurveExtender {

    /*
        Assumes that t
    */
    constructor(population, susceptibleArray, infectedArray, recoveryArray, customRateOfTransmission, customRateOfRecovery ){
        this.susceptibleArray = susceptibleArray
        this.infectedArray = infectedArray
        this.recoveryArray = recoveryArray
        this.population = population // It is paramount that this is populated
        if(!customRateOfTransmission && !customRateOfRecovery){
            computeConstantsWithData()
        }else{
            this.rateOfTransmission = customRateOfTransmission
            this.rateOfRecovery = customRateOfRecovery
        }
    }

    computeConstantsWithData(){
        var propSusArray = this.susceptibleArray.map( x => x / this.population)
        var propRecovArray = this.recoveryArray.map( x => x / this.population)
        var propInfectedArray = this.infectedArray.map( x => x / this.population)
        // Treat arrays as proportions in order to compute
        this.rateOfTransmission = this.computeRateOfTransmissionWithData(propSusArray, propInfectedArray) || 2.0
        this.rateOfRecovery = this.computeRateOfRecoveryWithData(propRecovArray, propInfectedArray) || 0.23

    }


    generatePopulationPredictionGraph(n){
        let proportionData = this.generateInfoGraph(n)
        let toRet = {}
        toRet['susceptible'] = proportionData['susceptible'].map(x => x * this.population)
        toRet['infected'] = proportionData['infected'].map(x => x * this.population)
        toRet['recovered'] = proportionData['recovered'].map(x => x * this.population)
        return toRet
    }

    generateInfoGraph(daysToPredict){
        var start = Math.min(this.susceptibleArray.length, this.recoveryArray.length, this.infectedArray.length) - 1
        var n = start + daysToPredict


        //TODO make sure this is a deep clone
        var infoGraph = {'susceptible' : this.susceptibleArray.slice(), 'infected': this.infectedArray.slice(), 'recovered' : this.recoveryArray.slice()}
        var Sk = infoGraph['susceptible'][start]
        var Ik = infoGraph['infected'][start]
        var Rk = infoGraph['recovered'][start]

        var res

        while(start < n){
            res = this.performInfoComputation(Sk, Ik, Rk)
            Sk = res[0]
            Ik = res[1]
            Rk = res[2]
            infoGraph['susceptible'].push(Sk)
            infoGraph['infected'].push(Ik)
            infoGraph['recovered'].push(Rk)
            start ++
        }
        return infoGraph
    }


    performInfoComputation(Sk, Ik, Rk){

        return [this.computeSkPlusOne(Sk, Ik), this.computeIkPlusOne(Sk, Ik), this.computeRkPlusOne(Rk, Ik)]
    }


    computeIkPlusOne(Sk, Ik){
        return Ik + this.rateOfTransmission * Sk * Ik - this.rateOfRecovery * Ik
    }

    computeSkPlusOne(Sk, Ik){
        return Sk - this.rateOfTransmission * Sk * Ik
    }

    computeRkPlusOne(Rk, Ik){
        return Rk + this.rateOfRecovery * Ik
    }


    computeRateOfTransmissionWithData(susceptibleArray, infectedArray){

        let k = Math.min(susceptibleArray.length, infectedArray.length)
        let curr = 0
        let summation = 0
        while(curr < k - 1){
            summation += ((susceptibleArray[curr] - susceptibleArray[curr + 1])/(susceptibleArray[curr] * infectedArray[curr]))
            curr++
        }

        return summation/k
    }


    computeRateOfRecoveryWithData(recoveryArray, infectedArray){
        let k = Math.min(recoveryArray.length, infectedArray.length)

        let curr = 0
        let avgRate = 0
        while(curr < k - 1){
            let rDelta = recoveryArray[curr]  - recoveryArray[curr + 1]
            let currRate = rDelta/(infectedArray[curr])
            avgRate = avgRate + currRate
            curr ++
        }
        return avgRate/k
    }

}

module.exports = {
    CurveExtender: CurveExtender
}
