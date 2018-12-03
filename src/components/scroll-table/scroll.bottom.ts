import { Directive, ElementRef, QueryList, ViewChildren, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[ScrollToBottom]',
})
export class ScrollToBottomDirective implements AfterViewInit {
    @ViewChildren('rows') rows: QueryList<any>;

    constructor(private elementRef: ElementRef) {

    }

    ngAfterViewInit() {
        console.log('Directive ', this.elementRef, this.rows);
    }
}
