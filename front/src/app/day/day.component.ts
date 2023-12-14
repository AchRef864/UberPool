import { Component, ViewChild, ElementRef } from '@angular/core';
import { DataSharingService } from '../services/data-sharing.service';
@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent  {

  @ViewChild('dayInput', { static: true }) startInput: ElementRef;

  constructor(private dataSharingService: DataSharingService) {}

  onSubmit() {
    const rideData = { day: this.startInput.nativeElement.value };
    this.dataSharingService.updateFormData(rideData);
  }
}

