/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, ɵparseCookieValue as parseCookieValue } from '@angular/common';
import { EnvironmentInjector, Inject, inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import * as i0 from "@angular/core";
export const XSRF_ENABLED = new InjectionToken('XSRF_ENABLED');
export const XSRF_DEFAULT_COOKIE_NAME = 'XSRF-TOKEN';
export const XSRF_COOKIE_NAME = new InjectionToken('XSRF_COOKIE_NAME', {
    providedIn: 'root',
    factory: () => XSRF_DEFAULT_COOKIE_NAME,
});
export const XSRF_DEFAULT_HEADER_NAME = 'X-XSRF-TOKEN';
export const XSRF_HEADER_NAME = new InjectionToken('XSRF_HEADER_NAME', {
    providedIn: 'root',
    factory: () => XSRF_DEFAULT_HEADER_NAME,
});
/**
 * Retrieves the current XSRF token to use with the next outgoing request.
 *
 * @publicApi
 */
export class HttpXsrfTokenExtractor {
}
/**
 * `HttpXsrfTokenExtractor` which retrieves the token from a cookie.
 */
export class HttpXsrfCookieExtractor {
    constructor(doc, platform, cookieName) {
        this.doc = doc;
        this.platform = platform;
        this.cookieName = cookieName;
        this.lastCookieString = '';
        this.lastToken = null;
        /**
         * @internal for testing
         */
        this.parseCount = 0;
    }
    getToken() {
        if (this.platform === 'server') {
            return null;
        }
        const cookieString = this.doc.cookie || '';
        if (cookieString !== this.lastCookieString) {
            this.parseCount++;
            this.lastToken = parseCookieValue(cookieString, this.cookieName);
            this.lastCookieString = cookieString;
        }
        return this.lastToken;
    }
}
HttpXsrfCookieExtractor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: HttpXsrfCookieExtractor, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: XSRF_COOKIE_NAME }], target: i0.ɵɵFactoryTarget.Injectable });
HttpXsrfCookieExtractor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: HttpXsrfCookieExtractor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: HttpXsrfCookieExtractor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [XSRF_COOKIE_NAME]
                }] }]; } });
export function xsrfInterceptorFn(req, next) {
    const lcUrl = req.url.toLowerCase();
    // Skip both non-mutating requests and absolute URLs.
    // Non-mutating requests don't require a token, and absolute URLs require special handling
    // anyway as the cookie set
    // on our origin is not the same as the token expected by another origin.
    if (!inject(XSRF_ENABLED) || req.method === 'GET' || req.method === 'HEAD' ||
        lcUrl.startsWith('http://') || lcUrl.startsWith('https://')) {
        return next(req);
    }
    const token = inject(HttpXsrfTokenExtractor).getToken();
    const headerName = inject(XSRF_HEADER_NAME);
    // Be careful not to overwrite an existing header of the same name.
    if (token != null && !req.headers.has(headerName)) {
        req = req.clone({ headers: req.headers.set(headerName, token) });
    }
    return next(req);
}
/**
 * `HttpInterceptor` which adds an XSRF token to eligible outgoing requests.
 */
