import Blits from '@lightningjs/blits'

export default Blits.Component('KeyInput', {
  template: `
    <Element x="525" y="130">
      <Element w="200" h="200" :color="$focusColor" :x="$focusedX * 220" :y="$focusedY * 210" />

      <Element w="180" h="180" x="10" y="10" :color="$blockColor" />
      <Element w="180" h="180" x="230" y="10" :color="$blockColor" />
      <Element w="180" h="180" x="450" y="10" :color="$blockColor" />
      <Element w="180" h="180" x="670" y="10" :color="$blockColor" />

      <Element w="180" h="180" x="10" y="220" :color="$blockColor" />
      <Element w="180" h="180" x="230" y="220" :color="$blockColor" />
      <Element w="180" h="180" x="450" y="220" :color="$blockColor" />
      <Element w="180" h="180" x="670" y="220" :color="$blockColor" />

      <Element w="180" h="180" x="10" y="430" :color="$blockColor" />
      <Element w="180" h="180" x="230" y="430" :color="$blockColor" />
      <Element w="180" h="180" x="450" y="430" :color="$blockColor" />
      <Element w="180" h="180" x="670" y="430" :color="$blockColor" />

      <Element w="180" h="180" x="10" y="640" :color="$blockColor" />
      <Element w="180" h="180" x="230" y="640" :color="$blockColor" />
      <Element w="180" h="180" x="450" y="640" :color="$blockColor" />
      <Element w="180" h="180" x="670" y="640" :color="$blockColor" />
    </Element>
  `,
  state() {
    return {
      focusedX: 0,
      focusedY: 0,
      colorscheme: 'yellow',
    }
  },
  computed: {
    blockColor() {
      return this.colorscheme === 'yellow' ? '#fef08a' : '#bae6fd'
    },
    focusColor() {
      return this.colorscheme === 'yellow' ? '#facc15' : '#38bdf8'
    },
  },
  input: {
    left() {
      const focusedX = this.focusedX - 1
      this.focusedX = Math.max(focusedX, 0)
    },
    right() {
      const focusedX = this.focusedX + 1
      this.focusedX = Math.min(focusedX, 3)
    },
    up() {
      this.focusedY = Math.max(this.focusedY - 1, 0)
    },
    down() {
      this.focusedY = Math.min(this.focusedY + 1, 3)
    },
    enter() {
      this.colorscheme = this.colorscheme === 'yellow' ? 'blue' : 'yellow'
    },
    any(e) {
      const key = parseInt(e.key)
      if (!isNaN(key)) {
        this.focusedX = Math.max(0, (key - 1) % 4)
        this.focusedY = Math.max(0, Math.ceil(key / 4) - 1)
      } else {
        this.parent.$focus(e)
      }
    },
  },
})
