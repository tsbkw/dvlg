import { mount } from '@vue/test-utils'
import { Post, createPost } from '@/models/Post'
import PostList from '../components/post/PostList.vue'

describe('PostList', () => {
	test('can be show with empty Array<Post>', async () => {
		const postList = mount(PostList, {
			propsData: {
				postList: new Array<Post>()
			}
		})
		expect(postList).not.toBeNull()
	})
})
