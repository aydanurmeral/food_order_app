/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, Input, KeyValueDiffers, Renderer2, RendererStyleFlags2 } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @ngModule CommonModule
 *
 * @usageNotes
 *
 * Set the font of the containing element to the result of an expression.
 *
 * ```
 * <some-element [ngStyle]="{'font-style': styleExp}">...</some-element>
 * ```
 *
 * Set the width of the containing element to a pixel value returned by an expression.
 *
 * ```
 * <some-element [ngStyle]="{'max-width.px': widthExp}">...</some-element>
 * ```
 *
 * Set a collection of style values using an expression that returns key-value pairs.
 *
 * ```
 * <some-element [ngStyle]="objExp">...</some-element>
 * ```
 *
 * @description
 *
 * An attribute directive that updates styles for the containing HTML element.
 * Sets one or more style properties, specified as colon-separated key-value pairs.
 * The key is a style name, with an optional `.<unit>` suffix
 * (such as 'top.px', 'font-style.em').
 * The value is an expression to be evaluated.
 * The resulting non-null value, expressed in the given unit,
 * is assigned to the given style property.
 * If the result of evaluation is null, the corresponding style is removed.
 *
 * @publicApi
 */
export class NgStyle {
    constructor(_ngEl, _differs, _renderer) {
        this._ngEl = _ngEl;
        this._differs = _differs;
        this._renderer = _renderer;
        this._ngStyle = null;
        this._differ = null;
    }
    set ngStyle(values) {
        this._ngStyle = values;
        if (!this._differ && values) {
            this._differ = this._differs.find(values).create();
        }
    }
    ngDoCheck() {
        if (this._differ) {
            const changes = this._differ.diff(this._ngStyle);
            if (changes) {
                this._applyChanges(changes);
            }
        }
    }
    _setStyle(nameAndUnit, value) {
        const [name, unit] = nameAndUnit.split('.');
        const flags = name.indexOf('-') === -1 ? undefined : RendererStyleFlags2.DashCase;
        if (value != null) {
            this._renderer.setStyle(this._ngEl.nativeElement, name, unit ? `${value}${unit}` : value, flags);
        }
        else {
            this._renderer.removeStyle(this._ngEl.nativeElement, name, flags);
        }
    }
    _applyChanges(changes) {
        changes.forEachRemovedItem((record) => this._setStyle(record.key, null));
        changes.forEachAddedItem((record) => this._setStyle(record.key, record.currentValue));
        changes.forEachChangedItem((record) => this._setStyle(record.key, record.currentValue));
    }
}
NgStyle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: NgStyle, deps: [{ token: i0.ElementRef }, { token: i0.KeyValueDiffers }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
NgStyle.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.1.5", type: NgStyle, isStandalone: true, selector: "[ngStyle]", inputs: { ngStyle: "ngStyle" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: NgStyle, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngStyle]',
                    standalone: true,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.KeyValueDiffers }, { type: i0.Renderer2 }]; }, propDecorators: { ngStyle: [{
                type: Input,
                args: ['ngStyle']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfc3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vc3JjL2RpcmVjdGl2ZXMvbmdfc3R5bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFDLFNBQVMsRUFBVyxVQUFVLEVBQUUsS0FBSyxFQUFtQyxlQUFlLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUd0Sjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ0c7QUFLSCxNQUFNLE9BQU8sT0FBTztJQUlsQixZQUNZLEtBQWlCLEVBQVUsUUFBeUIsRUFBVSxTQUFvQjtRQUFsRixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBSnRGLGFBQVEsR0FBMkMsSUFBSSxDQUFDO1FBQ3hELFlBQU8sR0FBK0MsSUFBSSxDQUFDO0lBRzhCLENBQUM7SUFFbEcsSUFDSSxPQUFPLENBQUMsTUFBNkM7UUFDdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksTUFBTSxFQUFFO1lBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDcEQ7SUFDSCxDQUFDO0lBRUQsU0FBUztRQUNQLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUyxDQUFDLENBQUM7WUFDbEQsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM3QjtTQUNGO0lBQ0gsQ0FBQztJQUVPLFNBQVMsQ0FBQyxXQUFtQixFQUFFLEtBQW1DO1FBQ3hFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLFFBQWtCLENBQUM7UUFFNUYsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzlFO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDbkU7SUFDSCxDQUFDO0lBRU8sYUFBYSxDQUFDLE9BQStDO1FBQ25FLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDekUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDdEYsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDMUYsQ0FBQzs7K0dBeENVLE9BQU87bUdBQVAsT0FBTztzR0FBUCxPQUFPO2tCQUpuQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixVQUFVLEVBQUUsSUFBSTtpQkFDakI7dUpBU0ssT0FBTztzQkFEVixLQUFLO3VCQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7RGlyZWN0aXZlLCBEb0NoZWNrLCBFbGVtZW50UmVmLCBJbnB1dCwgS2V5VmFsdWVDaGFuZ2VzLCBLZXlWYWx1ZURpZmZlciwgS2V5VmFsdWVEaWZmZXJzLCBSZW5kZXJlcjIsIFJlbmRlcmVyU3R5bGVGbGFnczJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbi8qKlxuICogQG5nTW9kdWxlIENvbW1vbk1vZHVsZVxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogU2V0IHRoZSBmb250IG9mIHRoZSBjb250YWluaW5nIGVsZW1lbnQgdG8gdGhlIHJlc3VsdCBvZiBhbiBleHByZXNzaW9uLlxuICpcbiAqIGBgYFxuICogPHNvbWUtZWxlbWVudCBbbmdTdHlsZV09XCJ7J2ZvbnQtc3R5bGUnOiBzdHlsZUV4cH1cIj4uLi48L3NvbWUtZWxlbWVudD5cbiAqIGBgYFxuICpcbiAqIFNldCB0aGUgd2lkdGggb2YgdGhlIGNvbnRhaW5pbmcgZWxlbWVudCB0byBhIHBpeGVsIHZhbHVlIHJldHVybmVkIGJ5IGFuIGV4cHJlc3Npb24uXG4gKlxuICogYGBgXG4gKiA8c29tZS1lbGVtZW50IFtuZ1N0eWxlXT1cInsnbWF4LXdpZHRoLnB4Jzogd2lkdGhFeHB9XCI+Li4uPC9zb21lLWVsZW1lbnQ+XG4gKiBgYGBcbiAqXG4gKiBTZXQgYSBjb2xsZWN0aW9uIG9mIHN0eWxlIHZhbHVlcyB1c2luZyBhbiBleHByZXNzaW9uIHRoYXQgcmV0dXJucyBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogYGBgXG4gKiA8c29tZS1lbGVtZW50IFtuZ1N0eWxlXT1cIm9iakV4cFwiPi4uLjwvc29tZS1lbGVtZW50PlxuICogYGBgXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogQW4gYXR0cmlidXRlIGRpcmVjdGl2ZSB0aGF0IHVwZGF0ZXMgc3R5bGVzIGZvciB0aGUgY29udGFpbmluZyBIVE1MIGVsZW1lbnQuXG4gKiBTZXRzIG9uZSBvciBtb3JlIHN0eWxlIHByb3BlcnRpZXMsIHNwZWNpZmllZCBhcyBjb2xvbi1zZXBhcmF0ZWQga2V5LXZhbHVlIHBhaXJzLlxuICogVGhlIGtleSBpcyBhIHN0eWxlIG5hbWUsIHdpdGggYW4gb3B0aW9uYWwgYC48dW5pdD5gIHN1ZmZpeFxuICogKHN1Y2ggYXMgJ3RvcC5weCcsICdmb250LXN0eWxlLmVtJykuXG4gKiBUaGUgdmFsdWUgaXMgYW4gZXhwcmVzc2lvbiB0byBiZSBldmFsdWF0ZWQuXG4gKiBUaGUgcmVzdWx0aW5nIG5vbi1udWxsIHZhbHVlLCBleHByZXNzZWQgaW4gdGhlIGdpdmVuIHVuaXQsXG4gKiBpcyBhc3NpZ25lZCB0byB0aGUgZ2l2ZW4gc3R5bGUgcHJvcGVydHkuXG4gKiBJZiB0aGUgcmVzdWx0IG9mIGV2YWx1YXRpb24gaXMgbnVsbCwgdGhlIGNvcnJlc3BvbmRpbmcgc3R5bGUgaXMgcmVtb3ZlZC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ1N0eWxlXScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIE5nU3R5bGUgaW1wbGVtZW50cyBEb0NoZWNrIHtcbiAgcHJpdmF0ZSBfbmdTdHlsZToge1trZXk6IHN0cmluZ106IHN0cmluZ318bnVsbHx1bmRlZmluZWQgPSBudWxsO1xuICBwcml2YXRlIF9kaWZmZXI6IEtleVZhbHVlRGlmZmVyPHN0cmluZywgc3RyaW5nfG51bWJlcj58bnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9uZ0VsOiBFbGVtZW50UmVmLCBwcml2YXRlIF9kaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgQElucHV0KCduZ1N0eWxlJylcbiAgc2V0IG5nU3R5bGUodmFsdWVzOiB7W2tsYXNzOiBzdHJpbmddOiBhbnl9fG51bGx8dW5kZWZpbmVkKSB7XG4gICAgdGhpcy5fbmdTdHlsZSA9IHZhbHVlcztcbiAgICBpZiAoIXRoaXMuX2RpZmZlciAmJiB2YWx1ZXMpIHtcbiAgICAgIHRoaXMuX2RpZmZlciA9IHRoaXMuX2RpZmZlcnMuZmluZCh2YWx1ZXMpLmNyZWF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICBpZiAodGhpcy5fZGlmZmVyKSB7XG4gICAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5fZGlmZmVyLmRpZmYodGhpcy5fbmdTdHlsZSEpO1xuICAgICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5fYXBwbHlDaGFuZ2VzKGNoYW5nZXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NldFN0eWxlKG5hbWVBbmRVbml0OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmd8bnVtYmVyfG51bGx8dW5kZWZpbmVkKTogdm9pZCB7XG4gICAgY29uc3QgW25hbWUsIHVuaXRdID0gbmFtZUFuZFVuaXQuc3BsaXQoJy4nKTtcbiAgICBjb25zdCBmbGFncyA9IG5hbWUuaW5kZXhPZignLScpID09PSAtMSA/IHVuZGVmaW5lZCA6IFJlbmRlcmVyU3R5bGVGbGFnczIuRGFzaENhc2UgYXMgbnVtYmVyO1xuXG4gICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgIHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgbmFtZSwgdW5pdCA/IGAke3ZhbHVlfSR7dW5pdH1gIDogdmFsdWUsIGZsYWdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCBuYW1lLCBmbGFncyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYXBwbHlDaGFuZ2VzKGNoYW5nZXM6IEtleVZhbHVlQ2hhbmdlczxzdHJpbmcsIHN0cmluZ3xudW1iZXI+KTogdm9pZCB7XG4gICAgY2hhbmdlcy5mb3JFYWNoUmVtb3ZlZEl0ZW0oKHJlY29yZCkgPT4gdGhpcy5fc2V0U3R5bGUocmVjb3JkLmtleSwgbnVsbCkpO1xuICAgIGNoYW5nZXMuZm9yRWFjaEFkZGVkSXRlbSgocmVjb3JkKSA9PiB0aGlzLl9zZXRTdHlsZShyZWNvcmQua2V5LCByZWNvcmQuY3VycmVudFZhbHVlKSk7XG4gICAgY2hhbmdlcy5mb3JFYWNoQ2hhbmdlZEl0ZW0oKHJlY29yZCkgPT4gdGhpcy5fc2V0U3R5bGUocmVjb3JkLmtleSwgcmVjb3JkLmN1cnJlbnRWYWx1ZSkpO1xuICB9XG59XG4iXX0=