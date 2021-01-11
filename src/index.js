import {createGeometry, prepareProgram, draw} from "./js/utils";
import fragmentShader from "./assets/sixth.frag";
import vertexShader from "./assets/first.vert";
import "./scss/style.scss";

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
const gl = canvas.getContext("webgl2");
gl.viewport(0,0,canvas.width, canvas.height);
gl.clearColor(1.,1.,1.,1);
gl.clear(gl.COLOR_BUFFER_BIT);

const squareVertices = new Float32Array([
    -1, -1, 0, 0, 0 ,0,
     1, -1, 0, 1 ,0 ,0,
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
const timeUniform = gl.getUniformLocation(program,"time");
gl.useProgram(program);


const render = () => {
    
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    gl.uniform1f(timeUniform, performance.now());

    draw(gl, program, squareGeometry);

    gl.flush();
    requestAnimationFrame(render);
}
render();
// setInterval(render, 500);

// render();



