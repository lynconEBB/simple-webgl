export const createGeometry = (gl, verticesData, verticesIndices, dataLayout) => {
    const VAO = gl.createVertexArray();
    gl.bindVertexArray(VAO);

    const VBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,VBO);
    gl.bufferData(gl.ARRAY_BUFFER,verticesData,gl.STATIC_DRAW);

    const EBO = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,EBO);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,verticesIndices, gl.STATIC_DRAW);

    
    let stride = 0;
    for (const layout of dataLayout) {
        stride += layout.length;
    }
    stride *= 4;

    let offset = 0;
    for (let i = 0; i < dataLayout.length; i++) {
        gl.vertexAttribPointer(i, dataLayout[i].length, gl.FLOAT, false, stride, offset);
        gl.enableVertexAttribArray(i);
        offset += dataLayout[i].length * 4;
    }
    
    return {
        VBO,
        VAO,
        EBO,
        length: verticesIndices.length
    };
}

export const prepareProgram = (gl,vertexShaderSource, fragmentShaderSource) => {
    const vertexShaderBuffer = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderBuffer, vertexShaderSource);
    gl.compileShader(vertexShaderBuffer);
    const vertexShaderErrorMessage = gl.getShaderInfoLog(vertexShaderBuffer); 

    const fragmentShaderBuffer = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShaderBuffer,fragmentShaderSource);
    gl.compileShader(fragmentShaderBuffer);
    const fragmentShaderErrorMessage = gl.getShaderInfoLog(fragmentShaderBuffer); 
    
    if (fragmentShaderErrorMessage === "" && vertexShaderErrorMessage === "" ) {
        const program = gl.createProgram();
        gl.attachShader(program,fragmentShaderBuffer);
        gl.attachShader(program,vertexShaderBuffer);
        gl.linkProgram(program);
        gl.deleteShader(fragmentShaderBuffer);
        gl.deleteShader(vertexShaderBuffer);

        return program;
    } else {
        console.log(fragmentShaderErrorMessage);
        console.log(vertexShaderErrorMessage);

        return undefined;
    }
}

export const draw = (gl,program, geometry) => {
   
    gl.bindVertexArray(geometry.VAO);
   

    gl.drawElements(gl.TRIANGLES,geometry.length,gl.UNSIGNED_BYTE,0);

}
