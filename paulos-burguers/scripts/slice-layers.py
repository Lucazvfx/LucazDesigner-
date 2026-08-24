"""Recorta um frame do vídeo do hero em camadas fotográficas com alpha.

Duas ideias: o corte entre camadas segue a linha mais escura dentro da janela de
separação (em vez de uma reta que atravessaria alface e molho), e o alpha vem da
luminância — o fundo do estúdio é preto puro, então some sozinho.

Uso:
    # 1. extraia um frame com o sanduíche inteiro e bem separado
    ffmpeg -ss 9.6 -i public/assets/video/hero-burger.mp4 -frames:v 1 -q:v 1 frame.png
    # 2. recorte em camadas
    python scripts/slice-layers.py frame.png public/assets/burger

Saem os PNGs e um layers.json com a caixa de cada camada em % do quadro — é o que
alimenta `burgerAnatomy` em src/config/site.js.

Ao trocar o vídeo, reveja WINDOWS: são as faixas de Y onde a cobertura por linha
tem mínimo local, ou seja, onde uma camada termina e a outra começa.
"""
from PIL import Image, ImageFilter
import json, os, sys

FRAME, OUT = sys.argv[1], sys.argv[2]

full = Image.open(FRAME).convert('RGB')
# Recorta na faixa do sanduíche: fora dela só há a vinheta do estúdio, que o
# limiar de luminânciacaptaria como um retângulo fantasma.
FW, FH = full.size
CROP = (int(FW * 0.16), 0, int(FW * 0.84), FH)
src = full.crop(CROP)
W, H = src.size
lum = src.convert('L').filter(ImageFilter.GaussianBlur(2))
lp = lum.load()

# Janelas onde a cobertura por linha tem mínimo local = separações entre camadas.
WINDOWS = [(196, 240), (336, 372), (424, 456), (548, 584)]
LAYERS = [
    ('bun-top',   'Pão brioche + molho da casa', 'Assado no dia, com gergelim e o molho especial.'),
    ('greens',    'Cebola roxa e alface',        'Cortadas na hora, crocantes e geladas.'),
    ('tomato',    'Tomate fresco',               'Selecionado no ponto certo de maturação.'),
    ('patty',     'Blend Angus com queijo',      '180g selados na chapa, queijo derretido por cima.'),
    ('bun-bottom','Base selada na manteiga',     'Tostada na chapa para segurar todo o recheio.'),
]

def carve(y0, y1):
    """Para cada coluna, a linha mais escura da janela; depois suaviza o traçado."""
    raw = []
    for x in range(W):
        best, besty = 10**9, (y0 + y1) // 2
        for y in range(y0, y1):
            v = lp[x, y] + lp[x, max(0, y - 2)] + lp[x, min(H - 1, y + 2)]
            if v < best:
                best, besty = v, y
        raw.append(besty)
    # média móvel: um traçado contínuo não deixa degrau visível na borda
    R = 40
    return [
        sum(raw[max(0, x - R):min(W, x + R + 1)]) // len(raw[max(0, x - R):min(W, x + R + 1)])
        for x in range(W)
    ]

os.makedirs(OUT, exist_ok=True)
seams = [carve(a, b) for a, b in WINDOWS]
bounds = [[0] * W] + seams + [[H] * W]

# Alpha da luminância, com rampa suave para não serrilhar a borda do produto.
LO, HI = 38, 74
alpha_full = Image.new('L', (W, H))
ap = alpha_full.load()
raw_l = src.convert('L').load()
for y in range(H):
    for x in range(W):
        v = raw_l[x, y]
        ap[x, y] = 0 if v <= LO else (255 if v >= HI else int((v - LO) * 255 / (HI - LO)))

meta = []
for i, (lid, label, detail) in enumerate(LAYERS):
    top, bot = bounds[i], bounds[i + 1]
    mask = Image.new('L', (W, H), 0)
    mp = mask.load()
    for x in range(W):
        for y in range(top[x], bot[x]):
            mp[x, y] = 255
    layer_alpha = Image.new('L', (W, H))
    la = layer_alpha.load()
    for y in range(H):
        for x in range(W):
            la[x, y] = ap[x, y] if mp[x, y] else 0
    rgba = src.convert('RGBA')
    rgba.putalpha(layer_alpha)
    bbox = rgba.getbbox()
    if not bbox:
        continue
    crop = rgba.crop(bbox)
    crop.save(f'{OUT}/{lid}.png', optimize=True)
    x0, y0, x1, y1 = bbox
    meta.append({
        'id': lid, 'label': label, 'detail': detail,
        'left': round(x0 / W * 100, 3), 'top': round(y0 / H * 100, 3),
        'width': round((x1 - x0) / W * 100, 3), 'height': round((y1 - y0) / H * 100, 3),
    })
    print(f'{lid:11s} bbox={bbox} {crop.size[0]}x{crop.size[1]}')

json.dump({'frame': [W, H], 'layers': meta}, open(f'{OUT}/layers.json', 'w'), indent=2, ensure_ascii=False)
print('ok')
