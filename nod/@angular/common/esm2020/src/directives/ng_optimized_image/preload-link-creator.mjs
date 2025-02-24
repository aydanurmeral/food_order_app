/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { inject, Injectable, ɵRuntimeError as RuntimeError } from '@angular/core';
import { DOCUMENT } from '../../dom_tokens';
import { DEFAULT_PRELOADED_IMAGES_LIMIT, PRELOADED_IMAGES } from './tokens';
import * as i0 from "@angular/core";
/**
 * @description Contains the logic needed to track and add preload link tags to the `<head>` tag. It
 * will also track what images have already had preload link tags added so as to not duplicate link
 * tags.
 *
 * In dev mode this service will validate that the number of preloaded images does not exceed the
 * configured default preloaded images limit: {@link DEFAULT_PRELOADED_IMAGES_LIMIT}.
 */
export class PreloadLinkCreator {
    constructor() {
        this.preloadedImages = inject(PRELOADED_IMAGES);
        this.document = inject(DOCUMENT);
    }
    /**
     * @description Add a preload `<link>` to the `<head>` of the `index.html` that is served from the
     * server while using Angular Universal and SSR to kick off image loads for high priority images.
     *
     * The `sizes` (passed in from the user) and `srcset` (parsed and formatted from `ngSrcset`)
     * properties used to set the corresponding attributes, `imagesizes` and `imagesrcset`
     * respectively, on the preload `<link>` tag so that the correctly sized image is preloaded from
     * the CDN.
     *
     * {@link https://web.dev/preload-responsive-images/#imagesrcset-and-imagesizes}
     *
     * @param renderer The `Renderer2` passed in from the directive
     * @param src The original src of the image that is set on the `ngSrc` input.
     * @param srcset The parsed and formatted srcset created from the `ngSrcset` input
     * @param sizes The value of the `sizes` attribute passed in to the `<img>` tag
     */
    createPreloadLinkTag(renderer, src, srcset, sizes) {
        if (ngDevMode) {
            if (this.preloadedImages.size >= DEFAULT_PRELOADED_IMAGES_LIMIT) {
                throw new RuntimeError(2961 /* RuntimeErrorCode.TOO_MANY_PRELOADED_IMAGES */, ngDevMode &&
                    `The \`NgOptimizedImage\` directive has detected that more than ` +
                        `${DEFAULT_PRELOADED_IMAGES_LIMIT} images were marked as priority. ` +
                        `This might negatively affect an overall performance of the page. ` +
                        `To fix this, remove the "priority" attribute from images with less priority.`);
            }
        }
        if (this.preloadedImages.has(src)) {
            return;
        }
        this.preloadedImages.add(src);
        const preload = renderer.createElement('link');
        renderer.setAttribute(preload, 'as', 'image');
        renderer.setAttribute(preload, 'href', src);
        renderer.setAttribute(preload, 'rel', 'preload');
        renderer.setAttribute(preload, 'fetchpriority', 'high');
        if (sizes) {
            renderer.setAttribute(preload, 'imageSizes', sizes);
        }
        if (srcset) {
            renderer.setAttribute(preload, 'imageSrcset', srcset);
        }
        renderer.appendChild(this.document.head, preload);
    }
}
PreloadLinkCreator.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: PreloadLinkCreator, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
PreloadLinkCreator.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: PreloadLinkCreator, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: PreloadLinkCreator, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlbG9hZC1saW5rLWNyZWF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vc3JjL2RpcmVjdGl2ZXMvbmdfb3B0aW1pemVkX2ltYWdlL3ByZWxvYWQtbGluay1jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFhLGFBQWEsSUFBSSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFM0YsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRzFDLE9BQU8sRUFBQyw4QkFBOEIsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLFVBQVUsQ0FBQzs7QUFFMUU7Ozs7Ozs7R0FPRztBQUVILE1BQU0sT0FBTyxrQkFBa0I7SUFEL0I7UUFFbUIsb0JBQWUsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMzQyxhQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBcUQ5QztJQW5EQzs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxvQkFBb0IsQ0FBQyxRQUFtQixFQUFFLEdBQVcsRUFBRSxNQUFlLEVBQUUsS0FBYztRQUNwRixJQUFJLFNBQVMsRUFBRTtZQUNiLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLElBQUksOEJBQThCLEVBQUU7Z0JBQy9ELE1BQU0sSUFBSSxZQUFZLHdEQUVsQixTQUFTO29CQUNMLGlFQUFpRTt3QkFDN0QsR0FBRyw4QkFBOEIsbUNBQW1DO3dCQUNwRSxtRUFBbUU7d0JBQ25FLDhFQUE4RSxDQUFDLENBQUM7YUFDN0Y7U0FDRjtRQUVELElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDakMsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFOUIsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDOUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNqRCxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFeEQsSUFBSSxLQUFLLEVBQUU7WUFDVCxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDckQ7UUFFRCxJQUFJLE1BQU0sRUFBRTtZQUNWLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN2RDtRQUVELFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDcEQsQ0FBQzs7MEhBdERVLGtCQUFrQjs4SEFBbEIsa0JBQWtCLGNBRE4sTUFBTTtzR0FDbEIsa0JBQWtCO2tCQUQ5QixVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2luamVjdCwgSW5qZWN0YWJsZSwgUmVuZGVyZXIyLCDJtVJ1bnRpbWVFcnJvciBhcyBSdW50aW1lRXJyb3J9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICcuLi8uLi9kb21fdG9rZW5zJztcbmltcG9ydCB7UnVudGltZUVycm9yQ29kZX0gZnJvbSAnLi4vLi4vZXJyb3JzJztcblxuaW1wb3J0IHtERUZBVUxUX1BSRUxPQURFRF9JTUFHRVNfTElNSVQsIFBSRUxPQURFRF9JTUFHRVN9IGZyb20gJy4vdG9rZW5zJztcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gQ29udGFpbnMgdGhlIGxvZ2ljIG5lZWRlZCB0byB0cmFjayBhbmQgYWRkIHByZWxvYWQgbGluayB0YWdzIHRvIHRoZSBgPGhlYWQ+YCB0YWcuIEl0XG4gKiB3aWxsIGFsc28gdHJhY2sgd2hhdCBpbWFnZXMgaGF2ZSBhbHJlYWR5IGhhZCBwcmVsb2FkIGxpbmsgdGFncyBhZGRlZCBzbyBhcyB0byBub3QgZHVwbGljYXRlIGxpbmtcbiAqIHRhZ3MuXG4gKlxuICogSW4gZGV2IG1vZGUgdGhpcyBzZXJ2aWNlIHdpbGwgdmFsaWRhdGUgdGhhdCB0aGUgbnVtYmVyIG9mIHByZWxvYWRlZCBpbWFnZXMgZG9lcyBub3QgZXhjZWVkIHRoZVxuICogY29uZmlndXJlZCBkZWZhdWx0IHByZWxvYWRlZCBpbWFnZXMgbGltaXQ6IHtAbGluayBERUZBVUxUX1BSRUxPQURFRF9JTUFHRVNfTElNSVR9LlxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBQcmVsb2FkTGlua0NyZWF0b3Ige1xuICBwcml2YXRlIHJlYWRvbmx5IHByZWxvYWRlZEltYWdlcyA9IGluamVjdChQUkVMT0FERURfSU1BR0VTKTtcbiAgcHJpdmF0ZSByZWFkb25seSBkb2N1bWVudCA9IGluamVjdChET0NVTUVOVCk7XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBBZGQgYSBwcmVsb2FkIGA8bGluaz5gIHRvIHRoZSBgPGhlYWQ+YCBvZiB0aGUgYGluZGV4Lmh0bWxgIHRoYXQgaXMgc2VydmVkIGZyb20gdGhlXG4gICAqIHNlcnZlciB3aGlsZSB1c2luZyBBbmd1bGFyIFVuaXZlcnNhbCBhbmQgU1NSIHRvIGtpY2sgb2ZmIGltYWdlIGxvYWRzIGZvciBoaWdoIHByaW9yaXR5IGltYWdlcy5cbiAgICpcbiAgICogVGhlIGBzaXplc2AgKHBhc3NlZCBpbiBmcm9tIHRoZSB1c2VyKSBhbmQgYHNyY3NldGAgKHBhcnNlZCBhbmQgZm9ybWF0dGVkIGZyb20gYG5nU3Jjc2V0YClcbiAgICogcHJvcGVydGllcyB1c2VkIHRvIHNldCB0aGUgY29ycmVzcG9uZGluZyBhdHRyaWJ1dGVzLCBgaW1hZ2VzaXplc2AgYW5kIGBpbWFnZXNyY3NldGBcbiAgICogcmVzcGVjdGl2ZWx5LCBvbiB0aGUgcHJlbG9hZCBgPGxpbms+YCB0YWcgc28gdGhhdCB0aGUgY29ycmVjdGx5IHNpemVkIGltYWdlIGlzIHByZWxvYWRlZCBmcm9tXG4gICAqIHRoZSBDRE4uXG4gICAqXG4gICAqIHtAbGluayBodHRwczovL3dlYi5kZXYvcHJlbG9hZC1yZXNwb25zaXZlLWltYWdlcy8jaW1hZ2VzcmNzZXQtYW5kLWltYWdlc2l6ZXN9XG4gICAqXG4gICAqIEBwYXJhbSByZW5kZXJlciBUaGUgYFJlbmRlcmVyMmAgcGFzc2VkIGluIGZyb20gdGhlIGRpcmVjdGl2ZVxuICAgKiBAcGFyYW0gc3JjIFRoZSBvcmlnaW5hbCBzcmMgb2YgdGhlIGltYWdlIHRoYXQgaXMgc2V0IG9uIHRoZSBgbmdTcmNgIGlucHV0LlxuICAgKiBAcGFyYW0gc3Jjc2V0IFRoZSBwYXJzZWQgYW5kIGZvcm1hdHRlZCBzcmNzZXQgY3JlYXRlZCBmcm9tIHRoZSBgbmdTcmNzZXRgIGlucHV0XG4gICAqIEBwYXJhbSBzaXplcyBUaGUgdmFsdWUgb2YgdGhlIGBzaXplc2AgYXR0cmlidXRlIHBhc3NlZCBpbiB0byB0aGUgYDxpbWc+YCB0YWdcbiAgICovXG4gIGNyZWF0ZVByZWxvYWRMaW5rVGFnKHJlbmRlcmVyOiBSZW5kZXJlcjIsIHNyYzogc3RyaW5nLCBzcmNzZXQ/OiBzdHJpbmcsIHNpemVzPzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKG5nRGV2TW9kZSkge1xuICAgICAgaWYgKHRoaXMucHJlbG9hZGVkSW1hZ2VzLnNpemUgPj0gREVGQVVMVF9QUkVMT0FERURfSU1BR0VTX0xJTUlUKSB7XG4gICAgICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoXG4gICAgICAgICAgICBSdW50aW1lRXJyb3JDb2RlLlRPT19NQU5ZX1BSRUxPQURFRF9JTUFHRVMsXG4gICAgICAgICAgICBuZ0Rldk1vZGUgJiZcbiAgICAgICAgICAgICAgICBgVGhlIFxcYE5nT3B0aW1pemVkSW1hZ2VcXGAgZGlyZWN0aXZlIGhhcyBkZXRlY3RlZCB0aGF0IG1vcmUgdGhhbiBgICtcbiAgICAgICAgICAgICAgICAgICAgYCR7REVGQVVMVF9QUkVMT0FERURfSU1BR0VTX0xJTUlUfSBpbWFnZXMgd2VyZSBtYXJrZWQgYXMgcHJpb3JpdHkuIGAgK1xuICAgICAgICAgICAgICAgICAgICBgVGhpcyBtaWdodCBuZWdhdGl2ZWx5IGFmZmVjdCBhbiBvdmVyYWxsIHBlcmZvcm1hbmNlIG9mIHRoZSBwYWdlLiBgICtcbiAgICAgICAgICAgICAgICAgICAgYFRvIGZpeCB0aGlzLCByZW1vdmUgdGhlIFwicHJpb3JpdHlcIiBhdHRyaWJ1dGUgZnJvbSBpbWFnZXMgd2l0aCBsZXNzIHByaW9yaXR5LmApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnByZWxvYWRlZEltYWdlcy5oYXMoc3JjKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucHJlbG9hZGVkSW1hZ2VzLmFkZChzcmMpO1xuXG4gICAgY29uc3QgcHJlbG9hZCA9IHJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICByZW5kZXJlci5zZXRBdHRyaWJ1dGUocHJlbG9hZCwgJ2FzJywgJ2ltYWdlJyk7XG4gICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKHByZWxvYWQsICdocmVmJywgc3JjKTtcbiAgICByZW5kZXJlci5zZXRBdHRyaWJ1dGUocHJlbG9hZCwgJ3JlbCcsICdwcmVsb2FkJyk7XG4gICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKHByZWxvYWQsICdmZXRjaHByaW9yaXR5JywgJ2hpZ2gnKTtcblxuICAgIGlmIChzaXplcykge1xuICAgICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKHByZWxvYWQsICdpbWFnZVNpemVzJywgc2l6ZXMpO1xuICAgIH1cblxuICAgIGlmIChzcmNzZXQpIHtcbiAgICAgIHJlbmRlcmVyLnNldEF0dHJpYnV0ZShwcmVsb2FkLCAnaW1hZ2VTcmNzZXQnLCBzcmNzZXQpO1xuICAgIH1cblxuICAgIHJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuaGVhZCwgcHJlbG9hZCk7XG4gIH1cbn1cbiJdfQ==