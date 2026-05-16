uniform sampler2D texUnitOld;
uniform sampler2D texUnitNew;
uniform float borderIgnore;

varying vec2 uv;

void main() {
    if (any(greaterThan(abs(uv - 0.5), vec2(0.5 - borderIgnore)))) {
        discard;
    }

    vec4 colorOld = texture2D(texUnitOld, uv);
    vec4 colorNew = texture2D(texUnitNew, uv);

    // discard (almost) identical pixels (using squared vec distance)
    vec4 colorDiff = colorOld - colorNew;
    if (dot(colorDiff, colorDiff) < 0.001) {
        discard;
    }

    // not discarded -> different
    gl_FragColor = vec4(1.0);
}