export class HttpXsrfInterceptor {
    constructor(injector) {
        this.injector = injector;
    }
    intercept(initialRequest, next) {
        return this.injector.runInContext(() => xsrfInterceptorFn(initialRequest, downstreamRequest => next.handle(downstreamRequest)));
    }
}
HttpXsrfInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: HttpXsrfInterceptor, deps: [{ token: i0.EnvironmentInjector }], target: i0.ɵɵFactoryTarget.Injectable });
HttpXsrfInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: HttpXsrfInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: HttpXsrfInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.EnvironmentInjector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHNyZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9odHRwL3NyYy94c3JmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUUsaUJBQWlCLElBQUksZ0JBQWdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRixPQUFPLEVBQUMsbUJBQW1CLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFRM0csTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLElBQUksY0FBYyxDQUFVLGNBQWMsQ0FBQyxDQUFDO0FBRXhFLE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFHLFlBQVksQ0FBQztBQUNyRCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLGNBQWMsQ0FBUyxrQkFBa0IsRUFBRTtJQUM3RSxVQUFVLEVBQUUsTUFBTTtJQUNsQixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsd0JBQXdCO0NBQ3hDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFHLGNBQWMsQ0FBQztBQUN2RCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLGNBQWMsQ0FBUyxrQkFBa0IsRUFBRTtJQUM3RSxVQUFVLEVBQUUsTUFBTTtJQUNsQixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsd0JBQXdCO0NBQ3hDLENBQUMsQ0FBQztBQUVIOzs7O0dBSUc7QUFDSCxNQUFNLE9BQWdCLHNCQUFzQjtDQU8zQztBQUVEOztHQUVHO0FBRUgsTUFBTSxPQUFPLHVCQUF1QjtJQVNsQyxZQUM4QixHQUFRLEVBQStCLFFBQWdCLEVBQy9DLFVBQWtCO1FBRDFCLFFBQUcsR0FBSCxHQUFHLENBQUs7UUFBK0IsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUMv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UmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVCwgybVwYXJzZUNvb2tpZVZhbHVlIGFzIHBhcnNlQ29va2llVmFsdWV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Vudmlyb25tZW50SW5qZWN0b3IsIEluamVjdCwgaW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgUExBVEZPUk1fSUR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtIdHRwSGFuZGxlcn0gZnJvbSAnLi9iYWNrZW5kJztcbmltcG9ydCB7SHR0cEhhbmRsZXJGbiwgSHR0cEludGVyY2VwdG9yfSBmcm9tICcuL2ludGVyY2VwdG9yJztcbmltcG9ydCB7SHR0cFJlcXVlc3R9IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQge0h0dHBFdmVudH0gZnJvbSAnLi9yZXNwb25zZSc7XG5cbmV4cG9ydCBjb25zdCBYU1JGX0VOQUJMRUQgPSBuZXcgSW5qZWN0aW9uVG9rZW48Ym9vbGVhbj4oJ1hTUkZfRU5BQkxFRCcpO1xuXG5leHBvcnQgY29uc3QgWFNSRl9ERUZBVUxUX0NPT0tJRV9OQU1FID0gJ1hTUkYtVE9LRU4nO1xuZXhwb3J0IGNvbnN0IFhTUkZfQ09PS0lFX05BTUUgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignWFNSRl9DT09LSUVfTkFNRScsIHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICBmYWN0b3J5OiAoKSA9PiBYU1JGX0RFRkFVTFRfQ09PS0lFX05BTUUsXG59KTtcblxuZXhwb3J0IGNvbnN0IFhTUkZfREVGQVVMVF9IRUFERVJfTkFNRSA9ICdYLVhTUkYtVE9LRU4nO1xuZXhwb3J0IGNvbnN0IFhTUkZfSEVBREVSX05BTUUgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignWFNSRl9IRUFERVJfTkFNRScsIHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICBmYWN0b3J5OiAoKSA9PiBYU1JGX0RFRkFVTFRfSEVBREVSX05BTUUsXG59KTtcblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIGN1cnJlbnQgWFNSRiB0b2tlbiB0byB1c2Ugd2l0aCB0aGUgbmV4dCBvdXRnb2luZyByZXF1ZXN0LlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEh0dHBYc3JmVG9rZW5FeHRyYWN0b3Ige1xuICAvKipcbiAgICogR2V0IHRoZSBYU1JGIHRva2VuIHRvIHVzZSB3aXRoIGFuIG91dGdvaW5nIHJlcXVlc3QuXG4gICAqXG4gICAqIFdpbGwgYmUgY2FsbGVkIGZvciBldmVyeSByZXF1ZXN0LCBzbyB0aGUgdG9rZW4gbWF5IGNoYW5nZSBiZXR3ZWVuIHJlcXVlc3RzLlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0VG9rZW4oKTogc3RyaW5nfG51bGw7XG59XG5cbi8qKlxuICogYEh0dHBYc3JmVG9rZW5FeHRyYWN0b3JgIHdoaWNoIHJldHJpZXZlcyB0aGUgdG9rZW4gZnJvbSBhIGNvb2tpZS5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEh0dHBYc3JmQ29va2llRXh0cmFjdG9yIGltcGxlbWVudHMgSHR0cFhzcmZUb2tlbkV4dHJhY3RvciB7XG4gIHByaXZhdGUgbGFzdENvb2tpZVN0cmluZzogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgbGFzdFRva2VuOiBzdHJpbmd8bnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbCBmb3IgdGVzdGluZ1xuICAgKi9cbiAgcGFyc2VDb3VudDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jOiBhbnksIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm06IHN0cmluZyxcbiAgICAgIEBJbmplY3QoWFNSRl9DT09LSUVfTkFNRSkgcHJpdmF0ZSBjb29raWVOYW1lOiBzdHJpbmcpIHt9XG5cbiAgZ2V0VG9rZW4oKTogc3RyaW5nfG51bGwge1xuICAgIGlmICh0aGlzLnBsYXRmb3JtID09PSAnc2VydmVyJykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGNvb2tpZVN0cmluZyA9IHRoaXMuZG9jLmNvb2tpZSB8fCAnJztcbiAgICBpZiAoY29va2llU3RyaW5nICE9PSB0aGlzLmxhc3RDb29raWVTdHJpbmcpIHtcbiAgICAgIHRoaXMucGFyc2VDb3VudCsrO1xuICAgICAgdGhpcy5sYXN0VG9rZW4gPSBwYXJzZUNvb2tpZVZhbHVlKGNvb2tpZVN0cmluZywgdGhpcy5jb29raWVOYW1lKTtcbiAgICAgIHRoaXMubGFzdENvb2tpZVN0cmluZyA9IGNvb2tpZVN0cmluZztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubGFzdFRva2VuO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB4c3JmSW50ZXJjZXB0b3JGbihcbiAgICByZXE6IEh0dHBSZXF1ZXN0PHVua25vd24+LCBuZXh0OiBIdHRwSGFuZGxlckZuKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8dW5rbm93bj4+IHtcbiAgY29uc3QgbGNVcmwgPSByZXEudXJsLnRvTG93ZXJDYXNlKCk7XG4gIC8vIFNraXAgYm90aCBub24tbXV0YXRpbmcgcmVxdWVzdHMgYW5kIGFic29sdXRlIFVSTHMuXG4gIC8vIE5vbi1tdXRhdGluZyByZXF1ZXN0cyBkb24ndCByZXF1aXJlIGEgdG9rZW4sIGFuZCBhYnNvbHV0ZSBVUkxzIHJlcXVpcmUgc3BlY2lhbCBoYW5kbGluZ1xuICAvLyBhbnl3YXkgYXMgdGhlIGNvb2tpZSBzZXRcbiAgLy8gb24gb3VyIG9yaWdpbiBpcyBub3QgdGhlIHNhbWUgYXMgdGhlIHRva2VuIGV4cGVjdGVkIGJ5IGFub3RoZXIgb3JpZ2luLlxuICBpZiAoIWluamVjdChYU1JGX0VOQUJMRUQpIHx8IHJlcS5tZXRob2QgPT09ICdHRVQnIHx8IHJlcS5tZXRob2QgPT09ICdIRUFEJyB8fFxuICAgICAgbGNVcmwuc3RhcnRzV2l0aCgnaHR0cDovLycpIHx8IGxjVXJsLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vJykpIHtcbiAgICByZXR1cm4gbmV4dChyZXEpO1xuICB9XG5cbiAgY29uc3QgdG9rZW4gPSBpbmplY3QoSHR0cFhzcmZUb2tlbkV4dHJhY3RvcikuZ2V0VG9rZW4oKTtcbiAgY29uc3QgaGVhZGVyTmFtZSA9IGluamVjdChYU1JGX0hFQURFUl9OQU1FKTtcblxuICAvLyBCZSBjYXJlZnVsIG5vdCB0byBvdmVyd3JpdGUgYW4gZXhpc3RpbmcgaGVhZGVyIG9mIHRoZSBzYW1lIG5hbWUuXG4gIGlmICh0b2tlbiAhPSBudWxsICYmICFyZXEuaGVhZGVycy5oYXMoaGVhZGVyTmFtZSkpIHtcbiAgICByZXEgPSByZXEuY2xvbmUoe2hlYWRlcnM6IHJlcS5oZWFkZXJzLnNldChoZWFkZXJOYW1lLCB0b2tlbil9KTtcbiAgfVxuICByZXR1cm4gbmV4dChyZXEpO1xufVxuXG4vKipcbiAqIGBIdHRwSW50ZXJjZXB0b3JgIHdoaWNoIGFkZHMgYW4gWFNSRiB0b2tlbiB0byBlbGlnaWJsZSBvdXRnb2luZyByZXF1ZXN0cy5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEh0dHBYc3JmSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBFbnZpcm9ubWVudEluamVjdG9yKSB7fVxuXG4gIGludGVyY2VwdChpbml0aWFsUmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgcmV0dXJuIHRoaXMuaW5qZWN0b3IucnVuSW5Db250ZXh0KFxuICAgICAgICAoKSA9PlxuICAgICAgICAgICAgeHNyZkludGVyY2VwdG9yRm4oaW5pdGlhbFJlcXVlc3QsIGRvd25zdHJlYW1SZXF1ZXN0ID0+IG5leHQuaGFuZGxlKGRvd25zdHJlYW1SZXF1ZXN0KSkpO1xuICB9XG59XG4iXX0=