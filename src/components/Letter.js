import Blits from '@lightningjs/blits'

export default Blits.Component('Letter', {
  template: `
    <Element>
      <Element
        w="$w"
        :h.transition="{value: 410+$offset, duration: $duration, delay: $wait, easing: $timingFunction}"
        color="#E6E6E6"
      />
      <Element
        w="$w"
        h="280"
        :src="$image"
        :y.transition="{value: 400+$offset, duration: $duration, delay: $wait, easing: $timingFunction}"
      />
      <Element
        w="$w"
        color="#E6E6E6"
        :h.transition="{value: 500-$offset, duration: $duration, delay: $wait, easing: $timingFunction}"
        :y.transition="{value: 660+$offset, duration: $duration, delay: $wait, easing: $timingFunction}"
      />
    </Element>
  `,
  props: ['w', 'letter', 'direction', 'delay'],
  computed: {
    image() {
      return `assets/${this.letter}.png`
    },
  },
  state() {
    return {
      offset: this.direction === 'up' ? -680 : 680,
      duration: 1000,
      wait: 0,
      timingFunction: 'cubic-bezier(1,-0.64,.39,1.44)',
    }
  },
  hooks: {
    ready() {
      this.animate()
    },
  },
  methods: {
    animate() {
      this.$setTimeout(() => {
        this.offset = 0
      }, 1000)

      this.$setTimeout(() => {
        this.wait = this.delay + 150
        this.duration = 1000
        this.offset = 1080
      }, 2800)

      this.$setTimeout(() => {
        this.wait = this.delay / 3
        this.timingFunction = 'ease-in-out'
        this.duration = 1500
        this.offset = 0
      }, 5000)
    },
  },
})
