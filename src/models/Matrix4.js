import {identityMatrixValues} from "../utils/matricesFactory";

export default class Matrix4 extends Float32Array{
    constructor(values) {
        if (values === undefined) {
            values = identityMatrixValues;
        } else if (!values instanceof Array) {
            throw new Error("Matrix4 constructor require an Array");
        } else if (values.length !== 16) {
            throw new Error("Matrix4 constructor require an Array of 16 items");
        }
        super(values);
    }

    applyToVector(vector) { 
     
        let cont = 0; 
        let sum = 0;
        const vectorValues = new Float32Array(vector);
        
        for (let index = 0; index < vector.length; index++) {
            for (let index2 = 0; index2 < vector.length; index2++) {
                sum += this[cont] * vectorValues[index2];
                cont++;
            }
            vector[index] = sum;
            sum = 0;
        }
    }
}