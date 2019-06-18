import { waitTillAccessible } from '@/store/index.js'


export const state = () => ({
    repository: new Map(),
    accessible: false
})

export const mutations = {
    register(state, tag) {
        if (state.repository.has(tag.hash)) {
            state.repository.get(tag.hash).countPost ++
        } else {
            state.repository.set(tag.hash, tag)
        }
    },
    initialized(state) {
        state.accessible = true
        console.log('tag is initialized.', state.accessible)
    }
}

export const getters = {
    async getTagByHash(state) {
        const allTags = await getters.getAll(state)

        return (hash) => {
            console.log('mapstate on getTagByHash', hash, state.repository)
            return allTags.get(hash)
        }
    },
    async getAll(state) {
        console.log('mapstate on getAll', state.repository)
        const promise = waitTillAccessible(state, 'repository')
        let allTags
        promise.then(function(repository) {
            allTags = repository
        })
        console.log('setup promise is done', promise)
        await promise
        console.log('tag isAssessible', state['accessible'])
        return allTags
    }
}