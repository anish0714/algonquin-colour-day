// Hand-painted 600×240 canvas illustrations for each stop. Deterministic per seed so they never flicker.

export const SCENE_W = 600
export const SCENE_H = 240

export function seededRandom(seed) {
  return function () {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

const FALL = ['#b8361d', '#d24a22', '#e07a1f', '#e8a923', '#f0c34a', '#e8a923', '#c9781a', '#3e5a2f', '#4f6b34', '#2f4a2a', '#8a6a4a']
const GOLD = ['#e8a923', '#f0c34a', '#d9a52a', '#c9781a', '#3e5a2f', '#2f4a2a', '#f0c34a']
const CONIFERS = new Set(['#2f4a2a', '#3e5a2f'])

function sky(c, top, bot) {
  const g = c.createLinearGradient(0, 0, 0, SCENE_H)
  g.addColorStop(0, top)
  g.addColorStop(1, bot)
  c.fillStyle = g
  c.fillRect(0, 0, SCENE_W, SCENE_H)
}

function ridge(c, r, base, amp, col) {
  const p1 = r() * 6, p2 = r() * 6, f = 0.006 + r() * 0.006, pts = []
  c.beginPath()
  c.moveTo(0, SCENE_H)
  for (let x = 0; x <= SCENE_W; x += 6) {
    const y = base - amp * (Math.sin(x * f + p1) * 0.6 + Math.sin(x * f * 2.4 + p2) * 0.4)
    pts.push([x, y])
    c.lineTo(x, y)
  }
  c.lineTo(SCENE_W, SCENE_H)
  c.closePath()
  c.fillStyle = col
  c.fill()
  return pts
}

function trees(c, r, pts, depth, size, pal, alpha = 1) {
  c.globalAlpha = alpha
  for (const [x, y] of pts) {
    for (let d = 0; d < depth; d += size * 0.9) {
      const px = x + (r() - 0.5) * 7, py = y + d + (r() - 0.5) * 3, col = pal[(r() * pal.length) | 0]
      c.fillStyle = col
      c.beginPath()
      if (CONIFERS.has(col)) {
        c.moveTo(px, py - size * 1.6)
        c.lineTo(px + size * 0.7, py + size * 0.6)
        c.lineTo(px - size * 0.7, py + size * 0.6)
      } else {
        c.ellipse(px, py, size * (0.8 + r() * 0.4), size * (0.7 + r() * 0.3), 0, 0, 6.3)
      }
      c.fill()
    }
  }
  c.globalAlpha = 1
}

function water(c, y, h, top, bot) {
  const g = c.createLinearGradient(0, y, 0, y + h)
  g.addColorStop(0, top)
  g.addColorStop(1, bot)
  c.fillStyle = g
  c.fillRect(0, y, SCENE_W, h)
}

function reflect(c, r, y, h, pal) {
  c.globalAlpha = 0.35
  for (let i = 0; i < 140; i++) {
    c.fillStyle = pal[(r() * pal.length) | 0]
    c.fillRect(r() * SCENE_W, y + r() * h * 0.55, 6 + r() * 14, 2)
  }
  c.globalAlpha = 0.5
  c.fillStyle = '#ffffff'
  for (let i = 0; i < 40; i++) c.fillRect(r() * SCENE_W, y + r() * h, 10 + r() * 30, 1)
  c.globalAlpha = 1
}

function pine(c, x, base, h, col) {
  c.fillStyle = col
  c.fillRect(x - 1.5, base - h * 0.25, 3, h * 0.25)
  for (let k = 0; k < 4; k++) {
    const w = h * (0.32 - k * 0.06), yy = base - h * 0.2 - k * h * 0.18
    c.beginPath()
    c.moveTo(x - w, yy)
    c.quadraticCurveTo(x, yy - h * 0.12, x + w * 0.9, yy - h * 0.05)
    c.lineTo(x, yy - h * 0.3)
    c.closePath()
    c.fill()
  }
}

function spire(c, x, base, h, col) {
  c.fillStyle = col
  c.beginPath()
  c.moveTo(x, base - h)
  c.lineTo(x + h * 0.12, base)
  c.lineTo(x - h * 0.12, base)
  c.fill()
}

function poly(c, col, points) {
  c.fillStyle = col
  c.beginPath()
  points.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)))
  c.fill()
}

