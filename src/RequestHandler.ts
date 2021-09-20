import fetch, { Headers, Response } from 'node-fetch';
import { URL } from 'whatwg-url';

export class RequestHandler {
    token: string;
    endpoint: string;

    constructor(token: string, endpoint: string) {
        this.token = token;
        this.endpoint = endpoint;
    }

    async get(route: string, params?: { [key: string]: any }, expectBody = true, parseJson = true) {
        let url = new URL(route, this.endpoint);
        if (params !== undefined) {
            for (let key in params) {
                if (params[key] instanceof Array) {
                    params[key].forEach((e: any) => {
                        url.searchParams.append(key + '[]', e);
                    });
                } else {
                    url.searchParams.set(key, params[key]);
                }
            }
        }
        let response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Accept': 'application/json+canvas-string-ids'
            }
        });

        if (response.ok) {
            if (expectBody) {
                if (parseJson) {
                    let json = await response.json();
                    return json;
                } else {
                    return response;
                }
            }
        } else {
            throw Error(`Request to ${url} failed with code ${response.status}!`);
        }
    }

    async post(route: string, body?: any, expectBody = true, parseJson = true) {
        let url = new URL(route, this.endpoint);
        let options: any = {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Accept': 'application/json+canvas-string-ids'
            }
        }

        if (body !== undefined) {
            options = {
                ...options,
                headers: {
                    ...options.headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        }

        let response = await fetch(url, options);

        if (response.ok) {
            if (expectBody) {
                if (parseJson) {
                    let json = await response.json();
                    return json;
                } else {
                    return response;
                }
            }
        } else {
            throw Error(`Request to ${url} failed with code ${response.status}!`);
        }
    }

    async delete(route: string, expectBody = false, parseJson = true) {
        let url = new URL(route, this.endpoint);
        let response = await fetch(url, {
            method: 'delete',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Accept': 'application/json+canvas-string-ids'
            }
        });

        if (response.ok) {
            if (expectBody) {
                if (parseJson) {
                    let json = await response.json();
                    return json;
                } else {
                    return response;
                }
            }
        } else {
            throw Error(`Request to ${url} failed with code ${response.status}!`);
        }
    }

    private getNextLink(headers: Headers) {
        if (headers.has('Link')) {
            let next = headers.get('Link')!.split(',').map(e => e.trim().split('; ')).find(e => e[1] === 'rel="next"');
            if (next) return next[0].slice(1, -1);
        }
    }

    async paginate(res: Response) {
        let json = [];
        let next: string | undefined;
        do {
            json.push(...(await res.json()));
            next = this.getNextLink(res.headers);
            if (next) {
                res = await this.get(next, undefined, true, false);
            }
        } while (next !== undefined);
        return json;
    }
}