import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MensagensService } from './mensagens.service';
import { MensagensComponent } from './components/mensagens/mensagens.component';

@NgModule({
  declarations: [
    AppComponent,
    MensagensComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'mensagens', component: MensagensComponent
      }
    ])
  ],
  providers: [HttpClientModule, MensagensService],
  bootstrap: [AppComponent]
})
export class AppModule { }
