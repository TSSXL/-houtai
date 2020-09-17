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


//登录
export const login = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/Login`
}

//添加陵园的内容
export const addCemetery = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/addCemetery`
}


//获取陵园的内容
export const getHome = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/getCemetery`
}


//查看陵园的内容
export const editCemetery = (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/editCemetery?id=${id}`
}


//删除陵园的内容
export const deleteCemetery = (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/deleteCemetery?id=${id}`
}


//改变陵园状态
export const changeCemetery = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/changeCemetery`
}



//修改陵园的内容
export const updateCemetery = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/updateCemetery`
}





//添加烈士墓的内容
export const addTomb = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/addTomb`
}


//获取烈士墓的内容
export const getTomb = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/getTomb`
}


//查看烈士墓的内容
export const editTomb = (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/editTomb?id=${id}`
}


//删除烈士墓的内容
export const deleteTomb = (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/deleteTomb?id=${id}`
}


//改变烈士墓状态
export const changeTomb = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/changeTomb`
}



//修改烈士墓的内容
export const updateTomb = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/updateTomb`
}





//添加烈士的内容
export const addMartyr = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/addMartyr`
}


//获取烈士的内容
export const getMartyr = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/getMartyr`
}


//查看烈士的内容
export const editMartyr = (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/editMartyr?id=${id}`
}


//删除烈士的内容
export const deleteMartyr = (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/deleteMartyr?id=${id}`
}


//改变烈士状态
export const changeMartyr = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/changeMartyr`
}



//修改烈士的内容
export const updateMartyr = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/updateMartyr`
}


//获取所有陵园和烈士
export const Cemetery_Tomb = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/Cemetery_Tomb`
}





//添加公告的内容
export const addNotice = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/addNotice`
}


//获取烈士的内容
export const getNotice = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/getNotice`
}


//查看烈士的内容
export const editNotice = (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/editNotice?id=${id}`
}


//删除烈士的内容
export const deleteNotice = (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/deleteNotice?id=${id}`
}


//改变烈士状态
export const changeNotice = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/changeNotice`
}



//修改烈士的内容
export const updateNotice = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/updateNotice`
}

//获取会员的内容
export const getUser = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/getUser`
}





