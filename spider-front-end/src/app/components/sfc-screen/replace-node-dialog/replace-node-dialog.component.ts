import { Component, OnInit } from '@angular/core';
import {SfcRequestService} from 'src/app/services/sfc-request.service';

@Component({
  selector: 'app-replace-node-dialog',
  templateUrl: './replace-node-dialog.component.html',
  styleUrls: ['./replace-node-dialog.component.css']
})
export class ReplaceNodeDialogComponent implements OnInit {

  node_chosen: string;

  constructor(private sfc_request_service: SfcRequestService) { }

  ngOnInit(): void {
  }

  select(){
    console.log(this.sfc_request_service.temp_node);
    if (this.node_chosen == "source"){
      this.sfc_request_service.source_node = this.sfc_request_service.temp_node;      
    }
    else{
      this.sfc_request_service.destination_node = this.sfc_request_service.temp_node;
      console.log('eeee',this.sfc_request_service.temp_node);
    }
  }

}
