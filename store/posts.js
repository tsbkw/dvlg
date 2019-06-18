import { waitTillAccessible } from '@/store/index.js'

class DateOrderIndex {
    constructor() {
        /*
         data structure
          yearMap<year, monthMap>
            `-monthMap<month, postList>
        */
        this.yearMap = new Map();
    }
    addPost(post) {
        if (!this.yearMap.has(post.yyyy)) {
            this.yearMap.set(post.yyyy, new Map())
        }
        const monthMap = this.yearMap.get(post.yyyy)
        if (!monthMap.has(post.mm)) {
            monthMap.set(post.mm, new Array())
        }
        monthMap.get(post.mm).push(post)
    }
    getMmMap(yyyy) {
        const monthMap = this.yearMap.get(yyyy)
        return monthMap === undefined ? new Map() : monthMap
    }
    getAllByYear(yyyy) {
        const postList = new Array()
        if (!this.yearMap.has(yyyy)) {
            this.yearMap.set(yyyy, new Map())
        }
        const monthMap = this.yearMap.get(yyyy)
        for (const monthPostList of monthMap.values()) {
            monthPostList.map(post => postList.push(post))
        }
        console.log('postList ', postList)
        console.log(this.yearMap)
        return postList
    }
    getAllByYearMonth(yyyy, mm) {
        const postList = new Array()
        if (!this.yearMap.has(yyyy)) {
            this.yearMap.set(yyyy, new Map())
            this.yearMap.get(yyyy).set(mm, postList)
            return postList
        }
        const monthMap = this.yearMap.get(yyyy)
        if (!monthMap.has(mm)) {
            monthMap.set(mm, postList)
            return postList
        }
        return monthMap.get(mm)
    }
    getAll() {
        const postList = new Array()
        for (const year of this.yearMap.keys()) {
            const yearPostList = this.getAllByYear(year)
            yearPostList.map(post => postList.push(post))
        }
        return postList
    }
}

export const state = () => ({
    dateOrder: new DateOrderIndex(),
    postIndex: new Map(),
    postList: new Array(),
    accessible: false,
})

function getPostKey(post) {
    return post.yyyy + post.mm + post.slug
}

export const mutations = {
    registerAll(state, postList) {
        for (const post of postList) {
            state.postList.push(post)
            state.dateOrder.addPost(post)
            state.postIndex.set(getPostKey(post), post)
        }
        state.accessible = true
    },
    initialized(state) {
        state.accessible = true
    },
}

export const getters = {
    async getAll(state) {
        const promise = waitTillAccessible(state, 'postList')
        let allPost
        promise.then(function(postList) {
            allPost = postList
        })
        await promise
        return allPost
    },
    getAllByYear(state) {
        return async (year) => {
            const promise = waitTillAccessible(state, 'dateOrder')
            let postList
            promise.then(function(dateOrder) {
                postList = dateOrder.getAllByYear(year)
            })
            await promise
            return postList
        }
    },
    getAllByYearMonth(state) {
        return async (year, month) => {
            const promise = waitTillAccessible(state, 'dateOrder')
            let postList
            promise.then(function(dateOrder) {
                postList = dateOrder.getAllByYearMonth(year, month)
            })
            await promise
            return postList
        }
    },
    getById(state) {
        return async (yyyymm, slug) => {
            const promise = waitTillAccessible(state, 'postIndex')
            let post
            promise.then(function(postIndex) {
                post = postIndex.get(yyyymm + slug)
                console.log('post, postIndex', post, postIndex, yyyymm, slug)
            })
            await promise
            return post
        }
    }
}