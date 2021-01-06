#version 300 es

precision highp float;

out vec4 FragColor;
in vec3 vColor;

//step(a,b)
//b >= a
//a < b
void main() {
    vec2 uv = vColor.xy;

    vec2 center = vec2(.5,.5);
    float radius = 0.5;
    float smoothConst = (1./939.) * 1.5;
    
    float dist = distance(uv,center); 
    float final = smoothstep(0.,radius,dist);
    float fractal = mod(final * 4.,1.);

    float final2 = smoothstep(radius-smoothConst,radius+smoothConst,fractal);

    FragColor = vec4(uv,vColor.z,1.);
    
}