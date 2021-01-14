#version 300 es

precision highp float;

out vec4 FragColor;
in vec3 vColor;

uniform float time; 

vec3 rect(in vec2 uv, in vec2 pos, in vec2 size) {
    vec2 finalPos = vec2((pos.x + size.x),(pos.y + size.y));
    
    vec2 resultPos = step(pos,uv);
    vec2 resultFinalPos = step(uv,finalPos);

    vec2 result = resultPos * resultFinalPos;
    float finalResul = result.x * result.y;
    
    return vec3(finalResul);
}

vec3 joinMasks(in vec3 mask1, in vec3 mask2) {
    vec3 finalMask = mask1 + mask2;
    return min(finalMask, vec3(1.,1.,1.));

}

void main() {
    vec2 uv = vColor.xy;
    vec3 orangeColor = vec3(1.,1.,0.);
    vec3 purpleColor = vec3(1.,0.,1.);

    vec2 sizeRect1 = vec2(0.25,0.25);
    vec2 posRect1 = vec2(0.25,0.25);
    vec3 maskRect1 = rect(uv,posRect1,sizeRect1);

    vec2 sizeRect2 = vec2(0.25,0.25);
    vec2 posRect2 = vec2(0.5,0.5);
    vec3 maskRect2 = rect(uv,posRect2,sizeRect2);

    vec3 maskedPurpleColor = maskRect1 * purpleColor;
    vec3 maskedOrangeColor = maskRect2 * orangeColor;

    vec3 finalMask = maskedOrangeColor + maskedPurpleColor;

    FragColor = vec4(finalMask,1.);
}