import {Component, ViewChild, AfterViewInit, Inject, OnInit} from '@angular/core';
import { CdTimerComponent } from 'angular-cd-timer';
import {FormControl, FormGroup, FormBuilder, Validator, Validators} from '@angular/forms';
import {ApiService} from "../services/api.service";
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit {
  @ViewChild('basicTimer') basicTimer!: CdTimerComponent;
  actionBtn: string = "Save"
  timerValue = new FormControl();
  hoursControl = new FormControl();
  minutesControl = new FormControl();
  seconds = 0;
  timerId: any;

  sleepForm !: FormGroup;

  constructor(private formBuilder : FormBuilder, private api : ApiService, @Inject(MAT_DIALOG_DATA) public editData:any, private dialogRef : MatDialogRef<DialogComponent>){
  }

  ngOnInit() {
    this.sleepForm = this.formBuilder.group({
      date: ['', Validators.required],
      hours: [0, [Validators.required, Validators.pattern(/^\d+$/)]],
      minutes: [0, [Validators.required, Validators.pattern(/^\d+$/)]],
      notes: ['', Validators.required]
    });
    if(this.editData) {
      this.actionBtn = "Update"
      this.sleepForm.controls['date'].setValue(new Date(this.editData.date));
      this.sleepForm.controls['hours'].setValue(this.editData.hours);
      this.sleepForm.controls['minutes'].setValue(this.editData.minutes);
      this.sleepForm.controls['notes'].setValue(this.editData.notes);
    }
  }

  addSleepForm(){
    if(!this.editData){
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
    else{
      this.updateSleepForm();
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

  updateSleepForm() {
    this.api.updateSleepData(this.sleepForm.value, this.editData.id).subscribe({
      next: (res)=>{
        alert("Data updated successfully");
        this.sleepForm.reset();
        this.dialogRef.close('Update');
      },
      error: (err)=>{
        console.log(err);
        console.log(this.sleepForm.value);
      }
    })
  }
}
