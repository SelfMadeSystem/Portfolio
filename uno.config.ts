import { defineConfig } from 'unocss'

export default defineConfig({
  variants: [
    // scroll-visible:
    (matcher) => {
        if (!matcher.startsWith('scroll-visible:'))
          return matcher
        return {
          // slice `scroll-visible:` prefix and passed to the next variants and rules
          matcher: matcher.slice(15),
          selector: s => `${s}.scroll-fade--visible`,
        }
      } 
  ]
})