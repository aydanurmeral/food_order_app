/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { inject, Injectable, InjectionToken, ɵformatRuntimeError as formatRuntimeError } from '@angular/core';
import { DOCUMENT } from '../../dom_tokens';
import { assertDevMode } from './asserts';
import { imgDirectiveDetails } from './error_helper';
import { extractHostname, getUrl } from './url';
import * as i0 from "@angular/core";
// Set of origins that are always excluded from the preconnect checks.
const INTERNAL_PRECONNECT_CHECK_BLOCKLIST = new Set(['localhost', '127.0.0.1', '0.0.0.0']);
/**
 * Injection token to configure which origins should be excluded
 * from the preconnect checks. It can either be a single string or an array of strings
 * to represent a group of origins, for example:
 *
 * ```typescript
 *  {provide: PRECONNECT_CHECK_BLOCKLIST, useValue: 'https://your-domain.com'}
 * ```
 *
 * or:
 *
 * ```typescript
 *  {provide: PRECONNECT_CHECK_BLOCKLIST,
 *   useValue: ['https://your-domain-1.com', 'https://your-domain-2.com']}
 * ```
 *
 * @publicApi
 */
export const PRECONNECT_CHECK_BLOCKLIST = new InjectionToken('PRECONNECT_CHECK_BLOCKLIST');
/**
 * Contains the logic to detect whether an image, marked with the "priority" attribute
 * has a corresponding `<link rel="preconnect">` tag in the `document.head`.
 *
 * Note: this is a dev-mode only class, which should not appear in prod bundles,
 * thus there is no `ngDevMode` use in the code.
 */
export class PreconnectLinkChecker {
    constructor() {
        this.document = inject(DOCUMENT);
        /**
         * Set of <link rel="preconnect"> tags found on this page.
         * The `null` value indicates that there was no DOM query operation performed.
         */
        this.preconnectLinks = null;
        /*
         * Keep track of all already seen origin URLs to avoid repeating the same check.
         */
        this.alreadySeen = new Set();
        this.window = null;
        this.blocklist = new Set(INTERNAL_PRECONNECT_CHECK_BLOCKLIST);
        assertDevMode('preconnect link checker');
        const win = this.document.defaultView;
        if (typeof win !== 'undefined') {
            this.window = win;
        }
        const blocklist = inject(PRECONNECT_CHECK_BLOCKLIST, { optional: true });
        if (blocklist) {
            this.populateBlocklist(blocklist);
        }
    }
    populateBlocklist(origins) {
        if (Array.isArray(origins)) {
            deepForEach(origins, origin => {
                this.blocklist.add(extractHostname(origin));
            });
        }
        else {
            this.blocklist.add(extractHostname(origins));
        }
    }
    /**
     * Checks that a preconnect resource hint exists in the head for the
     * given src.
     *
     * @param rewrittenSrc src formatted with loader
     * @param originalNgSrc ngSrc value
     */
    assertPreconnect(rewrittenSrc, originalNgSrc) {
        if (!this.window)
            return;
        const imgUrl = getUrl(rewrittenSrc, this.window);
        if (this.blocklist.has(imgUrl.hostname) || this.alreadySeen.has(imgUrl.origin))
            return;
        // Register this origin as seen, so we don't check it again later.
        this.alreadySeen.add(imgUrl.origin);
        if (!this.preconnectLinks) {
            // Note: we query for preconnect links only *once* and cache the results
            // for the entire lifespan of an application, since it's unlikely that the
            // list would change frequently. This allows to make sure there are no
            // performance implications of making extra DOM lookups for each image.
            this.preconnectLinks = this.queryPreconnectLinks();
        }
        if (!this.preconnectLinks.has(imgUrl.origin)) {
            console.warn(formatRuntimeError(2956 /* RuntimeErrorCode.PRIORITY_IMG_MISSING_PRECONNECT_TAG */, `${imgDirectiveDetails(originalNgSrc)} there is no preconnect tag present for this ` +
                `image. Preconnecting to the origin(s) that serve priority images ensures that these ` +
                `images are delivered as soon as possible. To fix this, please add the following ` +
                `element into the <head> of the document:\n` +
                `  <link rel="preconnect" href="${imgUrl.origin}">`));
        }
    }
    queryPreconnectLinks() {
        const preconnectUrls = new Set();
        const selector = 'link[rel=preconnect]';
        const links = Array.from(this.document.querySelectorAll(selector));
        for (let link of links) {
            const url = getUrl(link.href, this.window);
            preconnectUrls.add(url.origin);
        }
        return preconnectUrls;
    }
    ngOnDestroy() {
        this.preconnectLinks?.clear();
        this.alreadySeen.clear();
    }
}
PreconnectLinkChecker.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: PreconnectLinkChecker, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
PreconnectLinkChecker.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: PreconnectLinkChecker, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: PreconnectLinkChecker, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });
/**
 * Invokes a callback for each element in the array. Also invokes a callback
 * recursively for each nested array.
 */
