import { __decorate } from 'tslib';
import { Component, EventEmitter, ViewChild, Output, Input, ViewEncapsulation, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

import * as ɵngcc0 from '@angular/core';

const _c0 = ["starMain"];
let RatingComponent = class RatingComponent {
    constructor() { }
    ngOnInit() {
    }
};
RatingComponent.ɵfac = function RatingComponent_Factory(t) { return new (t || RatingComponent)(); };
RatingComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: RatingComponent, selectors: [["lib-rating"]], decls: 2, vars: 0, template: function RatingComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "p");
        ɵngcc0.ɵɵtext(1, " rating works! ");
        ɵngcc0.ɵɵelementEnd();
    } }, encapsulation: 2 });

var StarRatingComponent_1;
let StarRatingComponent = StarRatingComponent_1 = class StarRatingComponent {
    constructor() {
        this.stars = [];
        this._readOnly = false;
        this._totalStars = 5;
        this.rate = new EventEmitter();
        this.onStarsCountChange = new Subject();
        this.onStarsCountChange.subscribe(() => {
            this.setStars();
            this.generateRating(true);
            this.applySizeAllStars();
            this.applyColorStyleAllStars(false);
            this.addEvents();
        });
        this.onValueChange = new Subject();
        this.onValueChange.subscribe(() => {
            this.generateRating();
            this.applySizeAllStars();
        });
        this.onCheckedColorChange = new Subject();
        this.onCheckedColorChange.subscribe(() => {
            this.applyColorStyleAllStars(true);
        });
        this.onUnCheckedColorChange = new Subject();
        this.onUnCheckedColorChange.subscribe(() => {
            this.applyColorStyleAllStars(false);
        });
        this.onSizeChange = new Subject();
        this.onSizeChange.subscribe(() => {
            this.applySizeAllStars();
        });
        this.onReadOnlyChange = new Subject();
        this.onReadOnlyChange.subscribe(() => {
            this.readonly ? this.makeReadOnly() : this.makeEditable();
        });
    }
    get checkedcolor() {
        return this._checkedColor;
    }
    get uncheckedcolor() {
        return this._unCheckedColor;
    }
    get value() {
        return this._value;
    }
    get size() {
        return this._size.concat((!this._size.includes("px") ? "px" : ""));
    }
    get readonly() {
        return String(this._readOnly) === "true";
    }
    get totalstars() {
        return this._totalStars;
    }
    set checkedcolor(value) {
        this._checkedColor = value;
        this._checkedColor && this.onCheckedColorChange.next(this._checkedColor);
    }
    set uncheckedcolor(value) {
        this._unCheckedColor = value;
        this._unCheckedColor && this.onUnCheckedColorChange.next(this._unCheckedColor);
    }
    set value(value) {
        value = (!value || value == null) ? 0 : value;
        this._value = value;
        this._value >= 0 && this.onValueChange.next(this._value);
    }
    set size(value) {
        value = (!value || value == null || value == "0px") ? "24px" : value;
        this._size = value;
        this.onSizeChange.next(this._size);
    }
    set readonly(value) {
        this._readOnly = value;
        this.onReadOnlyChange.next(value);
    }
    set totalstars(value) {
        this._totalStars = value <= 0 ? 5 : Math.round(value);
        this.onStarsCountChange.next(this._totalStars);
    }
    makeEditable() {
        if (!this.mainElement)
            return;
        this.mainElement.nativeElement.style.cursor = "pointer";
        this.mainElement.nativeElement.title = this.value;
        this.stars.forEach((star) => {
            star.style.cursor = "pointer";
            star.title = star.dataset.index;
        });
    }
    makeReadOnly() {
        if (!this.mainElement)
            return;
        this.mainElement.nativeElement.style.cursor = "default";
        this.mainElement.nativeElement.title = this.value;
        this.stars.forEach((star) => {
            star.style.cursor = "default";
            star.title = "";
        });
    }
    addEvents() {
        if (!this.mainElement)
            return;
        this.mainElement.nativeElement.addEventListener('mouseleave', this.offStar.bind(this));
        this.mainElement.nativeElement.style.cursor = "pointer";
        this.mainElement.nativeElement.title = this.value;
        this.stars.forEach((star) => {
            star.addEventListener('click', this.onRate.bind(this));
            star.addEventListener('mouseenter', this.onStar.bind(this));
            star.style.cursor = "pointer";
            star.title = star.dataset.index;
        });
    }
    ngAfterViewInit() {
    }
    onRate(event) {
        if (this.readonly)
            return;
        let star = event.srcElement;
        let oldValue = this.value;
        this.value = parseInt(star.dataset.index);
        // if (this.value == 0) {
        //   this.value = 1;
        // }
        let rateValues = { oldValue: oldValue, newValue: this.value, starRating: this };
        this.rate.emit(rateValues);
    }
    onStar(event) {
        if (this.readonly)
            return;
        let star = event.srcElement;
        let currentIndex = parseInt(star.dataset.index);
        for (let index = 0; index < currentIndex; index++) {
            this.stars[index].className = "";
            this.addDefaultClass(this.stars[index]);
            this.addCheckedStarClass(this.stars[index]);
        }
        for (let index = currentIndex; index < this.stars.length; index++) {
            this.stars[index].className = "";
            this.addDefaultClass(this.stars[index]);
        }
    }
    offStar(event) {
        this.generateRating();
    }
    addDefaultClass(star) {
        star.classList.add(StarRatingComponent_1.CLS_DEFAULT_STAR);
    }
    addCheckedStarClass(star) {
        star.classList.add(StarRatingComponent_1.CLS_CHECKED_STAR);
    }
    addHalfStarClass(star) {
        star.classList.add(StarRatingComponent_1.CLS_HALF_STAR);
    }
    setStars() {
        if (!this.mainElement)
            return;
        let starContainer = this.mainElement.nativeElement;
        let maxStars = [...Array(Number(this.totalstars)).keys()];
        this.stars.length = 0;
        starContainer.innerHTML = "";
        maxStars.forEach(starNumber => {
            let starElement = document.createElement("span");
            starElement.dataset.index = (starNumber + 1).toString();
            starElement.title = starElement.dataset.index;
            starContainer.appendChild(starElement);
            this.stars.push(starElement);
        });
    }
    applySizeAllStars() {
        if (this._size) {
            this.stars.length == 0 && this.setStars();
            this.stars.forEach((star) => {
                let newSize = this.size.match(/\d+/)[0];
                let halfSize = (parseInt(newSize) * 10) / 24;
                let halfMargin = 0 - ((parseInt(newSize) * 20) / 24);
                star.style.setProperty(StarRatingComponent_1.VAR_SIZE, this.size);
                if (star.classList.contains(StarRatingComponent_1.CLS_HALF_STAR)) {
                    star.style.setProperty(StarRatingComponent_1.VAR_HALF_WIDTH, `${halfSize}px`);
                    star.style.setProperty(StarRatingComponent_1.VAR_HALF_MARGIN, `${halfMargin}px`);
                }
            });
        }
    }
    applyColorStyleAllStars(setChecked) {
        this.stars.length == 0 && this.setStars();
        this.stars.forEach((star) => {
            if (setChecked) {
                this.applyCheckedColorStyle(star);
            }
            else {
                this.applyUnCheckedColorStyle(star);
            }
        });
    }
    applyColorStyle(starElement) {
        this.applyCheckedColorStyle(starElement);
        this.applyUnCheckedColorStyle(starElement);
    }
    applyCheckedColorStyle(starElement) {
        starElement.style.setProperty(StarRatingComponent_1.VAR_CHECKED_COLOR, this.checkedcolor);
    }
    applyUnCheckedColorStyle(starElement) {
        starElement.style.setProperty(StarRatingComponent_1.VAR_UNCHECKED_COLOR, this.uncheckedcolor);
    }
    generateRating(forceGenerate = false) {
        if (!this.mainElement)
            return;
        if (this.readonly && !forceGenerate)
            return;
        //if (this.value >= 0) {
        this.stars.length == 0 && this.setStars();
        this.mainElement.nativeElement.title = this.value;
        let hasDecimals = ((Number.parseFloat(this.value.toString()) % 1)
            .toString()
            .substring(3, 2)) ? true : false;
        let i = 1;
        this.stars.forEach((star) => {
            star.className = "";
            this.applyColorStyle(star);
            this.addDefaultClass(star);
            if (this.value >= i) {
                // star on
                this.addCheckedStarClass(star);
            }
            else {
                // half star
                if (hasDecimals) {
                    this.addHalfStarClass(star);
                    hasDecimals = false;
                }
            }
            i++;
        });
        //}
    }
};
StarRatingComponent.ɵfac = function StarRatingComponent_Factory(t) { return new (t || StarRatingComponent)(); };
StarRatingComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: StarRatingComponent, selectors: [["star-rating"]], viewQuery: function StarRatingComponent_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c0, 7);
    } if (rf & 2) {
        let _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.mainElement = _t.first);
    } }, inputs: { checkedcolor: "checkedcolor", uncheckedcolor: "uncheckedcolor", value: "value", size: "size", readonly: "readonly", totalstars: "totalstars" }, outputs: { rate: "rate" }, decls: 2, vars: 0, consts: [["starMain", ""]], template: function StarRatingComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelement(0, "div", null, 0);
    } }, styles: [":root{--checkedColor:gold;--unCheckedColor:gray;--size:24px;--halfWidth:10px;--halfMargin:-20px}.star{cursor:pointer;color:var(--unCheckedColor);font-size:var(--size);width:var(--size);display:inline-block}.star:last-child{margin-right:0}.star:before{content:'\\2605'}.star.on{color:var(--checkedColor)}.star.half:after{content:'\\2605';color:var(--checkedColor);position:absolute;margin-left:var(--halfMargin);width:var(--halfWidth);overflow:hidden}"], encapsulation: 3 });
