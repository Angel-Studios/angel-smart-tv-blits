import Blits from '@lightningjs/blits'

const randomIntBetween = (from, to) => Math.floor(Math.random() * (to - from + 1) + from)

const Item = Blits.Component('Item', {
  template: `
    <Element
      src="assets/blits-b-small.png"
      w="96"
      h="168"
      :x.transition="{value: $x, duration: 2900}"
      :y.transition="{value: $y, duration: 2900}"
      :rotation.transition="{value: $rotation, duration: 2900}"
      :scale.transition="{value: $scale, duration: 1000}"
    />
  `,
  state() {
    return {
      x: randomIntBetween(20, 1560),
      y: randomIntBetween(20, 720),
      rotation: 0,
      scale: 0.1,
    }
  },
  hooks: {
    ready() {
      this.scale = 1
      this.$setInterval(() => {
        this.scale = 1
        this.x = randomIntBetween(20, 1740)
        this.y = randomIntBetween(20, 900)
        this.rotation = randomIntBetween(10, 360)
      }, 3000)
    },
  },
})

export default Blits.Component('Exponential', {
  components: {
    Item,
  },
  template: `
    <Element>
      <Item :for="item in $items" key="$item" />
    </Element>
  `,
  state() {
    return {
      items: [],
    }
  },
  hooks: {
    ready() {
      const interval = this.$setInterval(() => {
        for (let i = 0; i <= Math.floor(this.items.length / 10); i++) {
          this.items.push(`item${this.items.length}`)
        }
        this.$log.info('# items', this.items.length)
        if (this.items.length > 100) {
          clearInterval(interval)
        }
      }, 2000)
    },
  },
})
