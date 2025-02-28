import Blits from '@lightningjs/blits'

export default Blits.Component('Flags', {
  template: `
    <Element>
      <Element :for="(language, index) in $languages" x="$index * 250">
        <Element src="$language.flag" w="150" h="150" :alpha="$index === $activeIndex ? 1 : 0.6" />
        <Text
          content="$language.name"
          y="150"
          maxwidth="150"
          align="center"
          :color="$index === $activeIndex ? '#fff' : '#aaa'"
        />
      </Element>
    </Element>
  `,
  props: ['languages'],
  state() {
    return {
      activeIndex: 0,
    }
  },
  watch: {
    activeIndex(v) {
      const language = this.languages[v]
      if (language && language.code) {
        this.$language.set(language.code)
      }
    },
  },
  input: {
    right() {
      this.activeIndex = Math.min(this.activeIndex + 1, this.languages.length - 1)
    },
    left() {
      this.activeIndex = Math.max(this.activeIndex - 1, 0)
    },
  },
})
