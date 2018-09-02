
let n = new NeuronalNetwork([[[0.12314]]],[1,1], new proportional());
console.log(n.calculateN([1]));
class getHigher{
    constructor(){
        this.numberNNs = 1;
    }
    task(NNstoTest){
        let NNoutput = NNstoTest[0].calculateN([1]);
        let out = NNoutput;
        return (out);
    }
}
class DifHigher{
    constructor(){
        this.numberNNs = 1;
    }
    task(NNstoTest){
        let NNoutput = NNstoTest[0].calculateN([1,-1]);
        let out = NNoutput;
        return(out);
    }
}
class Add{
    constructor(){
        this.numberNNs = 1;
    }
    task(NNstoTest){
        let a = Math.round(Math.random() * 10);
        let b = Math.round(Math.random() * 10);
        console.log("Number 1: " + a);
        console.log("Number 2: " + b);
        let NNoutput = NNstoTest[0].calculateN([a,b]);
        console.log("Output of the Neuronal Network: " + NNoutput[0]);
        let ans = (a+b);
        console.log("correct Answer: " + ans);
        let dif = Math.abs(NNoutput[0] - ans);
        console.log("Difference: " + dif);
        let relativeDif = dif / ans;
        console.log("Relative Diffrence: " + relativeDif)
        let out = [(1-relativeDif)];
        return(out);
    }
}
/*
let naturalGetHigherTrainer = new NNTrainer([1,1], [-2,2], new proportional(),new NaturalSelection(10,0,[-0.1,0.1]), new getHigher());
naturalGetHigherTrainer.trainA(100);
*/
/*
let naturalDifHigherTrainer = new NNTrainer([2,1], [-2,2], new proportional, new NaturalSelection(10,0,[-0.1,0.1]), new DifHigher());
naturalDifHigherTrainer.trainA(100);
*/
let nAddTrainer = new NNTrainer([2,1], [0,2],new proportional, new NaturalSelection(10,0,[-0.01,0.01]), new Add());
nAddTrainer.trainA(10000);
