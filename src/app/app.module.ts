import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import { DialogComponent } from './dialog/dialog.component';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdTimerModule } from 'angular-cd-timer';
import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSlideToggleModule,
    AppRoutingModule,
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatButton,
    MatDialogModule,
    MatFormField,
    MatInput,
    MatFormFieldModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    CdTimerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

