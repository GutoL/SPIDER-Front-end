import { Component, OnInit , Inject } from '@angular/core';
// import {SfcRequestService} from 'src/app/services/sfc-request.service';
// import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-replace-node-dialog',
  templateUrl: './replace-node-dialog.component.html',
  styleUrls: ['./replace-node-dialog.component.css']
})
export class ReplaceNodeDialogComponent implements OnInit {

  node_chosen: string;

  constructor(
              public dialogRef: MatDialogRef<ReplaceNodeDialogComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: DialogData
              ) { }

  ngOnInit(): void {}

  select(){
    this.dialogRef.close(this.node_chosen);
  }

}
