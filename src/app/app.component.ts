import { Component } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {DialogComponent} from "./dialog/dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sleep-Tracker-Front-End';
  constructor(private dialog : MatDialog){
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    });
  }
}
