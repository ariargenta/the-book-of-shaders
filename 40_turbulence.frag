#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
    return mod289(((x * 34.0) + 1.0) * x);
}

float snoise(vec2 v) {
    const float Cx = (3.0 - sqrt(3.0)) / 6.0;
    const float Cy = 0.5 * (sqrt(3.0) - 1.0);
    const float Cz = -1.0 + 2.0 * Cx;
    const float Cw = 1.0 / 41.0;
    const vec4 C = vec4(Cx, Cy, Cz, Cw);
    
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = vec2(0.0);

    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);

    vec2 x1 = x0.xy + C.xx - i1;
    vec2 x2 = x0.xy + C.zz;

    i = mod289(i);

    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));

    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2)), 0.0);

    m = m * m;
    m = m * m;

    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    m *= inversesqrt(a0 * a0 + h * h);

    vec3 g = vec3(0.0);

    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * vec2(x1.x, x2.x) + h.yz * vec2(x1.y, x2.y);

    return 130.0 * dot(m, g);
}

#define OCTAVES 3

float turbulence(in vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 0.0;

    for(int i = 0; i < OCTAVES; ++i) {
        value += amplitude * abs(snoise(st));
        st *= 2.0;
        amplitude *= 0.5;
    }

    return value;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;

    st.x *= u_resolution.x / u_resolution.y;

    vec3 color = vec3(0.0);

    color += turbulence(st * 3.0);

    gl_FragColor = vec4(color, 1.0);
}