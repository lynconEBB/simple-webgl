#version 300 es

precision highp float;

out vec4 FragColor;
in vec3 vColor;

uniform float time;

void main() {

    float time2 = (cos(time) + 1.) * .5;
    vec3 change = vColor * time2;
    
    FragColor = vec4(vColor.xy, time2, 1.);
    
}