class NNTrainer{
    //constructor(Task, populationSize, mutationRange, freshMax, structure,genRange, ActivationO){
    constructor(structure, genRange, ActivationO, Train, Task){
        this.Train = Train;
        this.Task = Task;
        this.structure = structure;
        this.genRange = genRange;
        this.ActivationO = ActivationO;
        this.NN = [];
        this.NN = this.Train.getNNs(this.structure, this.genRange, this.ActivationO);
        console.log(this.NN);
        this.consoleWeights();
    }
    trainA(ammount){
        for (let i = 0; i < ammount; i ++){
            console.log("Training Step " + i);
            console.log("");
            let fitnessList = this.getFitness();
            this.consoleFitness(fitnessList);
            this.NN = this.Train.train(fitnessList, this.NN);
            this.consoleWeights();
        }
        console.log("Training completed");
    }
    //mby a train where it trains until a fitness is reached or mby until you pause
    
    consoleWeights(){
        console.log("---WEIGHTS---");
        for (let N of this.NN){
            let string = "";
            for (let row of N.weights){
                for(let neuron of row){ //neuron of the next
                    for (let connection of neuron){
                        string = string.concat(connection);
                        string = string.concat(",");
                    }
                    string = string.concat(":");
                }
                string = string.concat("-");
            }
            console.log(string);
        }
        console.log(" ");
    }
    consoleFitness(fitnessList){
        console.log("---FITNESS---");
        for (let fitness of fitnessList){
            console.log(fitness.toString());
        }
        console.log("");
    }
    getFitness(){
        let i = 0;
        let fitnessList = [];
        while(i < this.NN.length){
            let NNstoTest = [];
            for (let r = 0; r < this.Task.numberNNs; r++){
                NNstoTest.push(this.NN[i+r]);
            }
            let taskOutput = this.Task.task(NNstoTest);
            for (let fitness of taskOutput){
                fitnessList.push(fitness);
            }
            i+= this.Task.numberNNs;
        }
        return (fitnessList);
    }
}
class NaturalSelection{
    constructor(populationSize, freshMax, mutationRange){
        this.freshMax = freshMax;
        this.populationSize = populationSize;
        this.mutationRange = mutationRange;
    }
    getNNs(structure, genRange, ActivationO){
        this.genRange = genRange;
        this.structure = structure;
        this.ActivationO = ActivationO;
        return(this.generateNNs(this.populationSize));
    }
    generateNNs(number){
        let NN = [];
        for (let i = 0; i < number; i ++){
            let weights = [];
            for (let s = 0; s < this.structure.length - 1; s++){
                let sWeights = [];
                for (let n = 0; n < this.structure[s]; n++){
                    let nWeights = [];
                    for (let c = 0; c <  this.structure[s + 1]; c++){
                        nWeights.push(this.genRange[0] + Math.random() * (this.genRange[1] - this.genRange[0]));
                    }
                    sWeights.push(nWeights);
                }
                weights.push(sWeights);
            }
            NN.push(new NeuronalNetwork(weights,this.structure, this.ActivationO));
        }
        return (NN);
    }

    train(fitnessList, NN){
        let newNNs = this.natrualSelection(fitnessList, NN);
        return(newNNs);
    }
    
    natrualSelection(fitnessList, NN){
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
        for (let i = 0; i < NN.length - this.freshMax; i++){
            let newWeights = NN[i].weights;
            for (let row = 0; row < newWeights.length; row ++){
                let theRow = newWeights[row];
                for (let neuron = 0; neuron < theRow.length; neuron ++){
                    let theNeuron = theRow[neuron];
                    for (let connection = 0;  connection < theNeuron.length; connection++){
                        let rnd = NN[this.randomPick(fitnessList, allFitness)].weights[row][neuron][connection];
                        let mutation = this.mutationRange[0] + Math.random() * (this.mutationRange[1] - this.mutationRange[0]);
                        newWeights[row][neuron][connection] = rnd + mutation; //FIX: kann nicht außerhalb gen range sein
                    }
                }
            }
            newNeuronalNetworks.push(new NeuronalNetwork(newWeights, NN[0].structure, NN[0].ActivationO));
        }
        newNeuronalNetworks = newNeuronalNetworks.concat(this.generateNNs(this.freshMax));
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