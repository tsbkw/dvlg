import { registerAllPost } from '@/models/Post'

export function waitTillAccessible(state, attrTarget='value', attrAccessible='accessible') {
    const promise = new Promise(function(resolve){
        function wait() {
            if (state[attrAccessible]) {
                console.log('resolve and return value', attrTarget, state[attrTarget])
                resolve(state[attrTarget])
            } else {
                return _ => setTimeout(wait(), 0)
            }
        }

        function trampoline(fnReturnFnWhileWait) {
            console.log('start trampoline')
            return (...args) => {
                let result = fnReturnFnWhileWait(...args)
                console.log('first result in trampoline', result)
                while (typeof result === 'function') {
                    console.log('still calling result', result)
                    result = result()
                }
                return result
            }
        }

        trampoline(wait)()
    })
    return promise
}

export const actions = {
    async nuxtCommonInit({ commit }, { env, store }) {
        console.log('common init called', env, store)
        await registerAllPost(env, store)
        store.commit('posts/initialized')
        store.commit('tags/initialized')
    },
}