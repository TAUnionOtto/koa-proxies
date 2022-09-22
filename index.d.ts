import { IncomingMessage, ServerResponse, ClientRequest } from 'http';
import * as Koa from 'koa';

declare function KoaProxies(path: string | RegExp | (string | RegExp)[], options: KoaProxies.IKoaProxiesOptions): Koa.Middleware;

declare namespace KoaProxies {
  interface IKoaProxiesExtendRequest extends IncomingMessage {
    oldPath: string,
  }

  interface IKoaProxiesExtendProxyRequest extends ClientRequest {
  }

  interface IKoaProxiesExtendProxyResponse extends IncomingMessage {
    req: IKoaProxiesExtendProxyRequest,
  }

  interface IBaseKoaProxiesOptions {
    target: string;
    changeOrigin?: boolean;
    logs?: boolean | ((ctx: Koa.Context, target: string) => void);
    agent?: any;
    headers?: {[key: string]: string};
    rewrite?: (path: string) => string;
    events?: {
      error?: (error: any, req: IKoaProxiesExtendRequest, res: ServerResponse) => void;
      proxyReq?: (proxyReq: IKoaProxiesExtendProxyRequest, req: IKoaProxiesExtendRequest, res: ServerResponse) => void;
      proxyRes?: (proxyRes: IKoaProxiesExtendProxyResponse, req: IKoaProxiesExtendRequest, res: ServerResponse) => void;
    }
  }

  type IKoaProxiesOptionsFunc = (params: { [key: string]: string }, ctx: Koa.Context) => IBaseKoaProxiesOptions;

  type IKoaProxiesOptions = string | IBaseKoaProxiesOptions | IKoaProxiesOptionsFunc;
}

export = KoaProxies;
