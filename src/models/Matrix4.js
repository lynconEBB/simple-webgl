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

    apply(matrix) {

    }

    cofactorOf(index) {
        let col = (index%4) + 1;
        let line = Math.ceil(((index+1)-0.1)/4);

        let cont = 0;
        let minMat = new Float32Array(9);

        for (let i = 0; i < this.length; i++) {
            let cellLine = Math.ceil(((i+1)-0.1)/4);
            let cellColumn = (i % 4) + 1;

            if (cellColumn !== col && cellLine !== line){
                minMat[cont] = this[i];
                cont++;
            }
        }

        const minorDeterminant = ((minMat[0] * minMat[4] * minMat[8]) + (minMat[1] * minMat[5] * minMat[6]) + (minMat[2] * minMat[3] * minMat[7]))
                - ( (minMat[2] * minMat[4] * minMat[6]) + (minMat[1] * minMat[3] * minMat[8]) + (minMat[0] * minMat[5] * minMat[7]));

        return Math.pow(-1,col+line) * minorDeterminant;
    }

    transpose() {
        const matrixCopy = new Matrix4(this);

        for (let i = 0; i < matrixCopy.length; i++) {
            let line = Math.ceil(((i+1)-0.1)/4);
            let column = (i % 4) + 1;

            let newIndex = ((column - 1) * 4) + (line - 1);
            this[newIndex] = matrixCopy[i];
        }
    }

    get determinant() {
        return this[0] * this.cofactorOf(0) + this[1] * this.cofactorOf(1) + this[2] * this.cofactorOf(2) + this[3] * this.cofactorOf(3);
    }

    get adjugate(){
        const cofactorMatrix = this.cofactorMatrix;
        cofactorMatrix.transpose();
        return cofactorMatrix;
    }

    get inverse() {
        const matrix = new Matrix4(this.adjugate);
        for (let i = 0; i < this.length; i++) {
            matrix[i] *= 1/this.determinant;
        }

        return matrix;
    }

    get cofactorMatrix() {
        const cofactorMatrix = new Matrix4();

        for (let i = 0; i < cofactorMatrix.length; i++) {
            cofactorMatrix[i] = this.cofactorOf(i);
        }

        return cofactorMatrix;
    }

}
