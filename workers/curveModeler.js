
const fs = require('fs');

let populations = JSON.parse(fs.readFileSync('./public/populations.json'));

class CurveModeler {

    /*
        Assumes that t
    */
    constructor(country, sirModelData){

        const res  = this.parseSIRModelData(sirModelData)
        this.computeConstantsWithData(res[0], res[1], res[2])
        this.population = populations[country]
        this.sStart = res[3]
        this.iStart = res[4]
        this.rStart = res[5]
    }

    computeConstantsWithData(susceptibleArray, infectedArray, recoveryArray){
        this.rateOfTransmission = this.computeRateOfTransmissionWithData(susceptibleArray, infectedArray) || 2.0
        this.rateOfRecovery = this.computeRateOfRecoveryWithData(susceptibleArray, infectedArray) || 0.23

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


    generatePopulationPredictionGraph(n){
        let proportionData = this.generateInfoGraph(n)
        let toRet = {}
        toRet['susceptible'] = proportionData['susceptible'].map(x => x * this.population)
        toRet['infected'] = proportionData['infected'].map(x => x * this.population)
        toRet['recovered'] = proportionData['recovered'].map(x => x * this.population)
        return toRet
    }
    generateInfoGraph(n){

        var start = 0
        var Ik = this.iStart
        var Sk = this.sStart
        var Rk = this.rStart
        var infoGraph = {'susceptible' : [Sk], 'infected': [Ik], 'recovered' : [Rk]}
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

     parseSIRModelData(sirModelData){
        sirModelData.sort(function(a,b) {
            return Date.parse(a['date']) - Date.parse(b['date'])
        })

        var sList = []
        var iList = []
        var rList = []

        for (const index in sirModelData){
            const entry = sirModelData[index]
            sList.push(entry['susceptible'])
            iList.push(entry['infected'])
            rList.push(entry['recovered'])

        }
        return [sList, iList, rList, sList[0], iList[0], rList[0]]
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
}

module.exports = {
    CurveModeler: CurveModeler
}
