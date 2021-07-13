import apis from './api.js'

// ajax对象
function HsAjax() {}

HsAjax.prototype = {
    constructor: HsAjax,
    /**
     * ajax GET封装
     * @param {String} urlKey url映射文件
     * @param {JSON} reqData 请求参数
     * @param {JSON} header 请求头
     */
    get: async function(urlKey, reqData, header) {
        await ajax("GET", urlKey, reqData, header);
    },
    /**
     * ajax POST封装
     * @param {String} urlKey url映射文件
     * @param {JSON} reqData 请求参数
     * @param {JSON} header 请求头
     */
    post: async function(urlKey, reqData, header) {
        await ajax("POST", urlKey, reqData, header);
    }
}

/**
 * ajax封装
 * @param {String} method 方法GET/POST
 * @param {String} urlKey url映射文件
 * @param {JSON} reqData 请求参数
 * @param {JSON} header 请求头
 */
function ajax(
    method,
    urlKey,
    reqData = {},
    header = {}
) {
    return new Promise((resolve, reject) => {
        const url = getParsedUrl();
        const sendData = method === 'GET' ? null : reqData;
        const xhr = new XMLHttpRequest();
    
        // 设置请求头（若有）
        if(header && Object.keys(header).length) {
            Object.keys(header).map(key => {
                xhr.setRequestHeader(key, header[key]);
            })
        }
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4) {
                try {
                    if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                        const response = xhr.responseText;
                        resolve(response);
                    } else {
                        const error = xhr.status + xhr.statusText;
                        reject(error);
                    }
                } catch (err) {
                    // 
                }
            }
        }
        xhr.open(method, url, true);
        xhr.send(sendData);
    })
    
    // 获取url地址
    function getParsedUrl() {
        // urlKey解析获取url地址
        const keys = urlKey.split('.')
        // 解析拼接参数
        const param = (() => {
            let paramArr = []
            Object.keys(reqData).map(key => {
                paramArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(reqData[key]))
            })
            
            return '?' + paramArr.join('&')
        })()

        return method === "GET"
            ? apis[keys[0]][keys[1]] + param
            : apis[keys[0]][keys[1]]
    }
}

export const hsAjax = new HsAjax()