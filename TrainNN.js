class NNTrainer{
    //constructor(Task, populationSize, mutationRange, freshMax, structure,genRange, ActivationO){
    constructor(Task, populationSize, mutationRange, freshMax, structure,genRange, ActivationO){
        this.Task = Task;
        this.populationSize = populationSize;
        this.mutationRange = mutationRange;
        this.freshMax = freshMax;
        this.structure = structure;
        this.genRange = genRange;
        this.ActivationO = ActivationO;
        this.NN = [];
        this.generateNNs(populationSize);
    }
    generateNNs(number){
        for (let i = 0; i < number; i ++){
            let weights = [];
            for (let s = 0; s < this.structure.length - 1; s++){
                let thisWeights = [];
                for (let n = 0; n < this.structure[s]; n++){
                    let nextNWeights = [];
                    for (let n = 0; n < this.structure[s + 1]; n++){
                        nextNWeights.push(this.genRange[0] + Math.random() * (this.genRange[1] - this.genRange[0]));
                    }
                    thisWeights.push(nextNWeights);
                }
                weights.push(thisWeights);
            }
            this.NN.push(new NeuronalNetwork(weights,this.structure, this.ActivationO));
        }
        console.log(this.NN); //verallgemeinern und dann unten bei natural selection einbauen
    }
    train(ammount){
        for (let i = 0; i < ammount; i ++){
            let fitnessList = this.getFitness();
            console.log(fitnessList[0]);
            let newNNs = this.natrualSelection(fitnessList);
            console.log(newNNs[0].weights[0][0]);
        }
    }
    getFitness(){
        let i = 0;
        let fitnessList = [];
        while(i < this.NN.length){
            let NNstoTest = [];
            let r;
            for ( r = 0; r < this.Task.numberNNs; r++){
                NNstoTest.push(this.NN[i+r]);
            }
            let taskOutput = this.Task.task(NNstoTest);
            for (let fitness of taskOutput){
                fitnessList.push(fitness);
            }
            i+= r;
        }
        return (fitnessList);
    }
    
    natrualSelection(fitnessList){
        let newNeuronalNetworks = [];
        let minFitness = fitnessList[0];
        let allFitness = 0;
        for (let fitness of fitnessList){
            if (fitness < minFitness){
                minFitness = fitness;
            }
        }
        for (let i = 0; i < fitnessList.length; i ++){
            fitnessList[i] -= minFitness;
            allFitness += fitnessList[i];
        }
        for (let f = 0; f < fitnessList.length; f ++){
            fitnessList[f] = fitnessList[f] / allFitness;
        }
        //selection
        for (let i = 0; i < this.NN.length - this.freshMax; i++){
            let newWeights = this.NN[i].weights;
            for (let row = 0; row < newWeights.length; row ++){
                let theRow = newWeights[row];
                for (let neuron = 0; neuron < theRow.length; neuron ++){
                    for (let connection = 0;  connection < theRow.length; connection++){
                        let rnd = this.NN[this.randomPick(fitnessList, allFitness)].weights[row][neuron][connection];
                        let mutation = this.mutationRange[0] + Math.random() * (this.mutationRange[1] - this.mutationRange[0]);
                        newWeights[row][neuron][connection] = rnd + mutation;
                    }
                }
            }
            newNeuronalNetworks.push(new NeuronalNetwork(newWeights, this.NN[0].structure, this.NN[0].ActivationO));
        }
        return(newNeuronalNetworks);
        //completly new NNs
        
    }
    randomPick(fitnessL, allFitness){
        let where = 0;
        let propList = [];
        for (let fitness of fitnessL){
            where += fitness;
            propList.push(where);
        }
        let pick = Math.random();
        for (let propI = 0; propI < propList.length; propI ++){
            if (pick < propList[propI]){
                return(propI);
            }
        }
        return (propList.length - 1);
    }
}