const main = () => {
    const createGeometry = (verticesData,dataLayout) => {
        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,verticesData,gl.STATIC_DRAW);
        
        let stride = 0;
        for (const layout of dataLayout) {
            stride += layout.length;
        }
        stride *= 4;

        let offset = 0;
        for (let i = 0; i < dataLayout.length; i++) {
            gl.vertexAttribPointer(i, dataLayout[i].length, gl.FLOAT, false, stride, offset);
            gl.enableVertexAttribArray(i);
            offset += dataLayout[1].length * 4;
        }
        
        return {
            buffer: vertexBuffer,
            length: verticesData.byteLength / stride
        };
    }
    
    const createProgram = (vertexShaderSource, fragmentShaderSource) => {
        const vertexShaderBuffer = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShaderBuffer, vertexShaderSource);
        gl.compileShader(vertexShaderBuffer);
        const vertexShaderMessage = gl.getShaderInfoLog(vertexShaderBuffer); 
    
        const fragmentShaderBuffer = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShaderBuffer,fragmentShaderSource);
        gl.compileShader(fragmentShaderBuffer);
        const fragmentShaderMessage = gl.getShaderInfoLog(fragmentShaderBuffer); 
       
        if (fragmentShaderMessage === "" && vertexShaderMessage === "" ) {
            const program = gl.createProgram();
            gl.attachShader(program,fragmentShaderBuffer);
            gl.attachShader(program,vertexShaderBuffer);
            gl.linkProgram(program);
            gl.deleteShader(fragmentShaderBuffer);
            gl.deleteShader(vertexShaderBuffer);
    
            return program;
        } else {
            console.log(fragmentShaderMessage);
            console.log(vertexShaderMessage);

            return undefined;
        }
    }

    const draw = (program, geometry) => {
        gl.bindBuffer(gl.ARRAY_BUFFER,geometry.buffer);
        gl.useProgram(program);
        gl.drawArrays(gl.TRIANGLES,0,geometry.length);
    }

    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const gl = canvas.getContext("webgl2");
    gl.viewport(0,0,canvas.width, canvas.height);
    gl.clearColor(0,0,1,1);
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



    const triangle2Geometry = createGeometry(trinagle2Vertices,dataLayout2);
    const triangle1Geometry = createGeometry(trinagle1Vertices,dataLayout1);
    
    const program = createProgram(vertexShader,fragmentShader);
    const program2 = createProgram(vertexShader2,fragmentShader2);

    draw(program,triangle1Geometry);
    draw(program2,triangle2Geometry);
    
}

window.addEventListener("load",main);