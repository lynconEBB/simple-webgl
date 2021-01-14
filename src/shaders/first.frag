#version 300 es

precision highp float;
precision highp int;

out vec4 FragColor;
in vec3 vColor;

vec4 applyCut(in vec2 uv, in vec2 cut) {
    vec2 mask = step(cut,uv);
    float finalMask = mask.x * mask.y;
    vec2 invertMask = (1. - finalMask) * uv; 
    vec2 r = invertMask + vec2(finalMask);
    return vec4(r,finalMask,1.);
}

void main() {
    vec2 uv = vColor.xy;
    vec2 cut = vec2(0.5);
    
    FragColor = applyCut(uv,cut);

}