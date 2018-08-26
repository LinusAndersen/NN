
let n = new NeuronalNetwork([[[0.12314]]],[1,1], new proportional());
console.log(n.calculateN([1]));
class Task{
    constructor(){
        this.numberNNs = 1;
    }
    task(NNstoTest){
        let NNoutput = NNstoTest[0].calculateN([1]);
        let out = [NNoutput];
        return (out);
    }
}
let NeuronalTrainer = new NNTrainer(new Task() , 10, [-0.1,0.1], 0, [1,1],[0,2], new proportional);
//                                  Task, populationSize, mutationMax, freshMax, structure,genRange
NeuronalTrainer.train(100);
