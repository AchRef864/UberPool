import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private router: Router, private apiService: SearchService) { }
  @ViewChild('searchForm') searchForm: ElementRef;

  searchRide(departure: string, destination: string, day: string, passengers: number) {
    // Parse the input date string to a Date object
    const selectedDate = new Date(day);

    // Check if the selected date is less than today's date
    if (selectedDate < new Date()) {
      alert("Please select a date greater than or equal to today.");
      return; // Do not proceed with the search if the date is invalid
    }

    const formData = {
      departure: departure,
      destination: destination,
      day: selectedDate.toISOString(),
      passengers: passengers,
    };

    console.log('Form Data:', formData);

    this.apiService.search(formData).subscribe(
      (response) => {
        // Handle successful user creation
        console.log('Search found', response);

        this.router.navigate(['/results'], { queryParams: { results: JSON.stringify(response) } });

      },
      (error) => {
        // Handle error during user creation
        console.error('Error in search:', error);
        alert("No rides are matching your criteria.");
        // You can add error handling logic here
      }
    );
  }
}
