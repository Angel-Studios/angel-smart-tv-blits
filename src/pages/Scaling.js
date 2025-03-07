import Blits from '@lightningjs/blits'

export default Blits.Component('Scaling', {
  template: `
    <Element>
      <!-- non scaled element of 150 -->
      <Element x="100" y="100" w="150" h="150" color="#64748b" />
      <!-- element of 100 scaled with 1.5 to 150 -->
      <Element x="300" y="100" w="100" h="100" color="#64748b" scale="1.5" />

      <!-- scaling with a dynamic value -->
      <Element x="100" y="400" w="100" h="100" color="#b45309" scale="$scale" />

      <!-- reactive scaling (with transition) -->
      <Element x="900" y="400" w="100" h="100" :src="$balloon" :scale.transition="{value: $scale, easing: 'ease-in-out'}" />

      <!-- scaling with a nested element -->
      <Element x="300" y="600" w="100" h="100" color="#059669" :scale="$scale2">
        <Element x="10" y="10" h="60" w="80" color="#0369a1" />
      </Element>

      <!-- scaling with a nested element that also uses scaling -->
      <Element x="1500" y="600" w="100" h="100" color="#059669" :scale="$scale2">
        <Element x="10" y="10" h="60" w="80" color="#0369a1" :scale="$scale2 / 2" />
      </Element>
    </Element>
  `,
  state() {
    return {
      scale: 2,
      direction: 'up',
      balloon: 'assets/balloon.png',
      scale2: 1,
    }
  },
  hooks: {
    ready() {
      const scaleInteval1 = process.env.NODE_ENV === 'testing' ? 2000 : 500
      const scaleInteval2 = process.env.NODE_ENV === 'testing' ? 2000 : 2000

      this.$setInterval(() => {
        const scale = this.direction === 'up' ? this.scale + 0.5 : 0
        this.scale = Math.max(Math.min(scale, 8), 0)
        if (this.scale === 8) {
          this.direction = 'down'
        }
        if (this.scale === 0) {
          this.direction = 'up'
        }
      }, scaleInteval1)

      this.$setInterval(() => {
        this.scale2 = this.scale2 === 1 ? 3 : 1
      }, scaleInteval2)
    },
  },
})
