import Vue from 'vue'


export function deepCopy(target:any) {
    if (typeof target == 'object') {
        const result = Array.isArray(target) ? [] : {} 
        for (const key in target) {
            if (typeof target[key] == 'object') {
                result[key] = deepCopy(target[key])
            } else {
                result[key] = target[key]
            }
        }

        return result
    }

    return target
}

export function getAssetsFile(url:string){
return new URL(`../assets/image/${url}`,import.meta.url).href
}