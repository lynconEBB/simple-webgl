#version 300 es

precision highp float;

out vec4 FragColor;
in vec3 vColor;

float linearStep(in float edge1, in float edge2, in float x) {
    float a = x - edge1;
    float newEdge = edge2 - edge1;
    float b = a / newEdge;
    return clamp(b,0.,1.);
} 

//step(a,b)
//b >= a
//a < b
void main() {
    vec2 uv = vColor.xy;

    float gradient = linearStep(0.5,1.,uv.x);

    FragColor = vec4(vec3(gradient),1.);
}