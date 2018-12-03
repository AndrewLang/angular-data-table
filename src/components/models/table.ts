import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export interface ITableModel {
    Rows?: Observable<ITableRow[]>;
    Columns?: ITableCell[];
}
export interface ITableCell {
    Text?: string;
    Style?: string;
    InnerStyle?: string;
    Template?: TemplateRef<any>;
    DataContext?: any;
}

export interface ITableRow {
    Columns?: ITableCell[];
    Style?: string;
    DataContext?: any;
}
