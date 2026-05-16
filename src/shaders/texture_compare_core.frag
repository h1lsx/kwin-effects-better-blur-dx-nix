#version 140

uniform sampler2D texUnitOld;
uniform sampler2D texUnitNew;
uniform float borderIgnore;

in vec2 uv;

out vec4 fragColor;

void main() {
    if (any(greaterThan(abs(uv - 0.5), vec2(0.5 - borderIgnore)))) {
        discard;
    }

    vec4 colorOld = texture(texUnitOld, uv);
    vec4 colorNew = texture(texUnitNew, uv);

    // discard (almost) identical pixels (using squared vec distance)
    vec4 colorDiff = colorOld - colorNew;
    if (dot(colorDiff, colorDiff) < 0.001) {
        discard;
    }

    // not discarded -> different
    fragColor = vec4(1.0);
}
