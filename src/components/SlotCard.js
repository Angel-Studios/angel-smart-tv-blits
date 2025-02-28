import Blits from '@lightningjs/blits'

export default Blits.Component('SlotCard', {
  template: `
    <Element
      w="300"
      h="500"
      :effects="[{type: 'radius', props: {radius: 20}}, {type: 'border', props: {width: 6, color: '#e2e8f0'}}]"
      color="{top: '#94a3b8', bottom: '#475569'}"
    >
      <Slot x="20" y="20" />
      <Text content="$label" maxwidth="260" x="20" y="400" align="center" />
    </Element>
  `,
  props: [
    {
      key: 'label',
    },
  ],
})
