/** @format */

import { message } from 'antd';
import { EHTTP } from '@constants/enums';

const { getServerHOST, getContentTypeHandle, TOKENERROR } = EHTTP;

// const DEFAULTCONFIG = { baseURL: process.env.BASEURL};
interface IFetchStream {
    body: any;
    bodyUsed: boolean;
    headers: object;
    ok: boolean;
    redirected: boolean;
    status: number;
    stautsText: string;
    type: string;
    url: string;
    parseData?: any;
    errMsg?: string;
}

/**
 * 对响应数据进行解析
 */
const handleData = (
    response: any,
    resposneObj: IFetchStream,
    callback: string,
): Promise<void> =>{
    return response[callback]().then((data: any) => {
        if (response.ok) {
            return Promise.resolve(
                Object.assign(resposneObj, {
                    parseData: data,
                }),
            );
        }
        return Promise.reject(
            Object.assign(resposneObj, {
                parseData: null,
            }),
        );
    });
}

// 格式化数据
function transformData(data: any): FormData | string {
    if (data instanceof FormData) {
        return data;
    }
    const res: any[] = [];
    for (const key of Reflect.ownKeys(data)) {
        res.push(`${key as any}=${res[key as any]}`);
    }
    return res.join('&');
}

/**
 * 生成请求方式
 */
const  createMethod = (method: string): Function => {
    const options: any = {};
    return async (api: string, params?: any): Promise<any> => {
        let url: string = getServerHOST() + api;
        if (method === 'GET') {
            url += url.includes('?') ? '&' : `?${transformData(params.data)}`;
        } else {
            if (typeof params.data === 'object') {
                options.headers['Content-Type'] =
                    'application/json;charset=UTF-8';
            } else {
                options.headers['Content-Type'] =
                    'application/x-www-form-urlencoded';
            }
            options.body = params.data;
        }

        // fetch 请求
        await fetch(url, {
            method,
            credentials: 'include',
            // headers: {
            //     Authorization: `Bearer ${getCookie(COOKIE_KEYS.TOKEN)}`
            // }

            ...options,
        })
            .then(response => {
                const contentType = response.headers.get('content-type');
                const resHandel = getContentTypeHandle(contentType);
                const resposneObj: IFetchStream = {
                    body: response.body,
                    bodyUsed: response.bodyUsed,
                    headers: response.headers,
                    ok: response.ok,
                    redirected: response.redirected,
                    status: response.status,
                    stautsText: response.statusText,
                    type: response.type,
                    url: response.url,
                };
                return resHandel !== undefined
                    ? handleData(response, resposneObj, resHandel)
                    : Promise.reject(
                          Object.assign(resposneObj, {
                              errMsg: `sorry, contentType(${contentType}) is not supported, \n 无法解析该content-type，请查看列表支持项`,
                          }),
                      ); // 数据格式解析失败
            })
            .then(
                (res: any) => res.parseData, // 返回服务端的数据
            )
            .catch(error => {
                // 401,402...
                if (TOKENERROR.includes(error.status)) {
                    message.destroy();
                    message.error('用户认证失败! 请登录重试...');
                    let authTimer: any = null;
                    window.clearTimeout(authTimer);
                    authTimer = setTimeout(
                        () => location.replace('/login'),
                        300,
                    );
                    return;
                }
                throw new Error(
                    `errText:${error.statusText ||
                        error.errMsg ||
                        '网络故障'},\n
          errCode:${error.status}`,
                );
            });
    };
}

export default {
    get: createMethod('GET'),
    post: createMethod('POST'),
    delete: createMethod('DELETE'),
    push: createMethod('PUSH'),
};
