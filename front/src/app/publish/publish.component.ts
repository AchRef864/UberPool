// publish.component.ts
import { Component, ViewChild, ElementRef } from '@angular/core';
import { DataSharingService } from '../services/data-sharing.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent {
  @ViewChild('startInput', { static: true }) startInput: ElementRef;

  constructor(private dataSharingService: DataSharingService) {}

  onSubmit() {
    const rideData = { place: this.startInput.nativeElement.value };
    this.dataSharingService.updateFormData(rideData);
  }
}
