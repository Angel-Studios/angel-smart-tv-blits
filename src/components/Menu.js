import Blits from '@lightningjs/blits'
import Button from './Button'

export default Blits.Component('Menu', {
  components: {
    Button,
  },
  template: `
    <Element :x.transition="$x" w="400" h="1080" color="{right: '#64748baa', left: '#475569aa'}">
      <Element x="50" y="40">
        <Button color="#e4e4e7" ref="menu1" />
        <Button color="#e4e4e7" y="100" ref="menu2" />
        <Button color="#e4e4e7" y="200" ref="menu3" />
        <Button color="#e4e4e7" y="300" ref="menu4" />
      </Element>
    </Element>
  `,
  state() {
    return {
      x: -360,
      focused: 1,
    }
  },
  hooks: {
    focus() {
      this.$trigger('focused')
      this.x = 0
    },
  },
  watch: {
    focused() {
      const item = this.$select(`menu${this.focused}`)
      item && item.$focus && item.$focus()
    },
  },
  input: {
    right() {
      this.parent.$focus()
      this.x = -360
    },
    down() {
      this.focused = Math.min(this.focused + 1, 4)
    },
    up() {
      this.focused = Math.max(this.focused - 1, 1)
    },
    left() {},
  },
})
