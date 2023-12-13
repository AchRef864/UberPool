import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Update the path

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {  
  constructor(private router: Router , private apiService: AuthService) {}

  @ViewChild('signupForm') signupForm: ElementRef;
  
  createAccount(username: string, email: string, phoneNumber: string, userType: string, password: string) {
    const formData = {
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      userType: userType,
      password: password
    };

    // Access form data directly
    console.log('Form Data:', formData);
    this.apiService.register(formData).subscribe(
      (response) => {
        // Handle successful user creation
        console.log('User created successfully:', response);

        // Redirect based on userType
        if (formData.userType === 'passenger') {
          this.router.navigate(['/homePassenger']);
        } else {
          this.router.navigate(['/homeDriver']);
        }
      },
      (error) => {
        // Handle error during user creation
        console.error('Error creating user:', error);
        // You can add error handling logic here
      }
    );
    if(formData.userType=="passenger"){
      this.router.navigate(['/homePassenger']);

    }else{
      this.router.navigate(['/homeDriver']);

    }

    // Your form submission logic goes here
  }
}
