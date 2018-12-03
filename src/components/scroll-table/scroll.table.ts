import {
    Component, OnInit, HostBinding, Input, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit,
    Directive, ContentChild, ContentChildren, Query, TemplateRef, PipeTransform, Pipe, ChangeDetectionStrategy
} from '@angular/core';
import { ITableModel } from '..';

@Component({
    selector: 'scroll-table',
    template: `
    <section class="table-container">
        <!-- <table-header>
            <ng-content select=[header]></ng-content>
        </table-header>
        <table-body #body>
            <ng-content select=[body]></ng-content>
        </table-body>
        -->
        <ng-content></ng-content>
    </section>
    `
})
export class ScrollTableComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}

@Pipe({ name: 'empty' })
export class EmptyPipe implements PipeTransform {

    constructor() { }

    transform(value: string): string {
        return value && value.length > 0 ? value : '';
    }
}

@Component({
    selector: 'data-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section class="table-container">
      <section  class="table-header" *ngIf="Table">
        <table class="table" *ngIf="Table.Columns">       
            <thead>
                <tr>
                    <th [class]="item.Style | empty" *ngFor="let item of Table.Columns">
                        <ng-container  *ngIf="item.Template;">
                            <ng-container *ngTemplateOutlet="item.Template; context: item.DataContext"> </ng-container>
                        </ng-container>
                        <span [class]="item.InnerStyle | empty" *ngIf="!item.Template">{{item.Text}}</span>
                    </th>
                </tr>
            </thead>
        </table>
      </section>      
      <section  class="table-body" #body>
            <table class="table" *ngIf="Table && Table.Rows">           
                <tbody>
                    <tr [class]="row.Style | empty" *ngFor="let row of Table.Rows | async" #rows>
                        <td [class]="item.Style | empty" *ngFor="let item of row.Columns">
                            <ng-container  *ngIf="item.Template">
                                <ng-container *ngTemplateOutlet="item.Template; context: item.DataContext" > </ng-container>
                            </ng-container>
                            <span [class]="item.InnerStyle | empty" *ngIf="!item.Template">{{item.Text}}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
      </section>    
    </section>
    `
})
export class DataTableComponent implements OnInit, AfterViewInit {
    @ViewChild('body') private body: ElementRef;
    @ViewChildren('rows') private rows: QueryList<any>;
    @Input() Table: ITableModel = { Columns: [] };
    @Input() AutoScroll = true;

    ngOnInit(): void { }

    ngAfterViewInit() {
        if (this.rows) {
            this.rows.changes.subscribe(() => {
                if (this.AutoScroll) {
                    this.ScrollToBottom();
                }
            });
        }
    }
    ScrollToBottom() {
        if (this.body) {
            let native = this.body.nativeElement;
            native.scrollTop = native.scrollHeight;
        }
    }
}

@Component({
    selector: 'table-header',
    template: `
    <table class="table">       
        <thead>
            <ng-content></ng-content>       
        </thead>
        <tbody class="hide"></tbody>
    </table>
    `
})
export class TableHeaderComponent implements OnInit {
    constructor() { }
    @HostBinding('class.table-header') true;
    ngOnInit(): void { }
}

@Directive({
    selector: 'row[row]'
})
export class TableRowDirective {
    constructor(private elementRef: ElementRef) {
        // console.log('row directive', elementRef);
    }
}


@Component({
    selector: 'table-body',
    template: `
    <table class="table">
            <ng-content></ng-content>
    </table>
    `
})
export class TableBodyComponent implements OnInit, AfterViewInit {

    @ViewChildren(TableRowDirective) private rows: QueryList<TableRowDirective>;
    @ViewChildren('row') private nameRows: QueryList<ElementRef>;
    @ContentChildren(TableRowDirective) rowsContent: QueryList<TableRowDirective>;

    @Input() RowTemplate: TemplateRef<any>;
    @Input() AutoScroll = true;

    constructor(private elementRef: ElementRef) { }

    @HostBinding('class.table-body') true;

    ngOnInit(): void {

    }
    ngAfterViewInit() {
        console.log('body', this.elementRef, this.nameRows);
        console.log(this.rowsContent);

        // if (this.rows) {
        //     console.log('initialize view', this.rows);
        //     this.rows.changes.subscribe((r) => {
        //         this.ScrollToBottom();
        //     });
        // }
        // if (this.nameRows) {
        //     console.log('initialize view', this.nameRows);
        //     this.nameRows.changes.subscribe((r) => {
        //         this.ScrollToBottom();
        //     });
        // }
        if (this.rowsContent) {

            this.rowsContent.changes.subscribe(() => {
                console.log('rows changed');

                this.ScrollToBottom();
            });
        }
    }
    ScrollToBottom() {
        if (this.elementRef) {
            let native = this.elementRef.nativeElement;
            native.scrollTop = native.scrollHeight;
        }
    }
}



