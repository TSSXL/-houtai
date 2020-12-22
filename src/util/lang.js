/**
 * lang.js
 */

const BASEURI = '/api';

// 配置网站支持的语言
const langs = {
    en: 'en',
    'zh-cn': 'zh-CN'
};

// en cn 106 63
const languages = {
    en: 'en',
    'zh-CN': 'cn'
};
const tids = {
    en: '106',
    'zh-CN': '63'
};

const getLanguage = lang => {
    return languages[lang] || 'en'
};

/**
 * 获取浏览器的语言设置
 * 如果没找到则返回一个默认值 en
 */
export const getLang = () => {
    let lowerLang = (window.navigator.language ||
        window.navigator.browserLanguage ||
        'en').toLowerCase();

    // default: en
    return langs[lowerLang] || 'en'
};

/**
 * 设置 html 标签的 lang
 */
export const setHtmlLang = lang => {
    // documentElement 根root HTML
    document.documentElement.setAttribute('lang', lang)
};


export const getProductstypeUrl = lang => {
    const language = getLanguage(lang);
    const tid = tids[lang] || '106';
    return `${BASEURI}/productstype.php?language=${language}&tid=${tid}&num=100`
};


//登录
export const login = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/Login`
};

//添加陵园的内容
export const addCemetery = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/addCemetery`
};


//获取陵园的内容
export const getHome = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/getCemetery`
};


//查看陵园的内容
export const editCemetery = (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/editCemetery?id=${id}`
};


//删除陵园的内容
export const deleteCemetery = (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/deleteCemetery?id=${id}`
};


//改变陵园状态
export const changeCemetery = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/changeCemetery`
};



//修改陵园的内容
export const updateCemetery = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/updateCemetery`
};





//添加烈士墓的内容
export const addTomb = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/addTomb`
};


//获取烈士墓的内容
export const getTomb = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/getTomb`
};


//查看烈士墓的内容
export const editTomb = (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/editTomb?id=${id}`
};


//删除烈士墓的内容
export const deleteTomb = (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/deleteTomb?id=${id}`
};


//改变烈士墓状态
export const changeTomb = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/changeTomb`
};



//修改烈士墓的内容
export const updateTomb = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/updateTomb`
};





//添加烈士的内容
export const addMartyr = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/addMartyr`
};


//获取烈士的内容
export const getMartyr = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/getMartyr`
};


//查看烈士的内容
export const editMartyr = (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/editMartyr?id=${id}`
};


//删除烈士的内容
export const deleteMartyr = (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/deleteMartyr?id=${id}`
};


//改变烈士状态
export const changeMartyr = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/changeMartyr`
};



//修改烈士的内容
export const updateMartyr = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/updateMartyr`
};


//获取所有陵园和烈士
export const Cemetery_Tomb = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/Cemetery_Tomb`
};





//添加公告的内容
export const addNotice = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/addNotice`
};


//获取烈士的内容
export const getNotice = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/getNotice`
};


//查看烈士的内容
export const editNotice = (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/editNotice?id=${id}`
};


//删除烈士的内容
export const deleteNotice = (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/deleteNotice?id=${id}`
};


//改变烈士状态
export const changeNotice = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/changeNotice`
};



//修改烈士的内容
export const updateNotice = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/updateNotice`
};

//获取会员的内容
export const getUser = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/getUser`
};




//获取展品
export const getGoods = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/getGoods`
};


//添加展品
export const addGoods = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/addGoods`
};



//查看展品
export const editGoods = (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/editGoods?id=${id}`
};


//删除展品
export const deleteGoods= (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/deleteGoods?id=${id}`
};


//修改展品
export const updateGoods = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/updateGoods`
};











//获取网站内容
export const getContent = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/getContent`
};



//添加网站内容
export const addContent = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/addContent`
};



//查看网站内容
export const editContent = (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/editContent?id=${id}`
};


//删除网站内容
export const deleteContent= (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/deleteContent?id=${id}`
};


//修改网站内容
export const updateContent = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/updateContent`
};





//获取分类
export const getType = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/getType`
};



//添加分类
export const addType = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/addType`
};



//查看分类
export const editType = (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/editType?id=${id}`
};


//删除分类
export const deleteType= (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/deleteType?id=${id}`
};


//修改分类
export const updateType = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/updateType`
};




//获取科普知识
export const getArticle = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/getArticle`
};


//添加科普知识
export const addArticle = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/addArticle`
};



//查看科普知识
export const editArticle = (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/editArticle?id=${id}`
};


//删除科普知识
export const deleteArticle= (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/deleteArticle?id=${id}`
};


//修改科普知识
export const updateArticle = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/updateArticle`
};


//获取博物馆信息
export const getComment = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/getComment`
};


//修改评论状态
export const checkComment = () => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/checkComment`
};

//删除评论
export const deleteComment= (id) => {
    // const language = getLanguage(lang)
    return `${BASEURI}/Admin/deleteComment?id=${id}`
};
