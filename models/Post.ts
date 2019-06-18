import Tag from "@/models/Tag";
import cheerio from 'cheerio'

const TITLE_CANDIDATES: Array<string> = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
const TAG_REGEX: RegExp = /\[.*?\]/g

function dropBracket(tagStr: string) {
    return tagStr.substring(1, tagStr.length - 1)
}

function findElement($: CheerioStatic, candidates: Array<string>): Cheerio | null {
    for (let tagName of candidates) {
        const candidateElem: Cheerio | null = $(tagName)
        console.log('Searching title candidate: tagname is ' + tagName, candidateElem)
        if (candidateElem !== null && candidateElem.length > 0) {
            return candidateElem.first()
        }
    }
    console.log('no element found in html.', $, candidates)
    return null
}

function removeElements ($:CheerioStatic, tagNameList: Array<string>): void {
    const elementToRemove = findElement($, tagNameList)
    if (elementToRemove !== null) {
        elementToRemove.remove()
    }
}

function extractValue ($: CheerioStatic, candidates: Array<string>, defaultValue: string): string {
    let tag: Cheerio | null = findElement($, candidates)
    return tag === null ? defaultValue : tag.text()
}

function getPathInfo (mdPath: string): object {
    // convert from "rawpost/{yyyymm}/{slug}.md" to "posts/{yyyymm}/{slug}"
    console.log('mdPath', mdPath)
    const [prefix, yyyymm, slugAndExtension] = mdPath.split('/')
    console.log(slugAndExtension.lastIndexOf('.md'))
    const slug = slugAndExtension.substring(0, slugAndExtension.lastIndexOf('.md'))
    return {
        url: '/posts/' + yyyymm + '/' + slug,
        yyyymm: yyyymm,
        slug: slug
    }
}

function addTargetOnLink($: CheerioStatic) {
    const linkTags = $('a')
    linkTags.map((i, elem) => {
        elem.attribs['target'] = '_blank'
    })
}

export async function registerAllPost(env, store) {
    const postList = await createAllPost(env, store)
    store.commit('posts/registerAll', postList)
}

export async function createAllPost(env, store) {
    const postList = new Array<Post>()
    for (let i = 0; i < env.markdownFiles.length; i++) {
        console.log('process markdown', env.markdownFiles[i], env.lastUpdateList[i])
        const path = env.markdownFiles[i]
        const lastUpdate = env.lastUpdateList[i]
        const post = await createPost(path, lastUpdate)
        if (post !== null) {
          postList.push(post)
          for (const tag of post.tags) {
              store.commit('tags/register', tag)
          }
        }
    }
    return postList
}

export async function createPost(mdPath: string, lastUpdate: string):Promise<Post|null> {
    try {
        const markDownFile = await import('@/' + mdPath)
        const $ = cheerio.load(markDownFile.default)
        return new Post($, mdPath, lastUpdate)
    } catch (e) {
        console.error('error on convert.', e)
        return null
    }
}

export class Post {
    title: string
    tags: Array<Tag>
    textContent: string
    htmlContent: string
    content: CheerioStatic
    myPath: string
    yyyy: string
    mm: string
    slug: string
    lastUpdate: string

    constructor($: CheerioStatic, originalMdFile: string, lastUpdate: string) {
        const titleWithTag = extractValue($, TITLE_CANDIDATES, '')
        this.title = titleWithTag.replace(TAG_REGEX, '')
        const tagStrArray: Array<string> | null = titleWithTag.match(TAG_REGEX)
        this.tags = tagStrArray !== null ? tagStrArray.map(tagStr => new Tag(dropBracket(tagStr))) : new Array<Tag>()
        removeElements($, TITLE_CANDIDATES)
        addTargetOnLink($)
        this.content = $
        this.htmlContent = $.html()
        if ($.root().text() !== null) {
            this.textContent = $.root().text()
        } else {
            this.textContent = ''
        }
        const pathInfo = getPathInfo(originalMdFile)
        this.myPath = pathInfo['url']
        this.yyyy   = pathInfo['yyyymm'].substr(0, 4)
        this.mm     = pathInfo['yyyymm'].substr(4, 2)
        this.slug   = pathInfo['slug']

        this.lastUpdate = lastUpdate
    }

    public getSummary(length?: number): string{
        const DEFAULT_LENGTH = 200
        const summaryLength = length || DEFAULT_LENGTH
        let summaryContent: string
        if (this.textContent.length > summaryLength) {
            summaryContent = this.textContent.substring(0, summaryLength) + '...'
        } else {
            summaryContent = this.textContent
        }
        return summaryContent
    }
}

export default {Post, createPost}