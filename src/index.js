import { createEulerMatrix } from "./utils/matricesFactory";
import {createGeometry, prepareProgram, draw} from "./utils/utils";
import gl from "./utils/webGL";

const getShaders = async () => {
    const vertexShader = await (await fetch("./shaders/second.vert")).text();

    const fragmentShader = await (await fetch("./shaders/default.frag")).text();

    return {fragmentShader,vertexShader}
}

const main = (shaders) => {
    gl.viewport(0,0,window.innerWidth, window.innerHeight);
    gl.clearColor(0,1,1,1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    const {fragmentShader, vertexShader} = shaders;
    
    const squareVertices = new Float32Array([
        -0.5, -.5, 0, 0, 0 ,0,
         .5, -.5, 0, 1 ,0 ,0,
        -.5,  .5, 0, 0, 1, 0,
         .5,  .5, 0, 1, 1, 0 
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
    
    const squareGeometry = createGeometry(squareVertices,squareIndices, dataLayout);
    
    const program = prepareProgram(vertexShader,fragmentShader);
    
    const rotationMatrixUniform = gl.getUniformLocation(program,"rotation");
    const cameraWorldUniform = gl.getUniformLocation(program,"camera");
    
    gl.useProgram(program);

    const render = () => {
        gl.clear(gl.COLOR_BUFFER_BIT);
        let rotationMatrix = createEulerMatrix(performance.now()*.05,performance.now()*.005,performance.now()*.005)
      
        gl.uniformMatrix4fv(rotationMatrixUniform,false,rotationMatrix);
        
        draw(program, squareGeometry);
    
        requestAnimationFrame(render);
    }

    render();
}

getShaders().then(shaders => {
    main(shaders);
})