StarRatingComponent.VAR_CHECKED_COLOR = '--checkedColor';
StarRatingComponent.VAR_UNCHECKED_COLOR = '--unCheckedColor';
StarRatingComponent.VAR_SIZE = '--size';
StarRatingComponent.VAR_HALF_WIDTH = '--halfWidth';
StarRatingComponent.VAR_HALF_MARGIN = '--halfMargin';
StarRatingComponent.CLS_CHECKED_STAR = 'on';
StarRatingComponent.CLS_DEFAULT_STAR = 'star';
StarRatingComponent.CLS_HALF_STAR = 'half';
StarRatingComponent.INP_CHECKED_COLOR = 'checkedcolor';
StarRatingComponent.INP_UNCHECKED_COLOR = 'uncheckedcolor';
StarRatingComponent.INP_VALUE = 'value';
StarRatingComponent.INP_SIZE = 'size';
StarRatingComponent.INP_READONLY = 'readonly';
StarRatingComponent.INP_TOTALSTARS = 'totalstars';
__decorate([
    ViewChild('starMain', { static: true })
], StarRatingComponent.prototype, "mainElement", void 0);
__decorate([
    Output()
], StarRatingComponent.prototype, "rate", void 0);
__decorate([
    Input(StarRatingComponent_1.INP_CHECKED_COLOR)
], StarRatingComponent.prototype, "checkedcolor", null);
__decorate([
    Input(StarRatingComponent_1.INP_UNCHECKED_COLOR)
], StarRatingComponent.prototype, "uncheckedcolor", null);
__decorate([
    Input(StarRatingComponent_1.INP_VALUE)
], StarRatingComponent.prototype, "value", null);
__decorate([
    Input(StarRatingComponent_1.INP_SIZE)
], StarRatingComponent.prototype, "size", null);
__decorate([
    Input(StarRatingComponent_1.INP_READONLY)
], StarRatingComponent.prototype, "readonly", null);
__decorate([
    Input(StarRatingComponent_1.INP_TOTALSTARS)
], StarRatingComponent.prototype, "totalstars", null);

