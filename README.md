# What is this?
dvlg [devlog] is short for developer's blog.
This project aims to make it easy to write blog with markdown, and manage content with git.

# Motivations
What I need is...
1. Full controllablity to blog site and it's original content.
1. High UX for writing with markdown, even if offline.
1. 100% Free of use.

for more details, see [bottom](#long-motivation)

# Usage
## install dependencies, and run localy
```
yarn install
OR
npm install
```
THEN
```
yarn dev
OR
npm run dev
```

## Configuration
1. Edit rawpost/about.md file as you want. This will be used in the top page (routed as '/') of the site. Your posts list is followed by this.
2. Modify dvlog.config.js describe as below.
    - author : Your name or something express yourself. This value is used in footer as copyright.
    - contact: Your contact email address. If you don't want to show your address, comment out or remove this value.
    - firstPublishYear: First year of publish this site. This value is used in footer as copyright. For example, if you set 2018 as this value, copyright will be 2018-2019.(IF you see this site in 2019.)
## Add and edit the Post
1. Create md file in the folder `rawpost/{yyyymm}` where yyyymm is year and month of the publish date of the post.
1. DONE!

**NOTE**: Markdown syntax is almost same as [markdownit](https://github.com/markdown-it/markdown-it), however these syntax have special meaning.
* h1: first element of h1 (in markdown, this is a line start with `#` ) is used as `title` of the blog. You can add tags by writing \[SomeTagNameYouWant\] in the `title`.
* For example, if you write \[Python\]\[Beginner\]Useful syntax for machine learning\[Machine Learning\] in `h1`, this will create
    * title: Useful syntax for machine learning
    * tags: Python, Beginner, Machine Learning
* If there is no h1 tag, try to search for h2, h3, h4, h5, h6. If none of them are found, title is blank and no tags are set.

## Check generated file localy
There are 2 options to check localy.
1. check with `yarn dev` or `npm run dev`
2. check with docker container

### 1. check with nuxt server
Just run the following command. Nuxt will run local server and you can access to localhost:<the port you specified> with the browser.
If you use yarn, 
```
yarn dev
```
Or if you use npm,
```
npm run dev
```

The port is specified by package.json, and default port is 30080.
```
  "scripts": {
    "dev": "nuxt --port 30080", // HERE the port is specified. 
    "build": "nuxt build",
    "start": "nuxt start",
    "generate": "nuxt generate",
    "test": "jest",
    "dev-debug": "node --inspect-brk=9229 node_modules/nuxt/bin/nuxt --port 3333"
  },
```

### 2. check with docker container
You can generate static file and run docker container to check how does your posts are seen.
#### build manually
If you use yarn,
```
yarn generate
```
Or if you use npm,
```
npm run generate
```


#### Run docker container
This will run nginx container, and mount ./dist.
```
./local_docker_test.sh
```
You can access to localhost:<the port you specified> with the browser.
The port is specified in ./docker/docker-compose.yml and default value is 30081.

## first publish
Before start using this, you have to make account at netlify, it's free.
After created account, take following steps.
1. login netlify, goto Sites tab and click 'New site from Git'.
1. choose github.
1. choose 'Only select repositories' and select the repository you copied this repo, click install.
1. input as follows.
    - Build command: npm run generate
    - Publish directory: dist


# <a name='long-motivation'></a>Motivations in details
I know there are some blog hosting service which enabled markdown, but these services require a preminum plan to customize your site or remove ads.

If you find another good service, it's hard to transfering all contents you made, because these service want to hold your site and compatiblity of format is not perfect even if you use markdown.

These days, netlify and other hosting services are avaliable with free plan and of course github gives you free one private repository.

I think these places are very good place to keep your contents of blog. You don't have to worry about loosing contents, because backed up at three places, hosting service, github and your local environment.

Also online service is not available without network and some times I need to write some notes in these circumstances.
I found VSCode, or other editor you use when programming or documentaion, is confortable for developer to write markdown. And I love preview mode of VSCode, because of it's performance. 