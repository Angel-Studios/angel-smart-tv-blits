import Blits from '@lightningjs/blits'

export default Blits.Component('Alpha', {
  template: `
    <Element>
      <Element y="100">
        <!-- hardcoded alpha values -->
        <Element w="200" h="200" x="100" color="#fff" alpha="0.2" />
        <Element w="200" h="200" x="320" color="#fff" alpha="0.4" />
        <Element w="200" h="200" x="540" color="#fff" alpha="0.6" />
        <Element w="200" h="200" x="760" color="#fff" alpha="0.8" />
        <Element w="200" h="200" x="980" color="#fff" alpha="1" />
      </Element>

      <!-- dynamic (but not reactive) alpha value -->
      <Element w="200" h="200" x="100" y="320" color="#fff" alpha="$alpha" />

      <!-- reactive alpha value -->
      <Element w="200" h="200" x="100" y="540" color="#fff" :alpha="$alpha" />

      <!-- reactive alpha value (with transition) -->
      <Element
        w="200"
        h="200"
        x="100"
        y="760"
        color="#fff"
        :alpha.transition="{value: $alpha, duration: 1000, easing: 'ease-in-out-circ'}"
      />

      <Element w="428" h="234" x="1200" y="100" :src="$image" alpha="1" />
      <Element w="428" h="234" x="1300" :y="100 + 234 - 40" :src="$image" alpha=".4" />
      <Element w="428" h="234" x="1200" :y="100 + (234 * 2) - (40 * 2)" :src="$image" alpha=".1" />

      <Text x="400" y="400" alpha="0.2">Text with alpha applied directly</Text>

      <Element alpha="0.5" x="400" y="500">
        <Text>Text with alpha applied on parent element</Text>
      </Element>
    </Element>
  `,
  state() {
    return {
      alpha: 0.5,
      direction: 'up',
      image: 'assets/lightningbolt.png',
    }
  },
  hooks: {
    ready() {
      // backstopjs
      if (process.env.NODE_ENV === 'testing') {
        return console.log('backstopjs:ready')
      }
      this.$setInterval(() => {
        const alpha = this.direction === 'up' ? this.alpha + 0.2 : this.alpha - 0.2
        this.alpha = Math.max(Math.min(alpha, 1), 0.1)
        if (this.alpha === 1) {
          this.direction = 'down'
        }
        if (this.alpha === 0.1) {
          this.direction = 'up'
        }
      }, 1400)
    },
  },
})
