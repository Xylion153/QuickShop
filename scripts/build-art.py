"""Draws the product illustrations in public/art/products/ (studio-style SVGs: backdrop, soft shadow, shaded object).

They stand in for real photos until the owner adds his own (put photos in /public/products/ and list them in the
catalog). Run: python3 scripts/build-art.py
"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "public" / "art" / "products"

BACKDROPS = {
    "parts": ("#f3f6f8", "#d8dfe5"),
    "fragrance": ("#f8f1fb", "#e2d5ee"),
    "appliances": ("#faf6ef", "#e6ddcf"),
}

DEFS = """
<linearGradient id="mH" x1="0" x2="1"><stop offset="0" stop-color="#78818a"/><stop offset=".38" stop-color="#f1f4f6"/><stop offset=".6" stop-color="#c2c9cf"/><stop offset="1" stop-color="#69717a"/></linearGradient>
<linearGradient id="mV" y1="0" y2="1" x1="0" x2="0"><stop offset="0" stop-color="#f6f8f9"/><stop offset=".5" stop-color="#b8bfc6"/><stop offset="1" stop-color="#78818a"/></linearGradient>
<linearGradient id="wP" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dde3e8"/></linearGradient>
<linearGradient id="wPH" x1="0" x2="1"><stop offset="0" stop-color="#e4e9ed"/><stop offset=".35" stop-color="#ffffff"/><stop offset="1" stop-color="#c9d1d8"/></linearGradient>
<linearGradient id="bP" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#4b525b"/><stop offset="1" stop-color="#14171b"/></linearGradient>
<linearGradient id="bPH" x1="0" x2="1"><stop offset="0" stop-color="#262a30"/><stop offset=".4" stop-color="#5a616b"/><stop offset="1" stop-color="#181b1f"/></linearGradient>
<linearGradient id="br" x1="0" x2="1"><stop offset="0" stop-color="#a77b22"/><stop offset=".45" stop-color="#fbe5a6"/><stop offset="1" stop-color="#b58b2e"/></linearGradient>
<linearGradient id="rub" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#454b54"/><stop offset="1" stop-color="#0e1013"/></linearGradient>
<linearGradient id="gl" x1="0" x2="1"><stop offset="0" stop-color="#cfdde6" stop-opacity=".75"/><stop offset=".3" stop-color="#ffffff" stop-opacity=".55"/><stop offset="1" stop-color="#b7c7d2" stop-opacity=".7"/></linearGradient>
<linearGradient id="shine" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="13"/></filter>
<filter id="glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="6"/></filter>
"""


def svg(body: str, kind: str = "parts", extra_defs: str = "") -> str:
    top, bottom = BACKDROPS[kind]
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs>
<linearGradient id="bg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="{top}"/><stop offset=".62" stop-color="{top}"/><stop offset="1" stop-color="{bottom}"/></linearGradient>
<radialGradient id="spot" cx=".5" cy=".38" r=".55"><stop offset="0" stop-color="#fff" stop-opacity=".8"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
{DEFS}{extra_defs}</defs>
<rect width="600" height="600" fill="url(#bg)"/><rect width="600" height="600" fill="url(#spot)"/>
{body}
</svg>
"""


def shadow(cx, cy, rx, ry, op=0.24):
    return f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="#1b2026" opacity="{op}" filter="url(#blur)"/>'


def terminals(xs, y, h=52, w=17):
    return "".join(
        f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="2" fill="url(#br)"/><circle cx="{x + w / 2}" cy="{y + h - 14}" r="3.5" fill="#7d5c15"/>'
        for x in xs
    )


def label(x, y, w, h):
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="4" fill="#f6f5f0"/>'
            f'<rect x="{x + 12}" y="{y + 14}" width="{w * .6:.0f}" height="8" rx="4" fill="#8f979f"/>'
            f'<rect x="{x + 12}" y="{y + 30}" width="{w * .4:.0f}" height="6" rx="3" fill="#b8bec4"/>'
            f'<rect x="{x + 12}" y="{y + h - 18}" width="{w * .7:.0f}" height="6" rx="1" fill="#2b2f35" opacity=".55"/>')


# ---------------------------------------------------------------- appliance parts
ART = {}

