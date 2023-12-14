// comment.component.ts
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DataSharingService } from '../services/data-sharing.service';
import { PublishService } from '../services/publish.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @ViewChild('commentTextarea', { static: true }) commentTextarea: ElementRef;
  formData: any;

  constructor(
    private dataSharingService: DataSharingService,
    private publishService: PublishService
  ) {}

  ngOnInit() {
    // Subscribe to formData$ when the component is initialized
    this.subscribeToFormData();
  }

  onSubmit() {
    const commentData = { comment: this.commentTextarea.nativeElement.value };
    this.dataSharingService.updateFormData(commentData);

    // No need to call subscribeToFormData here since it's already called in ngOnInit
  }

  private subscribeToFormData() {
    this.dataSharingService.formData$.subscribe((formData) => {
      this.formData = {
        start_location: formData.start_location,
        end_location: formData.end_location,
        departure_time: formData.departure_time,
        available_seats: formData.available_seats,
        ride_description: formData.ride_description
      };
      console.log('Updated formData:', this.formData);
    });
  }

  publishRide() {
    console.log('Publishing ride...');
    if (this.formData) {
      this.publishService.publish(this.formData).subscribe(
        (response) => {
          console.log('Ride published successfully:', response);
          this.showAlert('Published Ride', 'Your ride has been successfully published!');
        },
        (error) => {
          console.error('Error publishing ride:', error);
        }
      );
    } else {
      console.warn('FormData is not available. Make sure to subscribe to formData$.');
    }
  }

  showAlert(title: string, message: string) {
    alert(`${title}\n\n${message}`);
  }
}
