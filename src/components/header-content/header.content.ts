import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'header-content',
    template: `
    <section class="header-content">
        <section class="header">
            <ng-content select=[header]></ng-content>
        </section>
        <section class="content">
            <ng-content select=[content]></ng-content>
        </section>
    </section>
    `
})
export class HeaderContentComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
