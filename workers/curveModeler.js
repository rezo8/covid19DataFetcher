

class CurveModeler {

    constructor(apiExecutor){
        this.apiExecutor = apiExecutor
        this.rateOfRecovery = 0.23
        this.rateOfTransmission = 2.0
        this.sStart = .99
        this.iStart = .01
        this.rStart = 0
        this.maxTime = 40 // number of days we compute this for.
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