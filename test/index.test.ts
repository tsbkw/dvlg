// import { resolve } from 'path'
// import { Nuxt, Builder } from 'nuxt'
// import { JSDOM } from 'jsdom'

// // We keep the nuxt and server instance
// // So we can close them at the end of the test
// let nuxt: Nuxt

// // Init Nuxt.js and create a server listening on localhost:4000
// beforeAll(async() => {
//   const config = {
//     dev: false,
//     rootDir: resolve(__dirname, '@')
//   }
//   nuxt = new Nuxt(config)
//   if (nuxt === undefined) {
//     fail('nuxt cannot be initialized')
//   }
//   const initFinishPromise = new Promise((resolve, reject) => {
//     // nuxt.hook('ready', async () => {
//     //   console.log('nuxt is ready')
//     //   resolve('nuxt is ready')
//     // })
//     nuxt.hook('listen', async(server , {host, port}) => {
//       console.log('nuxt is listening', server, host, port)
//       resolve('nuxt is listeing')
//     })
//     nuxt.hook('error', async () => {
//       console.log('nuxt setup error')
//       reject('nuxt init is failed')
//     })
    
//     setTimeout(() => {
//       console.log('nuxt setup timeout')
//       reject('timeout error')
//     }, 30000)
//   })
//   await new Builder(nuxt).build()
//   await nuxt.server.listen(4000, 'localhost')
  
//   return initFinishPromise
// }, 70000); // prevent start testing before setup done

// // Example of testing only generated html
// describe('Route /', () => {
//   test('exists and render HTML', async (t) => {
//     const context = {}
//     const { html } = await nuxt.server.renderRoute('/', context)
//     expect(html.includes('<div>')).toBeTruthy()
//   })
// })

// // Example of testing via dom checking
// describe('Route /', () => {
//   test('exists and render HTML with CSS applied', async(t) => {
//     const context = {}
//     const { html } = await nuxt.server.renderRoute('/', context)
//     const { window } = new JSDOM(html).window
//     const element = window.document.querySelector('.red')
//     expect(element).not.toBeNull()
//   })
// })

// // Close server and ask nuxt to stop listening to file changes
// afterEach(async() => {
//   nuxt.close()
// })
