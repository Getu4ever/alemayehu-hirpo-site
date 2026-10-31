#!/usr/bin/env python3
"""
Isolate merch print artwork (wordmarks only — no garment silhouettes or
background fills) and export 4000×4000 transparent PNGs for Printify.

Source branding matches the shop mockups formerly in public/images/merch/*.svg
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images" / "merch" / "printify"
SIZE = 4000

# Mockup palette
IVORY = (243, 235, 216, 255)  # #f3ebd8
IVORY_BRIGHT = (247, 243, 232, 255)  # #f7f3e8 (classic tee)
BRASS = (212, 180, 10, 255)  # #d4b40a
IVORY_SOFT = (243, 235, 216, 178)  # ~0.7 opacity ivory
IVORY_SOFT_80 = (247, 243, 232, 204)  # ~0.8

GEORGIA = Path("/System/Library/Fonts/Supplemental/Georgia.ttf")
GEORGIA_BOLD = Path("/System/Library/Fonts/Supplemental/Georgia Bold.ttf")
HELVETICA = Path("/System/Library/Fonts/Helvetica.ttc")


def load_font(path: Path, size: int, index: int = 0) -> ImageFont.FreeTypeFont:
    if path.suffix.lower() == ".ttc":
        return ImageFont.truetype(str(path), size=size, index=index)
    return ImageFont.truetype(str(path), size=size)


def text_width(
    draw: ImageDraw.ImageDraw, text: str, font: ImageFont.ImageFont, tracking: float
) -> float:
    if not text:
        return 0.0
    if tracking == 0:
        return float(draw.textlength(text, font=font))
    total = sum(draw.textlength(ch, font=font) for ch in text)
    return total + tracking * max(len(text) - 1, 0)


def draw_tracked(
    draw: ImageDraw.ImageDraw,
    xy: tuple[float, float],
    text: str,
    font: ImageFont.ImageFont,
    fill: tuple[int, int, int, int],
    tracking: float,
) -> None:
    cx, y = xy
    if tracking == 0:
        draw.text((cx, y), text, font=font, fill=fill, anchor="ms")
        return
    width = text_width(draw, text, font, tracking)
    x = cx - width / 2
    for ch in text:
        w = draw.textlength(ch, font=font)
        draw.text((x + w / 2, y), ch, font=font, fill=fill, anchor="ms")
        x += w + tracking


def render(
    filename: str,
    lines: list[dict],
    *,
    rule_after: int | None = None,
    rule_color: tuple[int, int, int, int] = BRASS,
    rule_width: int = 5,
    rule_gap: int = 56,
    rule_opacity: float = 1.0,
) -> None:
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    prepared: list[dict] = []
    for line in lines:
        font = load_font(line["font"], line["size"], line.get("index", 0))
        tracking = float(line.get("tracking", 0))
        prepared.append(
            {
                **line,
                "font_obj": font,
                "tracking": tracking,
                "width": text_width(draw, line["text"], font, tracking),
                "gap_after": int(line.get("gap_after", round(line["size"] * 0.42))),
            }
        )

    block = 0.0
    for i, line in enumerate(prepared):
        block += line["size"]
        if rule_after == i:
            block += rule_gap * 2 + rule_width
        elif i < len(prepared) - 1:
            block += line["gap_after"]

    y = (SIZE - block) / 2 + prepared[0]["size"] * 0.82
    cx = SIZE / 2

    for i, line in enumerate(prepared):
        draw_tracked(
            draw,
            (cx, y),
            line["text"],
            line["font_obj"],
            line["color"],
            line["tracking"],
        )

        if rule_after == i:
            rule_y = y + rule_gap
            half = min(560.0, max(300.0, line["width"] * 0.3))
            color = rule_color
            if rule_opacity < 1:
                color = (*rule_color[:3], int(255 * rule_opacity))
            draw.line(
                [(cx - half, rule_y), (cx + half, rule_y)],
                fill=color,
                width=rule_width,
            )
            if i < len(prepared) - 1:
                y = rule_y + rule_gap + prepared[i + 1]["size"] * 0.82
            continue

        if i < len(prepared) - 1:
            y += line["gap_after"] + prepared[i + 1]["size"] * 0.82

    out = OUT / filename
    img.save(out, format="PNG", optimize=True)
    mb = out.stat().st_size / (1024 * 1024)
    print(f"✓ {filename} ({SIZE}×{SIZE}, {mb:.2f} MB)")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    secondary = HELVETICA if HELVETICA.exists() else GEORGIA

    # tee-evangadi-baytewar — chest print only
    render(
        "tee-evangadi-baytewar.png",
        [
            {
                "text": "EVANGADI",
                "font": GEORGIA_BOLD,
                "size": 280,
                "color": IVORY,
                "tracking": 18,
                "gap_after": 40,
            },
            {
                "text": "BAYTEWAR",
                "font": GEORGIA,
                "size": 210,
                "color": BRASS,
                "tracking": 28,
                "gap_after": 48,
            },
            {
                "text": "ALEMAYEHU HIRPO",
                "font": secondary,
                "size": 90,
                "color": IVORY_SOFT,
                "tracking": 22,
            },
        ],
        rule_after=1,
        rule_color=IVORY,
        rule_width=4,
        rule_gap=40,
        rule_opacity=0.35,
    )

    # tee-baytewar — BAYTEWAR + CLASSIC TEE (on-garment type in mockup)
    render(
        "tee-baytewar.png",
        [
            {
                "text": "BAYTEWAR",
                "font": GEORGIA_BOLD,
                "size": 300,
                "color": IVORY_BRIGHT,
                "tracking": 28,
                "gap_after": 56,
            },
            {
                "text": "CLASSIC TEE",
                "font": secondary,
                "size": 100,
                "color": IVORY_SOFT_80,
                "tracking": 22,
            },
        ],
    )

    # cap-baytewar — embroidered wordmark only (no hat / “BASEBALL CAP” caption)
    render(
        "cap-baytewar.png",
        [
            {
                "text": "BAYTEWAR",
                "font": GEORGIA_BOLD,
                "size": 340,
                "color": IVORY,
                "tracking": 30,
            },
        ],
    )

    # hoodie-evangadi — brand wordmark only (no hoodie silhouette / “HOODIE” label)
    render(
        "hoodie-evangadi.png",
        [
            {
                "text": "EVANGADI",
                "font": GEORGIA_BOLD,
                "size": 320,
                "color": BRASS,
                "tracking": 22,
            },
        ],
    )

    # tote-yasebshale — bag print only (no tote body / “TOTE” caption)
    render(
        "tote-yasebshale.png",
        [
            {
                "text": "YASEBSHALE",
                "font": GEORGIA_BOLD,
                "size": 260,
                "color": IVORY,
                "tracking": 20,
            },
        ],
        rule_after=0,
        rule_color=BRASS,
        rule_width=6,
        rule_gap=64,
        rule_opacity=0.65,
    )

    # vinyl-evangadi — label wordmark only (no vinyl disc)
    render(
        "vinyl-evangadi.png",
        [
            {
                "text": "EVANGADI",
                "font": GEORGIA_BOLD,
                "size": 320,
                "color": BRASS,
                "tracking": 22,
            },
        ],
    )

    print(f"\nPrintify-ready assets → {OUT}")


if __name__ == "__main__":
    main()
