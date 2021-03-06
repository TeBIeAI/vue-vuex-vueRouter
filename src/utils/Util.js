/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */

export const getStore = name => {
    if (!name) return
    var value = window.localStorage.getItem(name)
    if (value !== null) {
        value = JSON.parse(value)
    }
    return value
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name) return
    window.localStorage.removeItem(name)
}


export const params = url => {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }


    return search
}

export const param2Obj = url => {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    )
}
