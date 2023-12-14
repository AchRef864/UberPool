import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Update the path


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private apiService: AuthService) { }
  @ViewChild('loginForm') loginForm: ElementRef;



  ngOnInit(): void {
  }
  login(email: string, password: string) {
    const formData = {
      email: email,
      password: password
    };

    // Access form data directly


    this.apiService.login(formData).subscribe(
      (response) => {
        // Handle successful user creation
        console.log('User logged in successfully:', response);
        localStorage.setItem('token', response.token);
        console.log(response.id);

        localStorage.setItem('id', response.id);
        if (response.type == "passenger") {
          this.router.navigate(['/homePassenger']);
        } else {
          this.router.navigate(['/homeDriver']);

        }

        // Redirect based on userType

      },
      (error) => {
        // Handle error during user creation
        console.error('Error creating user:', error);
        // You can add error handling logic here
      }
    );


    // Your form submission logic goes here
  }
  navigateToSignup() {
    this.router.navigate(['/']);
  }

}
