import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';

import { AppComponent } from './app.component';
import { ClientComponent } from './components/client/client.component';
import { ClientService } from './services/client.service';


@NgModule({
  declarations: [
    AppComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    TableModule, 
    ButtonModule,
    InputNumberModule,
    CardModule
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
