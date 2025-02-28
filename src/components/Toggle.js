import Blits from '@lightningjs/blits'

export default Blits.Component('Toggle', {
  template: `
    <Element w="100" h="50" y="5" :color="$bgColor" :effects="[{type: 'radius', props: {radius:25}}]">
      <Circle :x.transition="$on ? 0 : 50" size="50" :color="$primaryColor" />
    </Element>
  `,
  props: ['bgColor', 'primaryColor', 'on'],
})