ART["rotary-switch"] = svg(
    shadow(300, 478, 160, 24)
    + terminals([218 + i * 29 for i in range(6)], 428)
    + '<rect x="205" y="258" width="190" height="176" rx="10" fill="url(#bPH)"/>'
    + label(235, 300, 130, 74)
    + '<rect x="166" y="232" width="268" height="30" rx="6" fill="url(#mV)"/>'
    + '<circle cx="190" cy="247" r="8" fill="#6d757e"/><circle cx="410" cy="247" r="8" fill="#6d757e"/>'
    + '<rect x="272" y="206" width="56" height="30" rx="6" fill="url(#mH)"/>'
    + '<rect x="287" y="96" width="26" height="118" fill="url(#mH)"/><rect x="287" y="96" width="9" height="84" fill="#fff" opacity=".35"/>'
    + '<ellipse cx="300" cy="96" rx="13" ry="5" fill="#eef1f3"/>'
)

ART["push-switch"] = svg(
    shadow(300, 472, 130, 20)
    + terminals([250, 333], 384, h=78, w=18)
    + '<rect x="190" y="296" width="36" height="46" rx="6" fill="url(#wPH)"/><rect x="374" y="296" width="36" height="46" rx="6" fill="url(#wPH)"/>'
    + '<rect x="214" y="246" width="172" height="152" rx="16" fill="url(#wPH)"/>'
    + '<rect x="214" y="246" width="172" height="22" rx="11" fill="#fff"/>'
    + '<circle cx="300" cy="336" r="18" fill="none" stroke="#cbd2d8" stroke-width="4"/>'
    + '<rect x="268" y="160" width="64" height="94" rx="12" fill="url(#bPH)"/>'
    + '<ellipse cx="300" cy="162" rx="32" ry="10" fill="#646c76"/>'
)

ART["thermostat"] = svg(
    shadow(300, 462, 150, 22)
    + '<ellipse cx="300" cy="412" rx="72" ry="20" fill="url(#mH)"/>'
    + '<ellipse cx="300" cy="388" rx="158" ry="42" fill="url(#mH)"/>'
    + '<ellipse cx="174" cy="388" rx="14" ry="6" fill="#5d656e"/><ellipse cx="426" cy="388" rx="14" ry="6" fill="#5d656e"/>'
    + '<rect x="216" y="300" width="168" height="86" fill="url(#wPH)"/>'
    + '<ellipse cx="300" cy="386" rx="84" ry="22" fill="#d9dfe4" opacity=".7"/>'
    + '<ellipse cx="300" cy="300" rx="84" ry="25" fill="#fbfcfd" stroke="#d6dce1" stroke-width="2"/>'
    + terminals([254, 329], 196, h=112, w=18)
)

ART["fuse"] = svg(
    shadow(300, 444, 190, 18)
    + '<rect x="132" y="326" width="86" height="28" rx="4" fill="url(#br)"/><circle cx="152" cy="340" r="5" fill="#7d5c15"/>'
    + '<rect x="382" y="326" width="86" height="28" rx="4" fill="url(#br)"/><circle cx="448" cy="340" r="5" fill="#7d5c15"/>'
    + '<rect x="176" y="378" width="248" height="22" rx="5" fill="url(#mV)"/>'
    + '<rect x="200" y="292" width="200" height="94" rx="12" fill="url(#wP)" stroke="#cfd6dc" stroke-width="2"/>'
    + '<ellipse cx="300" cy="338" rx="38" ry="28" fill="url(#mH)"/>'
)

ART["relay"] = svg(
    shadow(300, 470, 160, 22)
    + '<polygon points="390,262 432,222 432,384 390,424" fill="#16191d"/>'
    + '<rect x="208" y="262" width="182" height="162" fill="url(#bPH)"/>'
    + '<polygon points="208,262 250,222 432,222 390,262" fill="#5e6670"/>'
    + label(232, 296, 134, 74)
    + "".join(f'<rect x="{x}" y="188" width="15" height="48" rx="2" fill="url(#br)"/>' for x in (276, 316, 356))
)

