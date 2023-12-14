import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublishService } from '../services/publish.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publish',
  templateUrl: './publish-f.component.html',
  styleUrls: ['./publish-f.component.css']
})
export class PublishFComponent {
  publishForm: FormGroup;
  driverId: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private publishService: PublishService,
    private authService: AuthService
  ) {
    this.publishForm = this.formBuilder.group({
      driver_id: localStorage.getItem("id"), // Initialize with the user's ID from localStorage
      start_location: ['', Validators.required],
      car_brand: [''],
      end_location: ['', Validators.required],
      departure_time: ['', Validators.required],
      arrival_time: ['', Validators.required],
      available_seats: [1, Validators.required],
      price_per_seat: [],
      ride_description: ['']
    });

    // Fetch the currently logged-in user's information when the component is constructed
    this.fetchCurrentUser();
  }

  fetchCurrentUser() {
    this.authService.getCurrentUser().subscribe(
      (user) => {
        if (user) {
          this.driverId = localStorage.getItem("id"); // Assuming the user object has an 'id' property
          this.publishForm.patchValue({ driver_id: this.driverId });
        }
      },
      (error) => {
        console.error('Error fetching current user:', error);
      }
    );
  }

  onSubmit() {
    // Display a confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to publish this ride?');

    // Check if the user confirmed
    if (isConfirmed) {
      // Publish the ride
      this.publishService.publish(this.publishForm.value).subscribe(
        (response) => {
          console.log('Ride published successfully:', response);
          console.log('Navigating to resultPublish...');
          this.router.navigate(['/resultPublish']);
        },
        (error) => {
          console.error('Error publishing ride:', error);
        }
      );
    } else {
      // User canceled, you can add additional logic if needed
      console.log('User canceled publishing the ride.');
    }
  }

  showAlert(title: string, message: string) {
    alert(`${title}\n\n${message}`);
  }
}
