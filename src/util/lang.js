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

//获取首页图片的内容
export const getHome = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/getClass`
}

//添加首页图片的内容
export const addPic = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/addClass`
}

//修改图片的内容
export const editPic = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/updateClass`
}


//删除图片的内容
export const deletePic = (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/deleteClass?id=${id}`
}

//修改排序
export const editOrder = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/changeClass`
}



//获取分类
export const getCategory = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/getCategory`
}

//添加分类
export const addCategory = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/addCategory`
}

//修改分类
export const editCategory= () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/updateCategory`
}


//删除分类
export const deleteCategory = (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/deleteCategory?id=${id}`
}

//修改分类排序
export const editCategoryOrder = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/changeCategory`
}


//获取产品
export const getProduct = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/getProduct`
}


//添加产品
export const addProduct = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/addProduct`
}

//查看产品
export const getProductInfo = (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/editProduct?id=${id}`
}

//修改分类
export const editProduct= () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/updateProduct`
}

//删除产品
export const deleteProduct= (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/deleteProduct?id=${id}`
}


//删除规格
export const deleteOne= (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/deleteProduct_list?id=${id}`
}

//修改产品排序
export const editProductOrder = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/changeProduct`
}



//获取用户
export const getUser = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/getUser`
}


//获取订单
export const getOrder = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/getOrder`
}


//查看订单
export const getOrderInfo = (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/editOrder?id=${id}`
}


//查看订单
export const editDing = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/updateOrder`
}
