enum EContentTypeHandle {
    ['application/json'] = 'json',
    ['text/html'] = 'text',
    ['application/xhtml+xm'] = 'text',
    ['application/octet-stream'] = 'blob',
    ['multipart/form-data'] = 'formData'

}


/*
return string || undefined
*/
const getContentTypeHandle = (contentType: any): any =>{
    return Reflect.ownKeys(EContentTypeHandle).find( (elem) => contentType.includes(elem) === true);
}


export {
    getContentTypeHandle
}