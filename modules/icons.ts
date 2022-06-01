import { addVitePlugin, createResolver, defineNuxtModule, useNuxt } from '@nuxt/kit'
import unpluginIcons from 'unplugin-icons'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineNuxtModule({
  setup() {
    const nuxt = useNuxt()

    const resolver = createResolver(import.meta.url)

    nuxt.hooks.hook('content:context', (ctx) => {
      ctx.transformers.push(resolver.resolve('runtime/icon-transformer'))
    })

    addVitePlugin(unpluginIcons.vite({
      autoInstall: true,
    }))

    addVitePlugin(Components({
      dts: '.nuxt/icons.d.ts',
      // no nuxt components
      dirs: [],
      resolvers: [
        IconsResolver(),
      ],
    }))
  },
})
