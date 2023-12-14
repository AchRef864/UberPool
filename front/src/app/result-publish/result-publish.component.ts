// result-publish.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result-publish',
  templateUrl: './result-publish.component.html',
  styleUrls: ['./result-publish.component.css']
})
export class ResultPublishComponent implements OnInit {
  publishedData: any; // You can adjust the type based on your data structure

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Subscribe to route params to get the published data
    this.route.queryParams.subscribe(params => {
      this.publishedData = params;
    });
  }
}
