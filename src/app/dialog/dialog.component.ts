import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CdTimerComponent } from 'angular-cd-timer';
import {FormControl, FormGroup, FormBuilder, Validator, Validators} from '@angular/forms';
import {ApiService} from "../services/api.service";
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  @ViewChild('basicTimer') basicTimer!: CdTimerComponent;
  timerValue = new FormControl();
  hoursControl = new FormControl();
  minutesControl = new FormControl();
  seconds = 0;
  timerId: any;

  sleepForm !: FormGroup;

  constructor(private formBuilder : FormBuilder, private api : ApiService, private dialogRef : MatDialogRef<DialogComponent>){
  }

  ngOnInit() {
    this.sleepForm = this.formBuilder.group({
      date: ['', Validators.required],
      hours: [0, [Validators.required, Validators.pattern(/^\d+$/)]],
      minutes: [0, [Validators.required, Validators.pattern(/^\d+$/)]],
      notes: ['', Validators.required]
    });
  }

  addSleepForm(){
    const formValue = this.sleepForm.value;
    formValue.date = new Date(formValue.date).toISOString();
    if(this.sleepForm.valid){
      this.api.postSleepData(formValue).subscribe({
        next: (res)=>{
          alert("Data added successfully");
          this.sleepForm.reset();
          this.dialogRef.close();
        },
        error: (err)=>{
          console.log(err);
        }
      })
    }
  }

  ngAfterViewInit() {
    // Start the timer when the component is initialized
    this.startTimer();
  }

  startTimer() {
    this.timerId = setInterval(() => {
      this.seconds++;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerId);
    this.timerValue.setValue(this.seconds);

    // Calculate hours and minutes from seconds
    const hours = Math.floor(this.seconds / 3600);
    const minutes = Math.floor((this.seconds % 3600) / 60);
    this.hoursControl.setValue(hours);
    this.minutesControl.setValue(minutes);
  }

  resetTimer() {
    this.stopTimer();
    this.seconds = 0;
  }
}
