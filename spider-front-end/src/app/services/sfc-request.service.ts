import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SfcRequestService {

  source_node: number;
  destination_node: number;
  temp_node: number;

  constructor() {
    this.source_node = -1;
    this.destination_node = -1;
   }
}
