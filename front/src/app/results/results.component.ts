// results.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'] // Include the CSS file here
})
export class ResultsComponent implements OnInit {
  results: any[]; // assuming this is an array of results

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.results = JSON.parse(params['results']);
      console.log('Results in ResultsComponent:', this.results);

      // Fetch driver names
      this.results.forEach(result => {
        this.userService.getUserById(result.driver_id).subscribe(
          (user) => {
            // Assuming user has a 'name' property
            result.driverName = user.name;
            result.driverPhone = user.phone_number;
            console.log(result.driverName);
            console.log(result.driverPhone);
          },
          (error) => {
            console.error('Error fetching user:', error);
          }
        );
      });
    });
  }
}
