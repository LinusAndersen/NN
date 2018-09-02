class NeuronalNetwork{
    
    constructor(weights, structure, ActivationO){
        this.weights = weights; //gewichte der verbindungen des neurons ohne ([[[0.5,-1],[1,0.2]], [[3,2,5],[2,1,5]]])
        this.structure = structure; //[2,2,3]
        this.ActivationO = ActivationO;
    }
    calculateN(valuesINeurons){
        return(this.calculate(valuesINeurons,this.weights,this.structure, this.structure.length - 1));
    }
    calculate(valuesINeurons,weights, structure, mnumber){
        var mstructure = structure.slice(mnumber - 1, mnumber + 1);
        var mweights = weights[mnumber - 1];
        if (mnumber == 1){
            var mvaluesINeurons = valuesINeurons;
        }
        else{
            var mvaluesINeurons = this.calculate(valuesINeurons, weights, structure,mnumber - 1);
        }
        var output = [];
        for (let i = 0; i < mstructure[1]; i++){
            output.push(0);
            }
        for (let i = 0; i < mstructure[0]; i++){
            for (let x = 0; x < mweights[i].length; x++){
                output[x] += this.ActivationO.f(mvaluesINeurons[i] * mweights[i][x]); //multiplie with function
            }
        }
        return(output);
    }
}
class sqared{
    f(value){
        return (value * value);
    }
}
class binary{
    f(value){
        if (value > 0){
            return (1);
        }
        else{
            return (0);
        }
    }
}
class proportional{
    f(value){
        return(value);
    }
}
