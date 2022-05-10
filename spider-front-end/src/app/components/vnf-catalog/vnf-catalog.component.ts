import { OnInit, Component, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Vnf } from 'src/app/models/vnf';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Router } from '@angular/router';
import { VnfService } from 'src/app/services/vnf.service';


@Component({
  selector: 'app-vnf-catalog',
  templateUrl: './vnf-catalog.component.html',
  styleUrls: ['./vnf-catalog.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class VnfCatalogComponent implements OnInit {

  displayedColumns: string[] = ["id", "name", "detail", "edit", "delete"];
  dataSource: MatTableDataSource<Vnf>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  expandedElement: Vnf;
  expand: boolean = false;
  vnf_list: Vnf[] = [];

  constructor(private router: Router, private vnf_service: VnfService) {
  }

  ngOnInit(): void {
    this.get_vnfs();    
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
  }

  expand_collapse_row(element: Vnf){
    this.expandedElement = element;
    this.expand = !this.expand;
  }

  get_vnfs(){
    this.vnf_service.get_vnfs().subscribe((vnfs: Vnf[]) => {
      
      this.vnf_list = [];
      
      vnfs.forEach(vnf => {
        console.log(vnf);
        vnf.id = vnf['id'];
        this.vnf_list.push(vnf);
      });
      
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.vnf_list);
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;  
    });
  }

  go_to_create_vnf_screen(){
    this.vnf_service.reset_vnf();
    this.router.navigate(['/create_vnf']);
  }

  go_to_update_vnf_screen(vnf: Vnf){
    this.vnf_service.vnf_to_update = vnf;
    this.router.navigate(['/create_vnf']);
  }

  delete_vnf(vnf: Vnf){
    this.vnf_service.delete_vnf(vnf).subscribe(() => {
      this.get_vnfs();
    });
  }

}
