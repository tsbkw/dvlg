import { mount } from '@vue/test-utils'
import { Post } from '@/models/Post'
import TopPage from '../pages/index.vue'

// This doesn't work because of import error
// console.error node_modules/vue/dist/vue.runtime.common.dev.js:621
// [Vue warn]: Failed to resolve async component: () => import('@/components/post/PostList.vue')
// Reason: Error: Not supported
// describe('TopPage', () => {
// 	test('can load md files', async () => {
// 			const topPage = mount(TopPage)
// 			expect(topPage).not.toBeNull()
// 			// expect(post).toEqual({
// 			// 	textContent: expect.stringContaining('default')
// 			// })
// 	})
// })
describe('foo', () =>{
	test('bar', () => {})
})
