import Blits from '@lightningjs/blits'

export default Blits.Component('Poster', {
  template: `
    <Element
      w="1280"
      h="720"
      x="$x"
      :src="$item.background"
      color="{top: '#fff', bottom: '#000'}"
      :scale.transition="{value: $scale, duration: 300, easing: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}"
      :_effects="[{type: 'radius', props: {radius: 8}}]"
    >
      <Element :alpha.transition="{value: $alpha, duration: 300, easing: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}">
        <Element w="185" h="278" x="54" y="220" :src="$item.poster" />
        <Text :content="$item.title" font="raleway" y="520" x="54" size="64" maxwidth="1000" maxlines="1" />
        <Text
          :content="$item.overview"
          size="21"
          y="620"
          x="60"
          color="#ccc"
          maxwidth="1000"
          maxlines="2"
          lineheight="36"
          maxlines="2"
        />
      </Element>
    </Element>
  `,
  props: ['src', 'index', 'item', 'width'],
  state() {
    return {
      scale: 1,
      zIndex: 1,
      alpha: 0,
    }
  },
  computed: {
    x() {
      return this.index * this.width
    },
  },
  hooks: {
    focus() {
      this.scale = 1.1
      this.alpha = 1
    },
    unfocus() {
      this.scale = 1
      this.alpha = 0
    },
  },
})
