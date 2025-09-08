#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    float pct = 0.0;
    pct = distance(st, vec2(0.5));
    vec2 toCenter = vec2(0.5) - st;
    
    pct = length(toCenter);

    vec2 tC = vec2(0.5) - st;

    pct = sqrt(tC.x * tC.x + tC.y * tC.y);

    vec3 color = vec3(pct);

    gl_FragColor = vec4(color, 1.0);
}