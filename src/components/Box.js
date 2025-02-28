import Blits from '@lightningjs/blits'

export default Blits.Component('Box', {
  template: `
    <Element
      w="330"
      h="180"
      :effects="[{type: 'radius', props: {radius: 20}}, {type: 'border', props: {width: 1, color: '#e2e8f0'}}]"
      color="{top: '#667a97', bottom: '#475569'}"
    >
      <Text x="25" y="20" :content="$header" w="280" color="black" contain="width" />
      <Text x="25" y="90" :content="$text" size="52" w="280" contain="width" align="center" />
    </Element>
  `,
  props: ['header', 'text'],
})
