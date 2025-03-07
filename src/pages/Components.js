import Blits from '@lightningjs/blits'
import Square from '../components/Square.js'
import Card from '../components/Card.js'
import Button from '../components/Button.js'

export default Blits.Component('Components', {
  components: {
    Square,
    Card,
  },
  template: `
    <Element>
      <!-- simple square component that takes a size (number) argument and maps it to w and h -->
      <Square x="100" y="100" size="50" />
      <Square x="100" y="200" size="100" />
      <Square x="100" y="350" size="200" />
      <!-- reactive (animated) x position for component -->
      <Square :x.transition="$x" y="600" size="50" />
      <!-- card component that takes a string size argument and also has a nested square component -->
      <Card x="500" y="100" />
      <Card x="500" y="500" size="large" />

      <Element x="1000" y="100">
        <Text>Dynamic components</Text>
        <Component is="$dynamicComponent" y="100" color="blue" />
        <Component :for="(bla, index) in $dynamicComponents" is="$bla" :x="205 * $index" y="300" />
      </Element>
    </Element>
  `,
  state() {
    return {
      x: 100,
      dynamicComponent: Button,
      dynamicComponents: ['Square', 'Card', 'Square', Button],
      toggle: false,
      size: 50,
    }
  },
  hooks: {
    ready() {
      this.$setInterval(() => {
        this.x = this.x === 100 ? 250 : 100
        this.size = this.size === 50 ? 200 : 50
      }, 2000)
    },
  },
})
