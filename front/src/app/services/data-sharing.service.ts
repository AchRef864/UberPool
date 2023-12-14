// data-sharing.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private formDataSubject = new BehaviorSubject<any>({});
  formData$ = this.formDataSubject.asObservable();

  updateFormData(data: any) {
    this.formDataSubject.next(data);
  }
}
