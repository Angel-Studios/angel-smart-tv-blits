import Blits from '@lightningjs/blits'

export default Blits.Component('Square', {
  template: `
    <Element :w.transition="$size" :h.transition="$size" :color.transition="$color" />
  `,
  props: [
    {
      key: 'size',
      default: 80,
    },
  ],
  state() {
    return {
      color: '#86198f',
    }
  },
  watch: {
    size(v, o) {
      this.$log.info(`Size changed from ${o} to ${v}`)
      this.color = this.color === '#86198f' ? '#9d174d' : '#86198f'
    },
  },
})
