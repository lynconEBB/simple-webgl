#version 300 es

precision highp float;

out vec4 FragColor;
in vec3 vColor;

uniform float time; 

vec2 rect(in vec2 uv, in vec2 pos, in vec2 size) {
    vec2 finalPos = vec2((pos.x + size.x),(pos.y + size.y));
    
    vec2 resultPos = step(pos,uv);
    vec2 resultFinalPos = step(uv,finalPos);

    vec2 result = resultPos * resultFinalPos;
    float finalResul = result.x * result.y;
    
    return vec2(finalResul);
}

void main() {
    vec2 uv = vColor.xy;
    vec2 size = vec2(0.25,0.5);
    vec2 pos = vec2(0.25,0.25);
    
    vec2 mask = rect(uv,pos,size);
    vec2 maskedUV = mask * uv;

    FragColor = vec4(maskedUV,0.,1.);
}