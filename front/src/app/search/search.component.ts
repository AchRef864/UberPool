import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  {

  constructor(private router: Router, private apiService: SearchService) {}
  @ViewChild('searchForm') searchForm: ElementRef;
  
  searchRide(departure: string, destination: string, day: Date, passengers: number) {
    const formData = {
      departure: departure,
      destination: destination,
      day: day,
      passengers: passengers,
      
    };
    console.log('Form Data:', formData);
    this.apiService.search(formData).subscribe(
      (response) => {
        // Handle successful user creation
        console.log('Search found', response);

        this.router.navigate(['/results']);
      },
      (error) => {
        // Handle error during user creation
        console.error('Error in search:', error);
        // You can add error handling logic here
      } 
    );
  

}
}
