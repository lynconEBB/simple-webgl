#version 300 es

precision highp float;

out vec4 FragColor;
in vec3 vColor;

uniform float time; 

void main() {
    vec2 uv = vColor.xy;
    
    FragColor = vec4(uv.xxx,1.);
}