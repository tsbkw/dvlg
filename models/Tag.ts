
const ROUTER_PREFIX: string = '/tags/' // TODO think about multiple tags
export default class Tag {
    tagStr: string
    linkToMe: string
    hash: string
    countPost: number // how many posts are related to this tag
    constructor(tagStr: string) {
        this.tagStr = tagStr
        this.hash = this.hashCode(tagStr)
        this.linkToMe = ROUTER_PREFIX + this.hash
        this.countPost = 1
    }

    private containsOnlyAlphabetNumber = /^[a-zA-Z0-9_]*$/
    
    private hashCode = (tagStr: string) => {
        if(this.containsOnlyAlphabetNumber.exec(tagStr)) {
            return tagStr
        }

        // import from Java's String.hashCode()
        let hash = 0
        if (tagStr.length == 0) {
            return hash.toString()
        }
        for (let i = 0; i < tagStr.length; i++ ) {
            hash = ((hash<<5)-hash) + tagStr.charCodeAt(i)
            hash = hash & hash // cconvert to 32bit integer
        }
        return hash.toString()
    }

    public toString = () => {
        return this.tagStr
    }
}