ART["spring"] = svg(
    shadow(300, 452, 190, 16)
    + '<g transform="rotate(-14 300 300)">'
    + '<ellipse cx="146" cy="300" rx="26" ry="32" fill="none" stroke="#7c858e" stroke-width="8"/>'
    + '<ellipse cx="454" cy="300" rx="26" ry="32" fill="none" stroke="#7c858e" stroke-width="8"/>'
    + "".join(
        f'<ellipse cx="{180 + i * 21}" cy="300" rx="13" ry="44" fill="none" stroke="#868f98" stroke-width="8"/>'
        f'<path d="M{176 + i * 21} 262 q6 -6 10 2" fill="none" stroke="#f4f6f8" stroke-width="3" stroke-linecap="round"/>'
        for i in range(14))
    + "</g>"
)

ART["cord"] = svg(
    shadow(300, 476, 200, 20)
    + "".join(f'<ellipse cx="{250 + d}" cy="{338 - d / 2}" rx="{128 - d}" ry="{70 - d / 3}" fill="none" stroke="#1d2025" stroke-width="15"/>'
              f'<ellipse cx="{250 + d}" cy="{338 - d / 2}" rx="{128 - d}" ry="{70 - d / 3}" fill="none" stroke="#5a616b" stroke-width="2.5" stroke-dasharray="90 400" stroke-dashoffset="{d * 7}"/>'
              for d in (0, 14, 28))
    + '<path d="M370 330 C 410 330 420 360 410 390" fill="none" stroke="#1d2025" stroke-width="15" stroke-linecap="round"/>'
    + '<rect x="404" y="255" width="16" height="62" rx="2" fill="url(#mH)"/><rect x="448" y="255" width="16" height="62" rx="2" fill="url(#mH)"/>'
    + '<rect x="427" y="244" width="15" height="50" rx="7" fill="url(#mH)"/>'
    + '<rect x="384" y="300" width="100" height="112" rx="20" fill="url(#bPH)"/>'
    + '<rect x="96" y="384" width="74" height="46" rx="6" fill="url(#wPH)"/><path d="M170 406 C 200 406 200 390 215 380" fill="none" stroke="#1d2025" stroke-width="13"/>'
)

ART["sensor"] = svg(
    shadow(300, 460, 220, 16)
    + '<g transform="rotate(-16 300 300)">'
    + '<rect x="96" y="288" width="330" height="24" rx="12" fill="url(#mV)"/>'
    + '<rect x="96" y="290" width="330" height="6" rx="3" fill="#fff" opacity=".6"/>'
    + '<rect x="412" y="250" width="54" height="100" rx="12" fill="url(#mH)"/>'
    + '<circle cx="439" cy="270" r="6" fill="#5d656e"/><circle cx="439" cy="330" r="6" fill="#5d656e"/>'
    + '</g>'
    + '<path d="M455 300 C 520 330 520 410 448 426" fill="none" stroke="#e9ecef" stroke-width="9" stroke-linecap="round"/>'
    + '<path d="M455 300 C 520 330 520 410 448 426" fill="none" stroke="#b8c0c7" stroke-width="2" stroke-dasharray="1 9"/>'
    + '<rect x="384" y="408" width="70" height="40" rx="6" fill="url(#wPH)" stroke="#c9d0d6" stroke-width="2"/>'
)

ART["belt"] = svg(
    shadow(300, 452, 230, 24)
    + '<ellipse cx="300" cy="322" rx="208" ry="98" fill="none" stroke="url(#rub)" stroke-width="30"/>'
    + '<ellipse cx="300" cy="322" rx="194" ry="86" fill="none" stroke="#3c424a" stroke-width="2" stroke-dasharray="5 9"/>'
    + '<path d="M120 290 C 170 228 260 214 330 218" fill="none" stroke="#6e7680" stroke-width="3" stroke-linecap="round"/>'
)


def basket(wire="#f9fbfc", outline="#aeb7bf"):
    def lines(c, w):
        back = "".join(f'<line x1="{146 + i * 34.2:.0f}" y1="214" x2="{150 + i * 33.3:.0f}" y2="352" stroke="{c}" stroke-width="{w}"/>' for i in range(10))
        bottom = f'<path d="M122 436 L150 352 L450 352 L478 436" fill="none" stroke="{c}" stroke-width="{w}"/>'
        front = "".join(f'<line x1="{98 + i * 33.6:.0f}" y1="300" x2="{122 + i * 29.7:.0f}" y2="436" stroke="{c}" stroke-width="{w}"/>' for i in range(13))
        rails = (f'<line x1="110" y1="368" x2="490" y2="368" stroke="{c}" stroke-width="{w}"/>'
                 f'<line x1="122" y1="436" x2="478" y2="436" stroke="{c}" stroke-width="{w + 2}"/>'
                 f'<path d="M98 300 L146 214 L454 214 L502 300 Z" fill="none" stroke="{c}" stroke-width="{w + 3}" stroke-linejoin="round"/>')
        return back, bottom + front + rails
    back_o, front_o = lines(outline, 8)
    back_w, front_w = lines(wire, 5)
    return svg(shadow(300, 474, 220, 22) + '<g opacity=".6">' + back_o + back_w + "</g>" + front_o + front_w)


