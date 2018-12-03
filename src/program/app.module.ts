import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../app/app.component';
import * as Components from './components';

@NgModule({
  declarations: [
    AppComponent,
    Components.ScrollTableComponent,
    Components.TableBodyComponent,
    Components.TableHeaderComponent,
    Components.HeaderContentComponent,
    Components.ScrollToBottomDirective,
    Components.TableRowDirective,
    Components.EmptyPipe,
    Components.DataTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
