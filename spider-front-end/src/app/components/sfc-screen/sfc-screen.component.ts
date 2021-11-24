import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Vnf } from 'src/app/models/vnf';
import { VnfService } from 'src/app/services/vnf.service';
import { Router } from '@angular/router';
import { GoogleMap } from '@angular/google-maps';
import { MapInfoWindow} from '@angular/google-maps';
import {MatDialog} from '@angular/material/dialog';
import {ReplaceNodeDialogComponent} from 'src/app/components/sfc-screen/replace-node-dialog/replace-node-dialog.component';
import { InfrastructureService} from "src/app/services/infrastructure.service";
import { SfcRequest } from 'src/app/models/sfc-request';


@Component({
  selector: 'app-sfc-screen',
  templateUrl: './sfc-screen.component.html',
  styleUrls: ['./sfc-screen.component.css']
})
export class SfcScreenComponent implements OnInit {

  // maps tutorial: https://medium.com/swlh/angular-google-map-component-basics-and-tips-7ff679e383ff
  // https://timdeschryver.dev/blog/google-maps-as-an-angular-component#googlemap
    
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow

  form_group_list: FormGroup[] = [];

  isLinear = false;
  formGroup: FormGroup;
  form: FormArray;
  @ViewChild('stepper') stepper: any;

  sfc_request: SfcRequest = {id: 0, name: "", VNFs: [], destination: "-1",
                             source: "-1",flow_entries:[], 
                             requirements:{availability:0.99}};

  vnf_list: Vnf[];
  
  newSteps: Step[] = [];

  show_source_button = false;
  source_button_text: string;
  
  show_destination_button = false;
  destination_button_text: string;

  mapOptions: google.maps.MapOptions = {
      zoom : 14,
      disableDefaultUI: true,
  }
  
  polylineOptions = {
    path: Array(),
    strokeColor: "#32a1d0",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  };

  markers: Mark[] = [];

  constructor(private vnf_service: VnfService, private router: Router, public dialog: MatDialog,
              private infrastructure_service: InfrastructureService) {
                                
              }

  
  ngOnInit() {

    this.sfc_request.source = "-1";
    this.sfc_request.destination = "-1";

    this.markers = this.infrastructure_service.get_nodes_makers();

    this.get_vnfs();

    let source = {name: "Source", bandwidth:10, cost: 1}
    
    this.newSteps.push(source);
    this.form_group_list.push(this.create_form(source));

    let links = this.infrastructure_service.get_links_markers();
    for(let i in links){
      this.polylineOptions.path.push(links[i]);
    }
  }

  ngAfterViewInit(){
    const bounds = this.getBounds(this.markers);
    this.map.fitBounds(bounds);
  }
  
  create_form(step: Step){
    let formGroup = new FormGroup({
      name: new FormControl(step.name),
      bandwidth: new FormControl(step.bandwidth),
      cost: new FormControl(step.cost)
    });
    return formGroup;
  }

  get_vnfs(){
    this.vnf_service.get_vnfs().subscribe((vnfs: Vnf[]) => {
      this.vnf_list = vnfs;  
    });
  }

  isSet = (value: any) => {
    return value !== undefined && value !== null;
  }

  addItem() {

    this.form_group_list.push(this.create_form({name:"",bandwidth:10, cost: 1}));

    this.newSteps.push({ name: "", bandwidth: 10, cost: 1});

    this.stepper.selectedIndex = this.newSteps.length - 1;    
  }

  changeStep(i: number){

    this.newSteps[i].name = this.form_group_list[i].value.name;
    this.newSteps[i].bandwidth = this.form_group_list[i].value.bandwidth;
    
  }

  onRemoveAll() {
    this.newSteps = [];
    this.newSteps.push({ name: "Source", bandwidth:10, cost: 1 });

    this.form_group_list = [];
    this.form_group_list.push(this.create_form({name: "Source", bandwidth:10, cost: 1 }));
  }

  removeStep(i: number){
    this.newSteps.splice(i,1);
    this.form_group_list.splice(i, 1);
  }

  cancel_update(){
    this.router.navigate(['/home']);
  }

  onSubmit(){
    if(this.newSteps.length == 1){
      alert("Please, select at least one VNF!");
    }
    else if (this.sfc_request.source == "-1"){
      alert("Please, select a source node in the map!");
    }
    else if (this.sfc_request.destination == "-1"){
      alert("Please, select a destination node in the map!");
    }
    else{
      for(let i=0; i < this.newSteps.length; i++){
        
        if (i < this.newSteps.length-1){
          this.sfc_request.flow_entries.push({
            source: this.newSteps[i].name,
            destination: this.newSteps[i+1].name,
            resources: {bandwidth: this.newSteps[i].bandwidth, cost: 1}
          })
        }

        for (let j=0; j < this.vnf_list.length; j++){
          if(this.newSteps[i].name == this.vnf_list[j].name){
            this.sfc_request.VNFs.push(this.vnf_list[j]);
            break            
          }
        }        
      }
    }

    console.log(this.sfc_request);

  }

  getBounds(markers: any){
    let north;
    let south;
    let east;
    let west;
  
    for (const marker of markers){
      // set the coordinates to marker's lat and lng on the first run.
      // if the coordinates exist, get max or min depends on the coordinates.
      north = north !== undefined ? Math.max(north, marker.position.lat) : marker.position.lat;
      south = south !== undefined ? Math.min(south, marker.position.lat) : marker.position.lat;
      east = east !== undefined ? Math.max(east, marker.position.lng) : marker.position.lng;
      west = west !== undefined ? Math.min(west, marker.position.lng) : marker.position.lng;
    };
  
    const bounds = { north, south, east, west };
  
    return bounds;
  }

  clickMarker(marker: any) {
    
    if (this.sfc_request.source == "-1"){ // if the source is not defined
      this.sfc_request.source = ""+marker.id;
      this.source_button_text = "source node: "+marker.name;
      this.show_source_button = true;
    }

    else if (this.sfc_request.destination == "-1"){ // if destination is not defined
      this.sfc_request.destination = ""+marker.id;
      this.destination_button_text = "destination node: "+marker.name;
      this.show_destination_button = true;
    }

    else{ // if source and destination are defined
      
      const dialogRef = this.dialog.open(ReplaceNodeDialogComponent, {
        disableClose: false,
        width: "350px",
        data: marker,
      });

      dialogRef.afterClosed().subscribe((result) => {

        if (result == "source"){
          this.sfc_request.source = ""+marker.id;
          this.source_button_text = "source node: "+marker.name;
        }
        else{
          this.sfc_request.destination = marker.id;
          this.destination_button_text = "destination node: "+marker.name;
        }        
      });

    }
  }

  remove_source_node(){
    this.sfc_request.destination = "-1";
    this.show_source_button = false;
  }

  remove_destination_node(){
    this.sfc_request.destination = "-1";
    this.show_destination_button = false;
  }

}

class Step{
  name: string;
  bandwidth: number;
  cost: number;
}

export class Mark{
  position: { lat: number, lng: number} ;
  name: string;
  id: number;
  label: {color: string}
}