export const SCENES = {
  panorama(c, r) {
    sky(c, '#9fc3d8', '#f3dcb4')
    ridge(c, r, 95, 14, '#8ea3b4')
    trees(c, r, ridge(c, r, 125, 18, '#9a6a3c'), 22, 4, FALL, 0.95)
    water(c, 150, 30, '#5f8fae', '#8fb3c8')
    reflect(c, r, 150, 30, FALL)
    trees(c, r, ridge(c, r, 190, 16, '#7a4a24'), 60, 6, FALL)
    poly(c, '#6d6a64', [[0, 240], [0, 205], [90, 196], [180, 214], [230, 240]])
    poly(c, '#57544f', [[0, 240], [60, 222], [150, 230], [170, 240]])
  },
  rapids(c, r) {
    sky(c, '#b7cfdc', '#f2dfbf')
    trees(c, r, ridge(c, r, 70, 10, '#8a5a30'), 120, 7, FALL)
    c.fillStyle = '#4f7c98'
    c.beginPath()
    c.moveTo(180, 240)
    c.bezierCurveTo(260, 190, 330, 150, 360, 110)
    c.lineTo(420, 110)
    c.bezierCurveTo(430, 150, 470, 200, 560, 240)
    c.fill()
    c.strokeStyle = 'rgba(255,255,255,.85)'
    c.lineWidth = 2
    for (let i = 0; i < 26; i++) {
      const y = 118 + r() * 120, x = 300 + (y - 110) * 0.15 + r() * (60 + (y - 110) * 0.9) - 30
      c.beginPath()
      c.moveTo(x, y)
      c.quadraticCurveTo(x + 8, y - 4, x + 18, y)
      c.stroke()
    }
    c.fillStyle = '#6d6a64'
    for (let i = 0; i < 7; i++) {
      c.beginPath()
      c.ellipse(260 + r() * 220, 170 + r() * 60, 8 + r() * 10, 5 + r() * 5, 0, 0, 6.3)
      c.fill()
    }
  },
  lake(c, r) {
    sky(c, '#a9c8da', '#f6e2bf')
    ridge(c, r, 108, 10, '#8ea3b4')
    trees(c, r, ridge(c, r, 128, 6, '#8a5a30'), 14, 4.5, FALL)
    water(c, 140, 100, '#6f9cb8', '#b7cfdc')
    reflect(c, r, 140, 90, FALL)
    // picnic table
    c.fillStyle = '#4a3424'
    c.fillRect(70, 206, 90, 6)
    c.fillRect(78, 212, 5, 20)
    c.fillRect(148, 212, 5, 20)
    c.fillRect(60, 218, 110, 4)
    c.fillStyle = '#6b8f3a'
    c.fillRect(0, 228, SCENE_W, 12)
  },
  cliff(c, r) {
    sky(c, '#a8c6d8', '#f4dcb2')
    ridge(c, r, 90, 12, '#8ea3b4')
    trees(c, r, ridge(c, r, 130, 22, '#9a6a3c'), 60, 5, FALL)
    c.strokeStyle = '#5f8fae'
    c.lineWidth = 7
    c.beginPath()
    c.moveTo(250, 240)
    c.bezierCurveTo(330, 200, 260, 175, 380, 160)
    c.stroke()
    poly(c, '#6d6a64', [[0, 240], [0, 150], [140, 160], [210, 190], [230, 240]])
    pine(c, 60, 160, 95, '#203a24')
    pine(c, 120, 166, 70, '#2a4a2c')
    pine(c, 25, 154, 60, '#203a24')
  },
  bog(c, r) {
    sky(c, '#b5cfdd', '#f5e3c2')
    trees(c, r, ridge(c, r, 110, 10, '#3e5a2f'), 18, 4, ['#3e5a2f', '#2f4a2a', '#e8a923', '#c9781a'])
    const g = c.createLinearGradient(0, 130, 0, 240)
    g.addColorStop(0, '#c9a34a')
    g.addColorStop(1, '#a8742c')
    c.fillStyle = g
    c.fillRect(0, 130, SCENE_W, 110)
    for (let i = 0; i < 34; i++) {
      const x = r() * SCENE_W, b = 135 + r() * 60, h = 30 + r() * 55
      spire(c, x, b, h * (0.5 + (b - 130) / 110), r() < 0.65 ? GOLD[(r() * 3) | 0] : '#2f4a2a')
    }
    // boardwalk
    poly(c, '#8a6440', [[270, 170], [300, 170], [380, 240], [220, 240]])
    c.strokeStyle = '#6b4a2e'
    c.lineWidth = 1.5
    for (let y = 175; y < 240; y += 8) {
      const t = (y - 170) / 70
      c.beginPath()
      c.moveTo(270 - 50 * t, y)
      c.lineTo(300 + 80 * t, y)
      c.stroke()
    }
  },
  deck(c, r) {
    sky(c, '#9cc0d6', '#f4dab0')
    ridge(c, r, 100, 10, '#8ea3b4')
    trees(c, r, ridge(c, r, 130, 16, '#9a6a3c'), 40, 4.5, FALL)
    water(c, 165, 20, '#5f8fae', '#8fb3c8')
    reflect(c, r, 165, 20, FALL)
    trees(c, r, ridge(c, r, 195, 10, '#7a4a24'), 50, 6, FALL)
    // deck railing
    c.fillStyle = '#5a3d27'
    c.fillRect(0, 214, SCENE_W, 6)
    c.fillRect(0, 232, SCENE_W, 8)
    for (let x = 10; x < SCENE_W; x += 40) c.fillRect(x, 214, 5, 26)
  },
  pond(c, r) {
    sky(c, '#adc9d9', '#f5dfb6')
    trees(c, r, ridge(c, r, 100, 12, '#8a5a30'), 50, 5, FALL)
    water(c, 150, 90, '#5d8aa5', '#a9c4d3')
    reflect(c, r, 150, 80, FALL)
    // beaver lodge
    c.fillStyle = '#6a4a2e'
    c.beginPath()
    c.moveTo(380, 192)
    c.quadraticCurveTo(430, 150, 480, 192)
    c.fill()
    c.strokeStyle = '#5a3d27'
    c.lineWidth = 2
    for (let i = 0; i < 14; i++) {
      const x = 390 + r() * 80
      c.beginPath()
      c.moveTo(x, 192)
      c.lineTo(x + (r() - 0.5) * 20, 165 + r() * 20)
      c.stroke()
    }
    // dead snags
    c.strokeStyle = '#8a8378'
    c.lineWidth = 3
    for (const [x, h] of [[110, 90], [150, 70], [520, 80]]) {
      c.beginPath()
      c.moveTo(x, 205)
      c.lineTo(x + 3, 205 - h)
      c.stroke()
      c.beginPath()
      c.moveTo(x + 2, 205 - h * 0.6)
      c.lineTo(x + 14, 205 - h * 0.75)
      c.stroke()
    }
    c.fillStyle = '#7a5a38'
    c.fillRect(0, 205, SCENE_W, 5)
  },
}
