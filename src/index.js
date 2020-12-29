import {createGeometry, prepareProgram, draw} from "./js/utils";
import "./scss/style.scss";

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

const trinagle1Vertices = new Float32Array([
    -1,  1, 0, 1, 0 ,0,
    -1, -1, 0, 0 ,1 ,0,
        1, -1, 0, 0, 0, 1
]);
const dataLayout1 = [
    {
        name: "position",
        length: 3,
    },
    {
        name: "color",
        length: 3
    }
]

const vertexShader2 = `#version 300 es
    precision highp float;

    layout (location = 0) in vec3 aPos;
    layout (location = 1) in vec4 aColor;
    out vec4 vColor;

    void main() {
        gl_Position = vec4(aPos.x, aPos.y, aPos.z, 1.0);
        vColor = aColor;
    }
`;

const fragmentShader2 = `#version 300 es
    precision highp float;

    out vec4 FragColor;
    in vec4 vColor;

    void main() {
        FragColor = vColor;
    }
`;

const trinagle2Vertices = new Float32Array([
    -1,  1, 0, 1, 0, 0, 1,
        1,  1, 0, 0, 1, 0, 1,
        1, -1, 0, 0, 0, 1, 1
]);

const dataLayout2 = [
    {
        name: "position",
        length: 3,
    },
    {
        name: "color",
        length: 4
    }
];

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
const gl = canvas.getContext("webgl2");
gl.viewport(0,0,canvas.width, canvas.height);
gl.clearColor(0,0,1,1);
gl.clear(gl.COLOR_BUFFER_BIT);

const triangle2Geometry = createGeometry(gl,trinagle2Vertices,dataLayout2);
const triangle1Geometry = createGeometry(gl,trinagle1Vertices,dataLayout1);
console.log(draw);
const program = prepareProgram(gl,vertexShader,fragmentShader);
const program2 = prepareProgram(gl,vertexShader2,fragmentShader2);

draw(gl,program,triangle1Geometry);
draw(gl,program2,triangle2Geometry);
