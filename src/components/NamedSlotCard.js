import Blits from '@lightningjs/blits'

export default Blits.Component('NamedSlotCard', {
  template: `
    <Element
      w="700"
      h="300"
      :effects="[{type: 'radius', props: {radius: 20}}, {type: 'border', props: {width: 6, color: '#e2e8f0'}}]"
      color="{top: '#94a3b8', bottom: '#475569'}"
    >
      <Element x="20" y="20">
        <Text content="First slot" />
        <Slot y="40" ref="first" />
      </Element>

      <Element x="200" y="20">
        <Text content="Second slot" />
        <Slot y="40" ref="second" />
      </Element>

      <Element x="480" y="20">
        <Text content="Third slot" />
        <Slot y="40" ref="third" />
      </Element>
    </Element>
  `,
})
