export default (context) => {
    setTimeout(() => {
        console.log('try common init')
        context.store.dispatch('nuxtCommonInit', context)
    }, 0)
}