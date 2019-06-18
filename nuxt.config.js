import pkg from './package';
import dvlgConfig from './dvlg.config';
import { file } from '@babel/types';

const fs = require('fs');
const path = require('path');
const RAW_POST_ROOT = 'rawpost';
const CONVERTED_POST_ROOT = 'posts';
const TEST_POST_DATA_PATH = 'test/testpost';

// Setup testdata if not production, and remove testdata if production
// This cannot be done in hooks, because env.markdownFiles is loaded before hooks.build.before runs.
if (process.env.NODE_ENV === 'production') {
  const testPostPathList = getPathRecursively(TEST_POST_DATA_PATH);
  testPostPathList.forEach(testPostPath => {
    const destPostPath = testPostPath.replace(TEST_POST_DATA_PATH, RAW_POST_ROOT);
    if (fs.existsSync(destPostPath)) {
      fs.unlinkSync(destPostPath)
    }
  });
  const dirents = fs.readdirSync(RAW_POST_ROOT, {withFileTypes: true});
  dirents.forEach(dirent => {
    if(dirent.isDirectory()) {
      const dirPath = path.join(RAW_POST_ROOT, dirent.name);
      const filesInDirent = fs.readdirSync(dirPath);
      if(filesInDirent.length === 0) {
        fs.rmdirSync(dirPath);
      }
    }
  });
} else {
  const testPostPathList = getPathRecursively(TEST_POST_DATA_PATH);
  testPostPathList.forEach(testPostPath => {
    const destPostPath = testPostPath.replace(TEST_POST_DATA_PATH, RAW_POST_ROOT);
    const parentDirPath = destPostPath.slice(0, destPostPath.lastIndexOf('/'))
    if (!fs.existsSync(parentDirPath)) {
      fs.mkdirSync(parentDirPath, '0777');
    }
    fs.copyFileSync(testPostPath, destPostPath);
  });
}


const lastUpdateList = [];
const lastUpdateMap = new Map();
function getPathRecursively(filePath, filterFunc = _ => true, setLastUpdateList = false, lastUpdateMap=undefined) {
  const pathList = [];
  const dirents = fs.readdirSync(filePath, {withFileTypes: true});
  dirents.forEach(dirent => {
    const pathToDirent = path.join(filePath, dirent.name);
    if (dirent.isDirectory()) {
      getPathRecursively(pathToDirent, filterFunc).forEach(x => pathList.push(x), false, lastUpdateMap);
    } else if(filterFunc(dirent)) {
      const stats = fs.statSync(pathToDirent);
      pathList.push(pathToDirent);
      if(lastUpdateMap) {
        lastUpdateMap.set(pathToDirent, stats.mtime);
        console.log('set lastUpdateMap', pathToDirent, stats.mtime);
      }
    }
  });
  if (lastUpdateMap) {
    pathList.sort((path1, path2) => lastUpdateMap.get(path2) - lastUpdateMap.get(path1));
  }
  console.log('setLastUpdateList', setLastUpdateList)
  console.log('lastUpdateMap', lastUpdateMap)
  if (setLastUpdateList) {
    pathList.forEach(mdPath => {
      console.log('lastUpdateMap.get', lastUpdateMap.get(mdPath))
      lastUpdateList.push(lastUpdateMap.get(mdPath));
    });
  }
  return pathList
}

let mdPathList = undefined;
function loadMdFiles() {
  if (mdPathList === undefined) {
    mdPathList = getPathRecursively(RAW_POST_ROOT, x => {
      return !x.name.startsWith('__') && x.name.endsWith('.md');
    }, true, lastUpdateMap);
    console.log('total files: ', mdPathList.length, lastUpdateList.length);
    for (let i = 0; i < mdPathList.length; i++ ) {
      console.log('loaded file and last update: ', mdPathList[i], lastUpdateList[i]);
    }
  }
  return mdPathList;
}

function postPathList() {
  const mdPathList = loadMdFiles();
  const postPathList = [];
  mdPathList.map(mdPath => postPathList.push(mdPath.replace(RAW_POST_ROOT, CONVERTED_POST_ROOT).replace('.md','')))
  return postPathList
}



export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '@/plugins/initaction.js'},
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    //'@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa',
    '@nuxtjs/markdownit'
  ],
  bootstrapVue: {
    components: [
      'BNavbar', 'BNavbarNav', 'BNavItem', 'BNavbarBrand', 'BNavbarToggle', 'BCollapse', // Header
      'BCard', 'BCardTitle', 'BCardSubTitle', 'BCardText', 'BCardGroup', // Card
      'BBadge'],
  },
  
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, { isDev, isClient }) {
      if (isClient) {
        config.node = {
          fs: 'empty',
          child_process: 'empty',
          net: 'mock',
          tls: 'mock'
        }
        config.devtool = '#source-map'
        // change setting of HtmlWebpackPlugin for preventing Cyclic dependency error.
        // see details: https://github.com/vuejs/vue-cli/issues/1669#issuecomment-446595864
        const HtmlWebpackPlugin = config.plugins.find(plugin => {
          return plugin.constructor.name === 'HtmlWebpackPlugin'
        })
        HtmlWebpackPlugin.options.chunksSortMode = 'none'
      }
      
    }
  },

  generate: {
    routes: postPathList(),
  },

  env: {
    markdownFiles: loadMdFiles(), // to access all pathes from vue components.
    lastUpdateList: lastUpdateList, // this list is same order as markdownFiles
    author: dvlgConfig.author,
    contact: dvlgConfig.contact,
    github: dvlgConfig.github,
    firstPublishYear: dvlgConfig.firstPublishedYear
  },

  markdownit: {
    injected: true,
    breaks: true,
    html: true,
    linkify: true,
    typography: true,
  },
}
