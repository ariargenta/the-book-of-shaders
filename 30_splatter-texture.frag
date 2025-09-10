#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2(vec2 st) {
    st = vec2(dot(st, vec2(127.1, 311.7)), dot(st, vec2(269.5, 183.3)));

    return -1.0 + 2.0 * fract(sin(st) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(mix(dot(random2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)), dot(random2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x), mix(dot(random2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(random2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;

    st.x *= u_resolution.x / u_resolution.y;

    vec3 color = vec3(0.0);
    float t = 1.0;
    
    t = abs(1.0 - sin(u_time * 0.1)) * 5.0;
    st  += noise(st * 2.0) * t;
    color = vec3(1.0) * smoothstep(0.18, 0.2, noise(st));
    color += smoothstep(0.15, 0.2, noise(st * 10.0));
    color -= smoothstep(0.35, 0.4, noise(st * 10.0));

    gl_FragColor = vec4(1.0 - color, 1.0);
}