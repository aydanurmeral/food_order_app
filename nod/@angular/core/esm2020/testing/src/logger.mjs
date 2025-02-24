/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class Log {
    constructor() {
        this.logItems = [];
    }
    add(value) {
        this.logItems.push(value);
    }
    fn(value) {
        return () => {
            this.logItems.push(value);
        };
    }
    clear() {
        this.logItems = [];
    }
    result() {
        return this.logItems.join('; ');
    }
}
Log.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: Log, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
Log.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: Log });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: Log, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS90ZXN0aW5nL3NyYy9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFHekMsTUFBTSxPQUFPLEdBQUc7SUFHZDtRQUNFLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxHQUFHLENBQUMsS0FBUTtRQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxFQUFFLENBQUMsS0FBUTtRQUNULE9BQU8sR0FBRyxFQUFFO1lBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7MkdBdkJVLEdBQUc7K0dBQUgsR0FBRztzR0FBSCxHQUFHO2tCQURmLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvZzxUID0gc3RyaW5nPiB7XG4gIGxvZ0l0ZW1zOiBUW107XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5sb2dJdGVtcyA9IFtdO1xuICB9XG5cbiAgYWRkKHZhbHVlOiBUKTogdm9pZCB7XG4gICAgdGhpcy5sb2dJdGVtcy5wdXNoKHZhbHVlKTtcbiAgfVxuXG4gIGZuKHZhbHVlOiBUKSB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHRoaXMubG9nSXRlbXMucHVzaCh2YWx1ZSk7XG4gICAgfTtcbiAgfVxuXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMubG9nSXRlbXMgPSBbXTtcbiAgfVxuXG4gIHJlc3VsdCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmxvZ0l0ZW1zLmpvaW4oJzsgJyk7XG4gIH1cbn1cbiJdfQ==