let RatingModule = class RatingModule {
    ngDoBootstrap() { }
};
RatingModule.ɵfac = function RatingModule_Factory(t) { return new (t || RatingModule)(); };
RatingModule.ɵmod = /*@__PURE__*/ ɵngcc0.ɵɵdefineNgModule({ type: RatingModule });
RatingModule.ɵinj = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjector({ imports: [FormsModule,
        CommonModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(RatingComponent, [{
        type: Component,
        args: [{
                selector: 'lib-rating',
                template: `
    <p>
      rating works!
    </p>
  `
            }]
    }], function () { return []; }, null); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(StarRatingComponent, [{
        type: Component,
        args: [{ selector: 'star-rating', template: "<div #starMain>\n</div>", encapsulation: ViewEncapsulation.ShadowDom, styles: [":root{--checkedColor:gold;--unCheckedColor:gray;--size:24px;--halfWidth:10px;--halfMargin:-20px}.star{cursor:pointer;color:var(--unCheckedColor);font-size:var(--size);width:var(--size);display:inline-block}.star:last-child{margin-right:0}.star:before{content:'\\2605'}.star.on{color:var(--checkedColor)}.star.half:after{content:'\\2605';color:var(--checkedColor);position:absolute;margin-left:var(--halfMargin);width:var(--halfWidth);overflow:hidden}"] }]
    }], function () { return []; }, { rate: [{
            type: Output
        }], checkedcolor: [{
            type: Input,
            args: [StarRatingComponent_1.INP_CHECKED_COLOR]
        }], uncheckedcolor: [{
            type: Input,
            args: [StarRatingComponent_1.INP_UNCHECKED_COLOR]
        }], value: [{
            type: Input,
            args: [StarRatingComponent_1.INP_VALUE]
        }], size: [{
            type: Input,
            args: [StarRatingComponent_1.INP_SIZE]
        }], readonly: [{
            type: Input,
            args: [StarRatingComponent_1.INP_READONLY]
        }], totalstars: [{
            type: Input,
            args: [StarRatingComponent_1.INP_TOTALSTARS]
        }], mainElement: [{
            type: ViewChild,
            args: ['starMain', { static: true }]
        }] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(RatingModule, [{
        type: NgModule,
        args: [{
                imports: [
                    FormsModule,
                    CommonModule
                ],
                declarations: [
                    RatingComponent,
                    StarRatingComponent
                ],
                exports: [StarRatingComponent],
                entryComponents: [StarRatingComponent]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(RatingModule, { declarations: function () { return [RatingComponent, StarRatingComponent]; }, imports: function () { return [FormsModule,
        CommonModule]; }, exports: function () { return [StarRatingComponent]; } }); })();

/*
 * Public API Surface of rating
 */

/**
 * Generated bundle index. Do not edit.
 */

export { RatingModule, StarRatingComponent, RatingComponent as ɵa };

//# sourceMappingURL=ng-starrating.js.map