ART["basket"] = basket()

ART["element"] = svg(
    shadow(300, 458, 230, 18)
    + "".join(f'<path d="M150 410 L150 250 Q150 222 178 222 L424 222 Q452 222 452 250 L452 284 Q452 312 424 312 L210 312 Q182 312 182 340 L182 350 Q182 378 210 378 L452 378 L452 410" fill="none" stroke="{c}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"/>'
              for c, w in (("#3f444b", 24), ("#6f767e", 14), ("#a9b0b7", 5)))
    + '<rect x="118" y="400" width="370" height="30" rx="8" fill="url(#mV)"/>'
    + '<rect x="141" y="428" width="18" height="34" rx="2" fill="url(#br)"/><rect x="443" y="428" width="18" height="34" rx="2" fill="url(#br)"/>'
)


def tray(depth=0, slot=False):
    d = depth
    body = (f'<path d="M110 {246 - d} L150 {196 - d} L450 {196 - d} L490 {246 - d} Z" fill="#ffffff" opacity=".45"/>'
            f'<path d="M150 {196 - d} L450 {196 - d} L450 {360 - d} L150 {360 - d} Z" fill="#c7d4dd" opacity=".45"/>'
            f'<path d="M110 {246 - d} L490 {246 - d} L468 430 L132 430 Z" fill="url(#gl)" stroke="#a9b8c3" stroke-width="3"/>'
            f'<path d="M150 {270 - d} L210 {270 - d} L170 420 L140 420 Z" fill="#fff" opacity=".45"/>'
            f'<rect x="110" y="{246 - d}" width="380" height="24" rx="6" fill="url(#wP)" stroke="#cdd5db" stroke-width="2"/>')
    if slot:
        body += f'<rect x="232" y="{290 - d}" width="136" height="34" rx="17" fill="#fff" opacity=".85" stroke="#a9b8c3" stroke-width="3"/>'
    return svg(shadow(300, 466, 220, 22) + body)


ART["door-bin"] = tray()
ART["crisper"] = tray(depth=40, slot=True)

ART["handle"] = svg(
    shadow(300, 446, 230, 14)
    + '<g transform="rotate(-18 300 300)">'
    + '<rect x="140" y="304" width="34" height="70" rx="8" fill="url(#mH)"/><rect x="426" y="304" width="34" height="70" rx="8" fill="url(#mH)"/>'
    + '<rect x="100" y="270" width="400" height="42" rx="21" fill="url(#mV)"/>'
    + '<rect x="120" y="276" width="360" height="8" rx="4" fill="#fff" opacity=".7"/>'
    + '</g>'
)

ART["shelf-glass"] = svg(
    shadow(300, 456, 240, 20)
    + '<path d="M118 336 L182 238 L496 238 L452 336 Z" fill="url(#gl)" stroke="#b3c6d1" stroke-width="3"/>'
    + '<path d="M230 252 L300 252 L262 320 L196 320 Z" fill="#fff" opacity=".55"/>'
    + '<path d="M118 336 L452 336 L452 364 L118 364 Z" fill="url(#wP)" stroke="#cbd3d9" stroke-width="2"/>'
    + '<path d="M452 336 L496 238 L496 264 L452 364 Z" fill="#cfd7dd"/>'
)

ART["shelf-wire"] = svg(
    shadow(300, 450, 230, 18)
    + "".join(f'<line x1="{140 + i * 30}" y1="340" x2="{196 + i * 27.5}" y2="236" stroke="#b6bec6" stroke-width="7"/>'
              f'<line x1="{140 + i * 30}" y1="340" x2="{196 + i * 27.5}" y2="236" stroke="#f3f6f8" stroke-width="3"/>' for i in range(12))
    + '<path d="M130 340 L190 236 L500 236 L460 340 Z" fill="none" stroke="#9ea7b0" stroke-width="10" stroke-linejoin="round"/>'
    + '<path d="M130 340 L190 236 L500 236 L460 340 Z" fill="none" stroke="#eef1f3" stroke-width="3" stroke-linejoin="round"/>'
)

