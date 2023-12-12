import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {
  numberOfPassengers: number = 1; // Initial value
  minPassengers: number = 1;
  maxPassengers: number = 4;

  constructor() { }

  ngOnInit(): void {
  }

  incrementPassengers() {
    if (this.numberOfPassengers < this.maxPassengers) {
      this.numberOfPassengers++;
    }
  }

  decrementPassengers() {
    if (this.numberOfPassengers > this.minPassengers) {
      this.numberOfPassengers--;
    }
  }
}
