import Blits from '@lightningjs/blits'

export default Blits.Component('Ball', {
  template: `
    <Element w="100" h="100" src="/assets/basketball.png" />
  `,
  hooks: {
    attach() {
      this.$emit('ballUpdate', 'Attached to render tree')
    },
    detach() {
      this.$emit('ballUpdate', 'Detached from render tree')
    },
    enter() {
      this.$emit('ballUpdate', 'Entered viewport')
    },
    exit() {
      this.$emit('ballUpdate', 'Exited viewport')
    },
  },
})
