#version 300 es
precision highp float;

out vec4 FragColor;
in vec3 vColor;

void main() {
    FragColor = vec4(vColor,1.);
}