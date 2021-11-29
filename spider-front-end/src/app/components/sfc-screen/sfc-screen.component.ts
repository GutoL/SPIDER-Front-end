import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Vnf } from 'src/app/models/vnf';
import { VnfService } from 'src/app/services/vnf.service';
import { Router } from '@angular/router';
import { GoogleMap } from '@angular/google-maps';
import { MapInfoWindow} from '@angular/google-maps';
import {MatDialog} from '@angular/material/dialog';
import {ReplaceNodeDialogComponent} from 'src/app/components/sfc-screen/replace-node-dialog/replace-node-dialog.component';
import { InfrastructureService} from "src/app/services/infrastructure.service";
import { SfcRequest } from 'src/app/models/sfc-request';
import {SfcRequestService} from 'src/app/services/sfc-request.service';
import { Infrastructure } from 'src/app/models/infrastructure';
import { Step } from './add-vnfs-stepper/add-vnfs-stepper.component';

@Component({
  selector: 'app-sfc-screen',
  templateUrl: './sfc-screen.component.html',
  styleUrls: ['./sfc-screen.component.css']
})
export class SfcScreenComponent implements OnInit {

  // maps tutorial: https://medium.com/swlh/angular-google-map-component-basics-and-tips-7ff679e383ff
  // https://timdeschryver.dev/blog/google-maps-as-an-angular-component#googlemap
    
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  // @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  isEditable: boolean = true;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  isLinear = false;
  formGroup: FormGroup;
  form: FormArray;

  sfc_request: SfcRequest = {id: 0, name: "", VNFs: [], destination: "-1",
                             source: "-1",flow_entries:[], 
                             requirements:{availability:0.99}};

  vnf_list: Vnf[] = [];
  newSteps: Step[] = [];

  show_map: boolean = false;

  show_source_button = false;
  source_button_text: string;
  
  show_destination_button = false;
  destination_button_text: string;

  infrastructure: Infrastructure;

  mapOptions: google.maps.MapOptions = {
      zoom : 10,
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
              private infrastructure_service: InfrastructureService,
              private sfc_request_service: SfcRequestService,
              private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      sfc_name_ctrl: ['', Validators.required],
      sfc_av_ctrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({});
    this.thirdFormGroup = this._formBuilder.group({});

    this.sfc_request.source = "-1";
    this.sfc_request.destination = "-1";

    this.get_vnfs();

    this.infrastructure_service.get_infrastructure_by_id(0).subscribe((infrastructure: Infrastructure) => {
      this.infrastructure = infrastructure;
      // this.define_lines_map();
    });    
  }

  define_points_on_map(){
    for(let i=0; i < this.infrastructure.nodes.length; i++){

      this.markers.push(
        {
          "position": { lat: +this.infrastructure.nodes[i].latitude, lng: +this.infrastructure.nodes[i].longitude}, 
          "name":this.infrastructure.nodes[i].name, 
          "id": +this.infrastructure.nodes[i]._id, // cast to number
          "label": {color: 'blue'}
        }
      )
    }

    const bounds = this.getBounds(this.markers);
    this.map.fitBounds(bounds);
  }

  define_lines_map(){
    let links:{lat: number, lng:number}[] = [];

    for(let i=0; i < this.infrastructure.links.length; i++){
      for(let j=0; j < this.infrastructure.nodes.length; j++){
        
        if (this.infrastructure.links[i].src_node == this.infrastructure.nodes[j]._id){

          links.push({
                      lat: +this.infrastructure.nodes[j].latitude,
                      lng: +this.infrastructure.nodes[j].longitude
                    })
          break;
        }

      }

      for(let j=0; j < this.infrastructure.nodes.length; j++){
        
        if (this.infrastructure.links[i].dst_node == this.infrastructure.nodes[j]._id){

          links.push({
                      lat: +this.infrastructure.nodes[j].latitude,
                      lng: +this.infrastructure.nodes[j].longitude
                    })
          break;
        }

      }  
    }

    console.log(links);
    for(let i in links){
      this.polylineOptions.path.push(links[i]);
    }

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

      this.sfc_request.flow_entries.push({
        source: this.newSteps[this.newSteps.length-1].name,
        destination: "destination",
        resources: {bandwidth: this.newSteps[this.newSteps.length-1].bandwidth, cost: 1}
      })

      console.log(this.sfc_request);
      // this.sfc_request_service.create_sfc_resquest(this.sfc_request).subscribe((sfc_request: SfcRequest) => {
      //   this.router.navigate(['/home']);
      // });  
      }    
  }

  get_vnfs(){
    this.vnf_service.get_vnfs().subscribe((vnfs: Vnf[]) => {
      this.vnf_list = vnfs;
    });
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
        else if (result == "destination"){
          this.sfc_request.destination = marker.id;
          this.destination_button_text = "destination node: "+marker.name;
        }        
      });

    }
  }

  remove_source_node(){
    this.sfc_request.source = "-1";
    this.show_source_button = false;
  }

  remove_destination_node(){
    this.sfc_request.destination = "-1";
    this.show_destination_button = false;
  }

  show_map_interface(){
    this.show_map = true;
    this.define_points_on_map();    
  }

}

export class Mark{
  position: { lat: number, lng: number} ;
  name: string;
  id: number;
  label: {color: string}
}