function deepForEach(input, fn) {
    for (let value of input) {
        Array.isArray(value) ? deepForEach(value, fn) : fn(value);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlY29ubmVjdF9saW5rX2NoZWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vc3JjL2RpcmVjdGl2ZXMvbmdfb3B0aW1pemVkX2ltYWdlL3ByZWNvbm5lY3RfbGlua19jaGVja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxtQkFBbUIsSUFBSSxrQkFBa0IsRUFBZ0MsTUFBTSxlQUFlLENBQUM7QUFFM0ksT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRzFDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDeEMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFDLGVBQWUsRUFBRSxNQUFNLEVBQUMsTUFBTSxPQUFPLENBQUM7O0FBRTlDLHNFQUFzRTtBQUN0RSxNQUFNLG1DQUFtQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBRTNGOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sQ0FBQyxNQUFNLDBCQUEwQixHQUNuQyxJQUFJLGNBQWMsQ0FBeUIsNEJBQTRCLENBQUMsQ0FBQztBQUU3RTs7Ozs7O0dBTUc7QUFFSCxNQUFNLE9BQU8scUJBQXFCO0lBa0JoQztRQWpCUSxhQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXBDOzs7V0FHRztRQUNLLG9CQUFlLEdBQXFCLElBQUksQ0FBQztRQUVqRDs7V0FFRztRQUNLLGdCQUFXLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztRQUVoQyxXQUFNLEdBQWdCLElBQUksQ0FBQztRQUUzQixjQUFTLEdBQUcsSUFBSSxHQUFH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QUFLLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzNCLENBQUM7OzZIQXpGVSxxQkFBcUI7aUlBQXJCLHFCQUFxQixjQURULE1BQU07c0dBQ2xCLHFCQUFxQjtrQkFEakMsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7O0FBNkZoQzs7O0dBR0c7QUFDSCxTQUFTLFdBQVcsQ0FBSSxLQUFrQixFQUFFLEVBQXNCO0lBQ2hFLEtBQUssSUFBSSxLQUFLLElBQUksS0FBSyxFQUFFO1FBQ3ZCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMzRDtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtpbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCDJtWZvcm1hdFJ1bnRpbWVFcnJvciBhcyBmb3JtYXRSdW50aW1lRXJyb3IsIMm1UnVudGltZUVycm9yIGFzIFJ1bnRpbWVFcnJvcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJy4uLy4uL2RvbV90b2tlbnMnO1xuaW1wb3J0IHtSdW50aW1lRXJyb3JDb2RlfSBmcm9tICcuLi8uLi9lcnJvcnMnO1xuXG5pbXBvcnQge2Fzc2VydERldk1vZGV9IGZyb20gJy4vYXNzZXJ0cyc7XG5pbXBvcnQge2ltZ0RpcmVjdGl2ZURldGFpbHN9IGZyb20gJy4vZXJyb3JfaGVscGVyJztcbmltcG9ydCB7ZXh0cmFjdEhvc3RuYW1lLCBnZXRVcmx9IGZyb20gJy4vdXJsJztcblxuLy8gU2V0IG9mIG9yaWdpbnMgdGhhdCBhcmUgYWx3YXlzIGV4Y2x1ZGVkIGZyb20gdGhlIHByZWNvbm5lY3QgY2hlY2tzLlxuY29uc3QgSU5URVJOQUxfUFJFQ09OTkVDVF9DSEVDS19CTE9DS0xJU1QgPSBuZXcgU2V0KFsnbG9jYWxob3N0JywgJzEyNy4wLjAuMScsICcwLjAuMC4wJ10pO1xuXG4vKipcbiAqIEluamVjdGlvbiB0b2tlbiB0byBjb25maWd1cmUgd2hpY2ggb3JpZ2lucyBzaG91bGQgYmUgZXhjbHVkZWRcbiAqIGZyb20gdGhlIHByZWNvbm5lY3QgY2hlY2tzLiBJdCBjYW4gZWl0aGVyIGJlIGEgc2luZ2xlIHN0cmluZyBvciBhbiBhcnJheSBvZiBzdHJpbmdzXG4gKiB0byByZXByZXNlbnQgYSBncm91cCBvZiBvcmlnaW5zLCBmb3IgZXhhbXBsZTpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAge3Byb3ZpZGU6IFBSRUNPTk5FQ1RfQ0hFQ0tfQkxPQ0tMSVNULCB1c2VWYWx1ZTogJ2h0dHBzOi8veW91ci1kb21haW4uY29tJ31cbiAqIGBgYFxuICpcbiAqIG9yOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqICB7cHJvdmlkZTogUFJFQ09OTkVDVF9DSEVDS19CTE9DS0xJU1QsXG4gKiAgIHVzZVZhbHVlOiBbJ2h0dHBzOi8veW91ci1kb21haW4tMS5jb20nLCAnaHR0cHM6Ly95b3VyLWRvbWFpbi0yLmNvbSddfVxuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgUFJFQ09OTkVDVF9DSEVDS19CTE9DS0xJU1QgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjxBcnJheTxzdHJpbmd8c3RyaW5nW10+PignUFJFQ09OTkVDVF9DSEVDS19CTE9DS0xJU1QnKTtcblxuLyoqXG4gKiBDb250YWlucyB0aGUgbG9naWMgdG8gZGV0ZWN0IHdoZXRoZXIgYW4gaW1hZ2UsIG1hcmtlZCB3aXRoIHRoZSBcInByaW9yaXR5XCIgYXR0cmlidXRlXG4gKiBoYXMgYSBjb3JyZXNwb25kaW5nIGA8bGluayByZWw9XCJwcmVjb25uZWN0XCI+YCB0YWcgaW4gdGhlIGBkb2N1bWVudC5oZWFkYC5cbiAqXG4gKiBOb3RlOiB0aGlzIGlzIGEgZGV2LW1vZGUgb25seSBjbGFzcywgd2hpY2ggc2hvdWxkIG5vdCBhcHBlYXIgaW4gcHJvZCBidW5kbGVzLFxuICogdGh1cyB0aGVyZSBpcyBubyBgbmdEZXZNb2RlYCB1c2UgaW4gdGhlIGNvZGUuXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIFByZWNvbm5lY3RMaW5rQ2hlY2tlciB7XG4gIHByaXZhdGUgZG9jdW1lbnQgPSBpbmplY3QoRE9DVU1FTlQpO1xuXG4gIC8qKlxuICAgKiBTZXQgb2YgPGxpbmsgcmVsPVwicHJlY29ubmVjdFwiPiB0YWdzIGZvdW5kIG9uIHRoaXMgcGFnZS5cbiAgICogVGhlIGBudWxsYCB2YWx1ZSBpbmRpY2F0ZXMgdGhhdCB0aGVyZSB3YXMgbm8gRE9NIHF1ZXJ5IG9wZXJhdGlvbiBwZXJmb3JtZWQuXG4gICAqL1xuICBwcml2YXRlIHByZWNvbm5lY3RMaW5rczogU2V0PHN0cmluZz58bnVsbCA9IG51bGw7XG5cbiAgLypcbiAgICogS2VlcCB0cmFjayBvZiBhbGwgYWxyZWFkeSBzZWVuIG9yaWdpbiBVUkxzIHRvIGF2b2lkIHJlcGVhdGluZyB0aGUgc2FtZSBjaGVjay5cbiAgICovXG4gIHByaXZhdGUgYWxyZWFkeVNlZW4gPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICBwcml2YXRlIHdpbmRvdzogV2luZG93fG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgYmxvY2tsaXN0ID0gbmV3IFNldDxzdHJpbmc+KElOVEVSTkFMX1BSRUNPTk5FQ1RfQ0hFQ0tfQkxPQ0tMSVNUKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBhc3NlcnREZXZNb2RlKCdwcmVjb25uZWN0IGxpbmsgY2hlY2tlcicpO1xuICAgIGNvbnN0IHdpbiA9IHRoaXMuZG9jdW1lbnQuZGVmYXVsdFZpZXc7XG4gICAgaWYgKHR5cGVvZiB3aW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLndpbmRvdyA9IHdpbjtcbiAgICB9XG4gICAgY29uc3QgYmxvY2tsaXN0ID0gaW5qZWN0KFBSRUNPTk5FQ1RfQ0hFQ0tfQkxPQ0tMSVNULCB7b3B0aW9uYWw6IHRydWV9KTtcbiAgICBpZiAoYmxvY2tsaXN0KSB7XG4gICAgICB0aGlzLnBvcHVsYXRlQmxvY2tsaXN0KGJsb2NrbGlzdCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwb3B1bGF0ZUJsb2NrbGlzdChvcmlnaW5zOiBBcnJheTxzdHJpbmd8c3RyaW5nW10+fHN0cmluZykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9yaWdpbnMpKSB7XG4gICAgICBkZWVwRm9yRWFjaChvcmlnaW5zLCBvcmlnaW4gPT4ge1xuICAgICAgICB0aGlzLmJsb2NrbGlzdC5hZGQoZXh0cmFjdEhvc3RuYW1lKG9yaWdpbikpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYmxvY2tsaXN0LmFkZChleHRyYWN0SG9zdG5hbWUob3JpZ2lucykpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgdGhhdCBhIHByZWNvbm5lY3QgcmVzb3VyY2UgaGludCBleGlzdHMgaW4gdGhlIGhlYWQgZm9yIHRoZVxuICAgKiBnaXZlbiBzcmMuXG4gICAqXG4gICAqIEBwYXJhbSByZXdyaXR0ZW5TcmMgc3JjIGZvcm1hdHRlZCB3aXRoIGxvYWRlclxuICAgKiBAcGFyYW0gb3JpZ2luYWxOZ1NyYyBuZ1NyYyB2YWx1ZVxuICAgKi9cbiAgYXNzZXJ0UHJlY29ubmVjdChyZXdyaXR0ZW5TcmM6IHN0cmluZywgb3JpZ2luYWxOZ1NyYzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLndpbmRvdykgcmV0dXJuO1xuXG4gICAgY29uc3QgaW1nVXJsID0gZ2V0VXJsKHJld3JpdHRlblNyYywgdGhpcy53aW5kb3cpO1xuICAgIGlmICh0aGlzLmJsb2NrbGlzdC5oYXMoaW1nVXJsLmhvc3RuYW1lKSB8fCB0aGlzLmFscmVhZHlTZWVuLmhhcyhpbWdVcmwub3JpZ2luKSkgcmV0dXJuO1xuXG4gICAgLy8gUmVnaXN0ZXIgdGhpcyBvcmlnaW4gYXMgc2Vlbiwgc28gd2UgZG9uJ3QgY2hlY2sgaXQgYWdhaW4gbGF0ZXIuXG4gICAgdGhpcy5hbHJlYWR5U2Vlbi5hZGQoaW1nVXJsLm9yaWdpbik7XG5cbiAgICBpZiAoIXRoaXMucHJlY29ubmVjdExpbmtzKSB7XG4gICAgICAvLyBOb3RlOiB3ZSBxdWVyeSBmb3IgcHJlY29ubmVjdCBsaW5rcyBvbmx5ICpvbmNlKiBhbmQgY2FjaGUgdGhlIHJlc3VsdHNcbiAgICAgIC8vIGZvciB0aGUgZW50aXJlIGxpZmVzcGFuIG9mIGFuIGFwcGxpY2F0aW9uLCBzaW5jZSBpdCdzIHVubGlrZWx5IHRoYXQgdGhlXG4gICAgICAvLyBsaXN0IHdvdWxkIGNoYW5nZSBmcmVxdWVudGx5LiBUaGlzIGFsbG93cyB0byBtYWtlIHN1cmUgdGhlcmUgYXJlIG5vXG4gICAgICAvLyBwZXJmb3JtYW5jZSBpbXBsaWNhdGlvbnMgb2YgbWFraW5nIGV4dHJhIERPTSBsb29rdXBzIGZvciBlYWNoIGltYWdlLlxuICAgICAgdGhpcy5wcmVjb25uZWN0TGlua3MgPSB0aGlzLnF1ZXJ5UHJlY29ubmVjdExpbmtzKCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnByZWNvbm5lY3RMaW5rcy5oYXMoaW1nVXJsLm9yaWdpbikpIHtcbiAgICAgIGNvbnNvbGUud2Fybihmb3JtYXRSdW50aW1lRXJyb3IoXG4gICAgICAgICAgUnVudGltZUVycm9yQ29kZS5QUklPUklUWV9JTUdfTUlTU0lOR19QUkVDT05ORUNUX1RBRyxcbiAgICAgICAgICBgJHtpbWdEaXJlY3RpdmVEZXRhaWxzKG9yaWdpbmFsTmdTcmMpfSB0aGVyZSBpcyBubyBwcmVjb25uZWN0IHRhZyBwcmVzZW50IGZvciB0aGlzIGAgK1xuICAgICAgICAgICAgICBgaW1hZ2UuIFByZWNvbm5lY3RpbmcgdG8gdGhlIG9yaWdpbihzKSB0aGF0IHNlcnZlIHByaW9yaXR5IGltYWdlcyBlbnN1cmVzIHRoYXQgdGhlc2UgYCArXG4gICAgICAgICAgICAgIGBpbWFnZXMgYXJlIGRlbGl2ZXJlZCBhcyBzb29uIGFzIHBvc3NpYmxlLiBUbyBmaXggdGhpcywgcGxlYXNlIGFkZCB0aGUgZm9sbG93aW5nIGAgK1xuICAgICAgICAgICAgICBgZWxlbWVudCBpbnRvIHRoZSA8aGVhZD4gb2YgdGhlIGRvY3VtZW50OlxcbmAgK1xuICAgICAgICAgICAgICBgICA8bGluayByZWw9XCJwcmVjb25uZWN0XCIgaHJlZj1cIiR7aW1nVXJsLm9yaWdpbn1cIj5gKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBxdWVyeVByZWNvbm5lY3RMaW5rcygpOiBTZXQ8c3RyaW5nPiB7XG4gICAgY29uc3QgcHJlY29ubmVjdFVybHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICBjb25zdCBzZWxlY3RvciA9ICdsaW5rW3JlbD1wcmVjb25uZWN0XSc7XG4gICAgY29uc3QgbGlua3M6IEhUTUxMaW5rRWxlbWVudFtdID0gQXJyYXkuZnJvbSh0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICBmb3IgKGxldCBsaW5rIG9mIGxpbmtzKSB7XG4gICAgICBjb25zdCB1cmwgPSBnZXRVcmwobGluay5ocmVmLCB0aGlzLndpbmRvdyEpO1xuICAgICAgcHJlY29ubmVjdFVybHMuYWRkKHVybC5vcmlnaW4pO1xuICAgIH1cbiAgICByZXR1cm4gcHJlY29ubmVjdFVybHM7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnByZWNvbm5lY3RMaW5rcz8uY2xlYXIoKTtcbiAgICB0aGlzLmFscmVhZHlTZWVuLmNsZWFyKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBJbnZva2VzIGEgY2FsbGJhY2sgZm9yIGVhY2ggZWxlbWVudCBpbiB0aGUgYXJyYXkuIEFsc28gaW52b2tlcyBhIGNhbGxiYWNrXG4gKiByZWN1cnNpdmVseSBmb3IgZWFjaCBuZXN0ZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGRlZXBGb3JFYWNoPFQ+KGlucHV0OiAoVHxhbnlbXSlbXSwgZm46ICh2YWx1ZTogVCkgPT4gdm9pZCk6IHZvaWQge1xuICBmb3IgKGxldCB2YWx1ZSBvZiBpbnB1dCkge1xuICAgIEFycmF5LmlzQXJyYXkodmFsdWUpID8gZGVlcEZvckVhY2godmFsdWUsIGZuKSA6IGZuKHZhbHVlKTtcbiAgfVxufVxuIl19