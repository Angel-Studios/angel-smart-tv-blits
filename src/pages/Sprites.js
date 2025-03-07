import Blits from '@lightningjs/blits'
import MenuSprite from './Sprites/menu.js'

const sprites = ['menu']

export default Blits.Component('Sprites', {
  components: {
    MenuSprite,
  },
  template: `
    <Element>
      <MenuSprite :show="$currentSprite === 'menu'" />
    </Element>
  `,
  state() {
    return {
      currentSprite: 'menu',
    }
  },
  input: {
    down() {
      const index = sprites.indexOf(this.currentSprite)
      if (index < sprites.length - 1) {
        this.currentSprite = sprites[index + 1]
      } else {
        this.currentSprite = sprites[0]
      }
    },
  },
})
