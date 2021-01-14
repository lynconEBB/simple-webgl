import {createEulerMatrix, createScaleMatrix, createTranslateMatrix} from "../matricesFactory";

export default class Vector4 extends Float32Array{
    
    constructor(values) {
        if (values === undefined) {
            values = [0, 0, 0, 0];
        } else if (!values instanceof Array) {
            throw new Error("Vector4 constructor require an Array");
        } else if (values.length !== 4) {
            throw new Error("Vector4 constructor require an Array of 4 items");
        }
        super(values);
    }

    rotate(angles, convertToRadian = true) {
        const anglesCopy = new Float32Array(angles);
        if (convertToRadian) {
            for (let i = 0; i < anglesCopy.length; i++) {
                anglesCopy[i] =  (Math.PI * anglesCopy[i]) / 180;   
            }
        }
       
        const [ x, y, z ] = anglesCopy;
        const eulerMatrix = createEulerMatrix(x,y,z);
        eulerMatrix.applyToVector(this);
    }

    translate(translateValues) {
        const [ x, y, z ] = translateValues;
        const translateMatrix = createTranslateMatrix(x,y,z);
        translateMatrix.applyToVector(this);
    }

    scale(scaleValues) {
        const [ x, y, z ] = scaleValues;
        const scaleMatrix = createScaleMatrix(x,y,z);
        scaleMatrix.applyToVector(this);
    }

    apply(matrix) {
        matrix.applyToVector(this);
    }

}