ART["end-cap"] = svg(
    shadow(300, 456, 190, 20)
    + "".join(f'<rect x="{x}" y="{y}" width="132" height="104" rx="22" fill="url(#wPH)" stroke="#cbd2d8" stroke-width="2"/>'
              f'<ellipse cx="{x + 66}" cy="{y + 4}" rx="62" ry="16" fill="#fff" stroke="#d3d9de" stroke-width="2"/>'
              f'<rect x="{x + 40}" y="{y - 4}" width="52" height="14" rx="7" fill="#a8b1b9"/>'
              for x, y in ((158, 300), (318, 268)))
)


def knob(face, side, dark):
    return svg(
        shadow(300, 456, 160, 22)
        + f'<ellipse cx="300" cy="392" rx="150" ry="44" fill="{dark}"/>'
        + f'<ellipse cx="300" cy="384" rx="146" ry="40" fill="{side}"/>'
        + f'<path d="M200 278 L200 384 A100 30 0 0 0 400 384 L400 278 Z" fill="{side}"/>'
        + "".join(f'<line x1="{x}" y1="292" x2="{x}" y2="{382 + (1 - abs(x - 300) / 100) * 26:.0f}" stroke="{dark}" stroke-width="3" opacity=".45"/>' for x in range(212, 392, 14))
        + '<path d="M200 278 L200 384 A100 30 0 0 0 400 384 L400 278 Z" fill="url(#shine)" opacity=".35"/>'
        + f'<ellipse cx="300" cy="278" rx="100" ry="30" fill="{face}"/>'
        + f'<line x1="300" y1="278" x2="300" y2="304" stroke="{dark}" stroke-width="8" stroke-linecap="round"/>'
    )


ART["knob-bisque"] = knob("#f3ead6", "#dccaa3", "#a89268")
ART["knob-grey"] = knob("#eef1f3", "#c9d0d6", "#7f8891")

ART["pulley"] = svg(
    shadow(300, 460, 140, 20)
    + '<rect x="160" y="290" width="150" height="22" rx="4" fill="url(#mV)"/>'
    + '<ellipse cx="330" cy="300" rx="70" ry="124" fill="#c6cdd3"/>'
    + '<path d="M300 176 L330 176 L330 424 L300 424 Z" fill="#9aa3ab"/>'
    + '<ellipse cx="300" cy="300" rx="70" ry="124" fill="url(#wPH)" stroke="#c7ced4" stroke-width="2"/>'
    + '<ellipse cx="300" cy="300" rx="44" ry="80" fill="none" stroke="#d5dbe0" stroke-width="6"/>'
    + '<ellipse cx="300" cy="300" rx="20" ry="36" fill="url(#mH)"/>'
)

ART["screw"] = svg(
    shadow(300, 452, 180, 16)
    + "".join(
        f'<g transform="translate({dx} {dy}) rotate(-28 300 300)">'
        '<rect x="282" y="250" width="36" height="200" fill="url(#mH)"/>'
        + "".join(f'<path d="M280 {270 + i * 16} L320 {262 + i * 16}" stroke="#6f7780" stroke-width="3"/>' for i in range(11))
        + '<path d="M282 450 L300 482 L318 450 Z" fill="#8b949c"/>'
        '<ellipse cx="300" cy="252" rx="54" ry="20" fill="#8b949c"/><ellipse cx="300" cy="244" rx="54" ry="20" fill="url(#mH)"/>'
        '<path d="M276 244 L324 244 M300 236 L300 252" stroke="#59616a" stroke-width="5" stroke-linecap="round"/>'
        "</g>"
        for dx, dy in ((-80, -10), (80, -40)))
)

