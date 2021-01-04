import {createGeometry, prepareProgram, draw} from "./js/utils";
import fragmentShader from "./assets/second.frag";
import vertexShader from "./assets/first.vert";
import "./scss/style.scss";

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
const gl = canvas.getContext("webgl2");
gl.viewport(0,0,canvas.width, canvas.height);
gl.clearColor(0.4,0.6,0.4,1);
gl.clear(gl.COLOR_BUFFER_BIT);

const squareVertices = new Float32Array([
    -1, -1, 0, 0, 0 ,0,
     1, -1, 0, 1 ,1 ,0,
    -1,  1, 0, 0, 1, 0,
     1,  1, 0, 1, 1, 0 
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

