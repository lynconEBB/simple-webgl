import {createGeometry, prepareProgram, draw} from "./js/utils";
import "./scss/style.scss";

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
const gl = canvas.getContext("webgl2");
gl.viewport(0,0,canvas.width, canvas.height);
gl.clearColor(0.4,0.6,0.4,1);
gl.clear(gl.COLOR_BUFFER_BIT);

const fragmentShader = `#version 300 es
    precision highp float;

    out vec4 FragColor;
    in vec3 vColor;

    void main() {
        FragColor = vec4(vColor,1.);
    }
`;
const vertexShader = `#version 300 es
    precision highp float;

    layout (location = 0) in vec3 aPos;
    layout (location = 1) in vec3 aColor;
    out vec3 vColor;

    void main() {
        gl_Position = vec4(aPos.x, aPos.y, aPos.z, 1.0);
        vColor = aColor;
    }
`;

const squareVertices = new Float32Array([
    -1, -1, 0, 1, 1 ,1,
     1, -1, 0, 0 ,0 ,0,
    -1,  1, 0, 1, 1, 1,
     1,  1, 0, 0, 0, 0 
]);

const dataLayout = [
    {
        name: "position",
        length: 3,
    },
    {
        name: "color",
        length: 3
    }
];

const squareIndices = new Uint8Array([0,1,2,1,2,3]);

const squareGeometry = createGeometry(gl,squareVertices,squareIndices, dataLayout);

const program = prepareProgram(gl,vertexShader,fragmentShader);

draw(gl,program,squareGeometry);