ART["fan-motor"] = svg(
    shadow(300, 466, 190, 22)
    + '<path d="M230 392 C 220 440 150 430 130 450" fill="none" stroke="#e8ebee" stroke-width="8" stroke-linecap="round"/>'
    + '<path d="M250 392 C 250 446 180 450 166 470" fill="none" stroke="#2b2f35" stroke-width="8" stroke-linecap="round"/>'
    + '<rect x="100" y="430" width="62" height="40" rx="6" fill="url(#wPH)" stroke="#c9d0d6" stroke-width="2"/>'
    + '<rect x="186" y="262" width="190" height="130" rx="14" fill="url(#mV)"/>'
    + '<ellipse cx="186" cy="327" rx="28" ry="65" fill="#2d3238"/>'
    + '<ellipse cx="376" cy="327" rx="28" ry="65" fill="url(#mH)"/>'
    + '<rect x="390" y="318" width="60" height="18" fill="url(#mV)"/>'
    + '<g transform="translate(470 327)">' + "".join(f'<path d="M0 0 C 20 -30 60 -40 70 -18 C 50 -8 20 -2 0 0 Z" fill="#30353c" transform="rotate({a} 0 0) scale(.9 1.1)"/>' for a in (0, 120, 240))
    + '<circle r="14" fill="#1d2025"/></g>'
)

