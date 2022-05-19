import { Component, OnInit, ViewChild } from '@angular/core';
import { SfcRequest } from 'src/app/models/sfc-request';
import { SfcRequestService } from 'src/app/services/sfc-request.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

declare const getInfrastructureMapToView:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HomeComponent implements OnInit {

  sfc_request_list: SfcRequest[] = [];
  dataSource: MatTableDataSource<SfcRequest>;

  expandedElement: SfcRequest;
  expand: boolean = false;
  
  displayedColumns: string[] = ["name", "detail", "delete"];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private sfc_request_service: SfcRequestService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.get_sfcs();    
  }

  get_sfcs(){
    this.sfc_request_service.get_sfc_resquests().subscribe((sfc_requests: SfcRequest[]) => {
      
      this.sfc_request_list = [];

      sfc_requests.forEach(sfc_request => {
        // console.log(sfc_request);
        sfc_request._id = sfc_request['_id'];
        this.sfc_request_list.push(sfc_request);
      });
      
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.sfc_request_list);
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  expand_collapse_row(element: SfcRequest){
    this.expandedElement = element;
    this.expand = !this.expand;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  open_dialog(sfc_request: SfcRequest) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {

      if (result == true){
        this.delete_sfc_request(sfc_request);
      } 

    });
  }

  delete_sfc_request(sfc_request: SfcRequest){

    this.sfc_request_service.delete_sfc_resquest(sfc_request).subscribe(() => {
      this.get_sfcs();
    });

  }

}
