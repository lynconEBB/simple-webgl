const createVertices = () => {
    const triangulo = new Float32Array([-1,1,0,0.5,1,0,-1,1,0]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,triangulo,gl.STATIC_DRAW);
    gl.vertexAttribPointer(0,3,gl.FLOAT,false,12,0);
    gl.enableVertexAttribArray(0);
    return vertexBuffer;
}

const createVertexShader = (program) => {

    const vertexShader = `#version 300 es
        precision highp float;
        layout (location = 0) in vec3 aPos;
    
        void main() {
            gl_Position = vec4(aPos.x,aPos.y,aPos.z,1.0);
        }
    `;
    const vertexShaderBuffer = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderBuffer,vertexShader);
    gl.compileShader(vertexShaderBuffer);
    //console.log(gl.getShaderInfoLog(vertexShaderBuffer));
    return vertexShaderBuffer;
}

const createFragmentShader = (program) => {
    const fragmentShader = `#version 300 es
        precision highp float;
        out vec4 FragColor;
        const vec4 cor = vec4(1.0,0.,0.,1.);
        void main() {
            FragColor = cor;
        }
    `;
    const fragmentShaderBuffer = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShaderBuffer,fragmentShader);
    gl.compileShader(fragmentShaderBuffer);
    //console.log(gl.getShaderInfoLog(fragmentShaderBuffer));
    return fragmentShaderBuffer;
}

const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl2");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
gl.clearColor(0,0,1,1);
gl.clear(gl.COLOR_BUFFER_BIT);

const program = gl.createProgram();
const vertexShaderBuffer = createFragmentShader(program);
const fragmentShaderBuffer = createVertexShader(program);
const vertexBuffer = createVertices();

gl.attachShader(program,fragmentShaderBuffer);
gl.attachShader(program,vertexShaderBuffer);
gl.linkProgram(program);
gl.useProgram(program);
gl.deleteShader(fragmentShaderBuffer);
gl.deleteShader(vertexShaderBuffer);


gl.drawArrays(gl.TRIANGLES,0,3);

    
    