ART["feet"] = svg(
    shadow(300, 462, 180, 18)
    + "".join(
        f'<rect x="{x - 14}" y="{top}" width="28" height="{400 - top}" fill="url(#mH)"/>'
        + "".join(f'<path d="M{x - 15} {top + 10 + i * 13} L{x + 15} {top + 4 + i * 13}" stroke="#6f7780" stroke-width="3"/>' for i in range((400 - top - 14) // 13))
        + f'<rect x="{x - 26}" y="{top - 8}" width="52" height="18" rx="3" fill="url(#mH)"/>'
        + f'<path d="M{x - 52} 400 L{x + 52} 400 L{x + 48} 432 A48 12 0 0 1 {x - 48} 432 Z" fill="url(#rub)"/>'
        + f'<ellipse cx="{x}" cy="400" rx="52" ry="13" fill="#4d535c"/>'
        for x, top in ((230, 210), (380, 180)))
)

ART["rail"] = svg(
    shadow(300, 440, 240, 14)
    + '<g transform="rotate(-14 300 300)">'
    + '<rect x="74" y="292" width="452" height="40" rx="8" fill="url(#wPH)" stroke="#c6ced5" stroke-width="2"/>'
    + '<rect x="74" y="280" width="452" height="18" rx="6" fill="#ffffff" stroke="#cfd6dc" stroke-width="2"/>'
    + '<line x1="90" y1="314" x2="510" y2="314" stroke="#d4dae0" stroke-width="3"/>'
    + '</g>'
)

ART["led-strip"] = svg(
    shadow(300, 438, 230, 14)
    + '<g transform="rotate(-12 300 300)">'
    + '<rect x="96" y="282" width="400" height="42" rx="8" fill="url(#wP)" stroke="#c9d1d7" stroke-width="2"/>'
    + "".join(f'<circle cx="{140 + i * 64}" cy="303" r="24" fill="#fff4c2" filter="url(#glow)"/><rect x="{127 + i * 64}" y="294" width="26" height="18" rx="3" fill="#fffdf0" stroke="#e8dca0" stroke-width="2"/>' for i in range(6))
    + '</g>'
    + '<path d="M494 258 C 540 250 548 300 520 330" fill="none" stroke="#2b2f35" stroke-width="7" stroke-linecap="round"/>'
    + '<rect x="494" y="322" width="52" height="34" rx="5" fill="url(#wPH)" stroke="#c9d0d6" stroke-width="2"/>'
)

ART["gasket"] = svg(
    shadow(300, 470, 230, 22)
    + '<g transform="translate(0 70) scale(1 .78)">'
    + '<rect x="118" y="150" width="364" height="290" rx="30" fill="none" stroke="#8d969f" stroke-width="34"/>'
    + '<rect x="118" y="150" width="364" height="290" rx="30" fill="none" stroke="#c9d0d6" stroke-width="18"/>'
    + '<rect x="118" y="150" width="364" height="290" rx="30" fill="none" stroke="#eef1f3" stroke-width="4" transform="translate(-4 -6)"/>'
    + '</g>'
)

# ---------------------------------------------------------------- fragrance (generic sample bottles, no brands)
FRAG = """<linearGradient id="liqL" x1="0" x2="1"><stop offset="0" stop-color="#8d74b8"/><stop offset=".45" stop-color="#cbb7ea"/><stop offset="1" stop-color="#6e5799"/></linearGradient>
<linearGradient id="liqA" x1="0" x2="1"><stop offset="0" stop-color="#c7832c"/><stop offset=".45" stop-color="#f6c77f"/><stop offset="1" stop-color="#a6641a"/></linearGradient>
<linearGradient id="liqB" x1="0" x2="1"><stop offset="0" stop-color="#4f8aa6"/><stop offset=".45" stop-color="#a9d8ea"/><stop offset="1" stop-color="#3c6f87"/></linearGradient>
<linearGradient id="cap" x1="0" x2="1"><stop offset="0" stop-color="#121417"/><stop offset=".4" stop-color="#4b525b"/><stop offset="1" stop-color="#0d0f12"/></linearGradient>
<linearGradient id="gold" x1="0" x2="1"><stop offset="0" stop-color="#9b7426"/><stop offset=".45" stop-color="#f8e3a4"/><stop offset="1" stop-color="#a77d2c"/></linearGradient>"""


def bottle_tall(liq="liqL"):
    return (shadow(300, 486, 110, 18)
            + '<rect x="268" y="118" width="64" height="70" rx="6" fill="url(#cap)"/><rect x="276" y="122" width="10" height="62" rx="5" fill="#fff" opacity=".18"/>'
            + '<rect x="280" y="186" width="40" height="22" fill="url(#gold)"/>'
            + '<rect x="200" y="206" width="200" height="276" rx="22" fill="url(#gl)"/>'
            + f'<rect x="214" y="238" width="172" height="228" rx="14" fill="url(#{liq})"/>'
            + '<rect x="200" y="456" width="200" height="26" rx="12" fill="#fff" opacity=".35"/>'
            + '<rect x="214" y="222" width="16" height="238" rx="8" fill="#fff" opacity=".55"/>'
            + '<rect x="248" y="322" width="104" height="62" rx="3" fill="#fbfaf6" opacity=".92"/>'
            + '<rect x="266" y="340" width="68" height="8" rx="4" fill="#2b2f35" opacity=".7"/><rect x="278" y="356" width="44" height="5" rx="2.5" fill="#2b2f35" opacity=".35"/>')


ART["bottle-tall"] = svg(bottle_tall(), "fragrance", FRAG)

ART["bottle-round"] = svg(
    shadow(300, 484, 140, 18)
    + '<rect x="258" y="120" width="84" height="58" rx="29" fill="url(#gold)"/>'
    + '<rect x="282" y="176" width="36" height="34" fill="url(#gold)" opacity=".85"/>'
    + '<circle cx="300" cy="340" r="142" fill="url(#gl)"/>'
    + '<circle cx="300" cy="352" r="118" fill="url(#liqA)"/>'
    + '<path d="M196 300 A118 118 0 0 1 262 220" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round" opacity=".6"/>'
    + '<circle cx="300" cy="352" r="44" fill="#fbfaf6" opacity=".92"/><rect x="274" y="347" width="52" height="8" rx="4" fill="#2b2f35" opacity=".7"/>',
    "fragrance", FRAG)

ART["gift-set"] = svg(
    shadow(300, 490, 210, 20)
    + '<polygon points="404,232 444,206 444,452 404,478" fill="#0f1114"/>'
    + '<rect x="124" y="232" width="280" height="246" fill="url(#cap)"/>'
    + '<polygon points="124,232 164,206 444,206 404,232" fill="#3c424a"/>'
    + '<rect x="124" y="320" width="280" height="40" fill="url(#gold)"/>'
    + '<rect x="244" y="232" width="40" height="246" fill="url(#gold)" opacity=".9"/>'
    + '<g transform="translate(150 70) scale(.62)">' + bottle_tall("liqB").replace(shadow(300, 486, 110, 18), "") + "</g>"
    + '<g transform="translate(330 150) scale(.42)">' + bottle_tall("liqB").replace(shadow(300, 486, 110, 18), "") + "</g>",
    "fragrance", FRAG)

# ---------------------------------------------------------------- appliances (generic samples, no brands)
APP = """<linearGradient id="red" x1="0" x2="1"><stop offset="0" stop-color="#d9441c"/><stop offset=".4" stop-color="#ff7a45"/><stop offset="1" stop-color="#b8360f"/></linearGradient>
<linearGradient id="redV" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#ff8a5c"/><stop offset="1" stop-color="#c2410c"/></linearGradient>"""

ART["mixer"] = svg(
    shadow(300, 492, 210, 22)
    + '<rect x="110" y="446" width="360" height="40" rx="20" fill="url(#redV)"/>'
    + '<path d="M146 452 L146 212 Q146 140 218 140 L392 140 Q470 140 470 214 L470 228 Q470 266 432 266 L236 266 L236 452 Z" fill="url(#red)"/>'
    + '<rect x="380" y="164" width="62" height="14" rx="7" fill="#fff" opacity=".4"/><circle cx="188" cy="196" r="12" fill="#fff" opacity=".75"/>'
    + '<rect x="334" y="262" width="14" height="66" fill="url(#mH)"/>'
    + '<path d="M246 322 L436 322 L416 434 Q412 452 394 452 L288 452 Q270 452 266 434 Z" fill="url(#mH)"/>'
    + '<rect x="240" y="316" width="202" height="16" rx="8" fill="url(#mV)"/>',
    "appliances", APP)

ART["air-fryer"] = svg(
    shadow(300, 494, 170, 20)
    + '<path d="M164 200 Q164 120 244 120 L356 120 Q436 120 436 200 L436 484 L164 484 Z" fill="url(#bPH)"/>'
    + '<rect x="200" y="150" width="200" height="78" rx="18" fill="#101215"/>'
    + '<circle cx="250" cy="189" r="17" fill="#ff5a1f"/><rect x="284" y="176" width="88" height="26" rx="6" fill="#36d58b" opacity=".85"/>'
    + '<rect x="182" y="262" width="236" height="200" rx="18" fill="url(#bP)" stroke="#4b525b" stroke-width="3"/>'
    + '<rect x="250" y="336" width="100" height="34" rx="17" fill="#0d0f12"/>'
    + '<rect x="196" y="276" width="14" height="172" rx="7" fill="#fff" opacity=".1"/>',
    "appliances", APP)

ART["coffee-maker"] = svg(
    shadow(300, 494, 190, 20)
    + '<path d="M150 116 L450 116 L450 196 L250 196 L250 446 L450 446 L450 486 L150 486 Z" fill="url(#bPH)"/>'
    + '<rect x="150" y="116" width="300" height="80" rx="12" fill="url(#bP)"/>'
    + '<rect x="398" y="144" width="30" height="18" rx="5" fill="#ff5a1f"/>'
    + '<path d="M256 196 L436 196 L422 236 L270 236 Z" fill="#23272c"/>'
    + '<rect x="262" y="288" width="160" height="18" rx="9" fill="#23272c"/>'
    + '<path d="M266 304 L418 304 L410 430 Q408 446 392 446 L292 446 Q276 446 274 430 Z" fill="url(#gl)"/>'
    + '<path d="M272 372 L412 372 L408 430 Q406 446 390 446 L294 446 Q278 446 276 430 Z" fill="#4a2c18"/>'
    + '<path d="M418 326 L440 326 Q462 326 462 352 L462 378 Q462 402 440 402 L414 402" fill="none" stroke="#23272c" stroke-width="14"/>',
    "appliances", APP)


# Small objects get scaled up around the frame's center so every tile reads at the same size.
ZOOM = {"end-cap": 1.3, "fuse": 1.25, "sensor": 1.15, "led-strip": 1.15, "rail": 1.12, "handle": 1.15, "pulley": 1.15,
        "relay": 1.12, "shelf-glass": 1.12, "shelf-wire": 1.12, "spring": 1.12, "belt": 1.05, "cord": 1.1, "knob-bisque": 1.1, "knob-grey": 1.1}
SPOT = '<rect width="600" height="600" fill="url(#spot)"/>'


def zoom(content: str, z: float) -> str:
    head, body = content.split(SPOT, 1)
    body = body.rsplit("</svg>", 1)[0]
    return f'{head}{SPOT}<g transform="translate(300 330) scale({z}) translate(-300 -330)">{body}</g>\n</svg>\n'


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    for name, content in ART.items():
        if name in ZOOM:
            content = zoom(content, ZOOM[name])
        (OUT / f"{name}.svg").write_text(content)
    print(f"wrote {len(ART)} illustrations to {OUT}")
