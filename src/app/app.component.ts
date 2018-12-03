import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ITableModel, ITableRow } from 'src/components';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'fast-table';
    Items: Observable<IMessage[]>;
    StartLabel = 'Start';
    Start = false;
    items = [];
    Table: ITableModel;

    @ViewChild('list') list: ElementRef;
    @ViewChildren('rows') rows: QueryList<any>;

    ngOnInit() {

        this.Table = {
            Columns: [
                { Text: '', Style: 'w-15-p' },
                { Text: 'Name', Style: 'w-25-p' },
                { Text: 'Value', Style: 'w-40-p' },
                { Text: 'Description', Style: 'w-20-p' },
            ],
            Rows: Observable.create((observer: Observer<ITableRow[]>) => {
                setInterval(() => {
                    if (this.Start) {
                        let now = Date.now();
                        let row = {
                            Columns: [
                                { Text: now, Style: 'w-15-p' },
                                { Text: now.toString(), Style: 'w-25-p' },
                                { Text: now, Style: 'w-40-p' },
                                { Text: `Time: ${now}`, Style: 'w-20-p' }
                            ]
                        };
                        this.items.push(row);
                        observer.next(this.items);
                    }
                }, 50);

            })
        };

        // this.Items = Observable.create((observer: Observer<IMessage[]>) => {

        //     setInterval(() => {
        //         if (this.Start) {
        //             let now = Date.now();
        //             let message = { Index: now, Name: now.toString(), Value: now, Description: `Time: ${now}` };
        //             this.items.push(message);
        //             observer.next(this.items);
        //         }
        //     }, 50);

        // });
    }
    ngAfterViewInit() {

    }

    get HasItems(): boolean {
        return this.Items !== undefined;
    }
    ToggleStart() {
        this.Start = !this.Start;
        this.StartLabel = this.Start ? 'Stop' : 'Start';
    }
    Clear() {
        this.items = [];
    }
}

export interface IMessage {
    Index?: number;
    Name?: string;
    Value?: any;
    Description?: string;
}
