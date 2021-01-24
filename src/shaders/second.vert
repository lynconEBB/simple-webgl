#version 300 es
precision highp float;

layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aColor;
out vec3 vColor;

uniform mat4 rotation;

void main() {
    mat4 teste = mat4(1., 0., 0., 0.,
                      0., 1., 0., 0.,
                      0., 0., 1., 0.,
                      0., 0., 0., 1.);
    gl_Position = rotation * vec4(aPos, 1.0);

    //gl_Position = teste * vec4(aPos, 1.0);
    vColor = aColor;
}
