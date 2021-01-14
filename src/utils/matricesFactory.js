import Matrix4 from "../models/Matrix4";
const { cos, sin } = Math;

export const createMatrixRotateZ = (angle) => {
    return new Matrix4([
        cos(angle), -sin(angle), 0, 0,
        sin(angle),  cos(angle), 0, 0,
        0,           0, 1, 0,
        0,           0, 0, 1,
    ]);
}

export const createMatrixRotateX = (angle) => {
    return new Matrix4([
        1,          0,           0, 0,
        0, cos(angle), -sin(angle), 0,
        0, sin(angle),  cos(angle), 0,
        0,          0,           0, 1,
    ]);
} 

export const createMatrixRotateb = (angle) => { 
    new Matrix4([
        cos(angle),  0, sin(angle), 0,
                 0,  1,          0, 0,
        -sin(angle), 0, cos(angle), 0,
                  0, 0,          0, 1,
    ]);
}

export const identityMatrixValues = [
    1,0,0,0,
    0,1,0,0,
    0,0,1,0,
    0,0,0,1
]

export const createScaleMatrix = (x,y,z) => {
    return new Matrix4([
        x,0,0,0,
        0,y,0,0,
        0,0,z,0,
        0,0,0,1
    ]);
}

export const createTranslateMatrix = (x,y,z) => {
    return new Matrix4([
        1,0,0,x,
        0,1,0,y,
        0,0,1,z,
        0,0,0,1
    ]);
}

export const createEulerMatrix = (x,y,z) => {
    return new Matrix4([
        cos(z)*cos(y), (cos(z)*sin(y)*sin(x)) - (sin(z)*cos(x)), (cos(z)*sin(y)*cos(x)) + (sin(z)*sin(x)), 0,
        sin(z)*cos(y), (sin(z)*sin(y)*sin(x)) + (cos(z)*cos(x)), (sin(z)*sin(y)*cos(x)) - (cos(z)*sin(x)), 0,
              -sin(y),                            cos(y)*sin(x),                            cos(y)*cos(x), 0,
                    0,                                        0,                                        0, 1  
    ]);
}