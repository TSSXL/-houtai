/**
 * lang.js
 */

const BASEURI = '/api';

// 配置网站支持的语言
const langs = {
    en: 'en',
    'zh-cn': 'zh-CN'
}

// en cn 106 63
const languages = {
    en: 'en',
    'zh-CN': 'cn'
}
const tids = {
    en: '106',
    'zh-CN': '63'
}

const getLanguage = lang => {
    return languages[lang] || 'en'
}

/**
 * 获取浏览器的语言设置
 * 如果没找到则返回一个默认值 en
 */
export const getLang = () => {
    let lowerLang = (window.navigator.language ||
        window.navigator.browserLanguage ||
        'en').toLowerCase()

    // default: en
    return langs[lowerLang] || 'en'
}

/**
 * 设置 html 标签的 lang
 */
export const setHtmlLang = lang => {
    // documentElement 根root HTML
    document.documentElement.setAttribute('lang', lang)
}


export const getProductstypeUrl = lang => {
    const language = getLanguage(lang)
    const tid = tids[lang] || '106'
    return `${BASEURI}/productstype.php?language=${language}&tid=${tid}&num=100`
}



//获取该分类下全部的数据。例如banner
export const getProductsUrl = (tid) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/getProduct.php?id=${tid}`
}
