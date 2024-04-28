import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CdTimerComponent } from 'angular-cd-timer';
import { FormControl } from '@angular/forms';

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
