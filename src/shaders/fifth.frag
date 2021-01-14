#version 300 es

precision highp float;

out vec4 FragColor;
in vec3 vColor;

//step(a,b)
//b >= a
//a < b
void main() {
    vec2 uv = vColor.xy;

    float limit1 = step(.25,uv.x);
    float limit2 = step(uv.x,.5);
    float mask = limit1 * limit2;

    float smallGradient = (uv.x - .25) * 4.;
    float maskedGradient = smallGradient * mask;
    
    float invertedMask = 1. - mask;
    float backgroundGradient = uv.x * invertedMask;
    float finalGradient = backgroundGradient + maskedGradient;

    FragColor = vec4(0.,finalGradient,0.,1.);
    
}