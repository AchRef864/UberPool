import { Component, ViewChild, ElementRef } from '@angular/core';
import { DataSharingService } from '../services/data-sharing.service';
@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent  {

  @ViewChild('endInput', { static: true }) endInput: ElementRef;

  constructor(private dataSharingService: DataSharingService) {}

  onSubmit() {
    const rideData = { end: this.endInput.nativeElement.value};
    this.dataSharingService.updateFormData(rideData);
  }
}
