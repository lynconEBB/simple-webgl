#version 300 es

precision highp float;

out vec4 FragColor;
in vec3 vColor;

uniform float time;

vec3 rect(in vec2 uv, in vec2 center) {
    vec2 finalPos = vec2((pos.x + size.x),(pos.y + size.y));
    
    vec2 resultPos = step(pos,uv);
    vec2 resultFinalPos = step(uv,finalPos);

    vec2 result = resultPos * resultFinalPos;
    float finalResul = result.x * result.y;
    
    return vec3(finalResul);
}

void main() {
    vec2 uv = vColor.xy;
    vec2 sizeRect1 = vec2(0.5,0.5);
    vec2 sizeRect2 = vec2(0.5,0.5);

    float uvY = (uv.y * 2.) - 1.5;
    float uvX = (uv.x * 2.) - 0.5;

    float uvY2 = (uv.y * 2.) - 1.5;
    float uvX2 = (uv.x * 2.) - 1.5;

    vec2 newUv = vec2(uvX,uvY);  
    mat2 counterClockRotation = mat2(cos(time),sin(time),-sin(time),cos(time));  
    vec2 rotatedUv = newUv * counterClockRotation;
    vec3 maskRect = rect(rotatedUv,posRect1,sizeRect1);

   
    vec2 newUv2 = vec2(uvX2,uvY2); 
    mat2 clockWiseRotation = mat2(cos(-time),sin(-time),-sin(-time),cos(-time));
    vec2 rotatedUv2 = newUv2 * clockWiseRotation;
    vec3 maskRect2 = rect(rotatedUv2,posRect1,sizeRect1);
    vec3 joined = maskRect + maskRect2;
    FragColor = vec4(joined, 1.);
    
}