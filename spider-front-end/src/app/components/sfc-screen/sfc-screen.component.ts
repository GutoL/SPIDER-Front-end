import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Vnf } from 'src/app/models/vnf';
import { VnfService } from 'src/app/services/vnf.service';
import { Router } from '@angular/router';
import { GoogleMap } from '@angular/google-maps';
import { MapInfoWindow, MapMarker} from '@angular/google-maps';

class Step{
  name: string;
  bandwidth: number;
}


@Component({
  selector: 'app-sfc-screen',
  templateUrl: './sfc-screen.component.html',
  styleUrls: ['./sfc-screen.component.css']
})
export class SfcScreenComponent implements OnInit {
  
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow

  form_group_list: FormGroup[] = [];

  isLinear = false;
  formGroup: FormGroup;
  form: FormArray;
  @ViewChild('stepper') stepper: any;

  vnf_list: Vnf[];
  
  newSteps: Step[] = [];

  source_node: number = -1;
  show_source_button = false;
  source_button_text: string;
  
  destination_node: number = -1;
  show_destination_button = false;
  destination_button_text: string;

  // maps tutorial: https://medium.com/swlh/angular-google-map-component-basics-and-tips-7ff679e383ff
  // https://timdeschryver.dev/blog/google-maps-as-an-angular-component#googlemap

  mapOptions: google.maps.MapOptions = {
      zoom : 14,
      disableDefaultUI: true,
  }

  marker_london = { 
    position: { lat: 51.523181508616624, lng: -0.12909595901958482 }, 
    name:"London", 
    id: 0,
    label: {color: 'blue'} 
  };

  marker_LA = { position: { lat: 34.04633676302544, lng: -118.29779261974802 }, 
                name: "Los Angeles", 
                id: 1,
                label: {color: 'red'} 
              };
  marker_recife = { position: { lat: -8.052348087207431, lng: -34.88293029716518 }, 
                    name: "Recife", id: 2, 
                  label: {color: 'red'} 
                };


  markers = [this.marker_london, this.marker_LA, this.marker_recife];
  
  polylineOptions = {
    path: Array(),
    strokeColor: "#32a1d0",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  };

  constructor(private vnf_service: VnfService, private router: Router) {
     
  }

  ngAfterViewInit(){
    const bounds = this.getBounds(this.markers);
    this.map.fitBounds(bounds);
  }
  
  ngOnInit() {
    this.get_vnfs();

    let source = {name: "Source", bandwidth:10 }
    
    this.newSteps.push(source);
    this.form_group_list.push(this.create_form(source));

    this.polylineOptions.path.push(this.marker_LA.position);
    this.polylineOptions.path.push(this.marker_recife.position);
    this.polylineOptions.path.push(this.marker_london.position);
    this.polylineOptions.path.push(this.marker_LA.position);
  }

  create_form(step: Step){
    let formGroup = new FormGroup({
      name: new FormControl(step.name),
      bandwidth: new FormControl(step.bandwidth)
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

    this.form_group_list.push(this.create_form({name:"",bandwidth:10}));

    this.newSteps.push({ name: "", bandwidth: 10});

    this.stepper.selectedIndex = this.newSteps.length - 1;    
  }

  changeStep(i: number){

    console.log(i);
    console.log(this.form_group_list[i].value.name);
    console.log(this.form_group_list[i].value.bandwidth);
    
    // this.sfc.vnfs[i].bandwidth = this.form_group_list[i].value.bandwidth;

    this.newSteps[i].name = this.form_group_list[i].value.name;
    this.newSteps[i].bandwidth = this.form_group_list[i].value.bandwidth;
    
  }

  onRemoveAll() {
    this.newSteps = [];
    this.newSteps.push({ name: "Source", bandwidth:10 });

    this.form_group_list = [];
    this.form_group_list.push(this.create_form({name: "Source", bandwidth:10 }));
  }

  removeStep(i: number){
    this.newSteps.splice(i,1);
    this.form_group_list.splice(i, 1);
  }

  cancel_update(){
    this.router.navigate(['/home']);
  }

  onSubmit(){
    console.log(this.newSteps);
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
    console.log(marker);
    if (this.source_node == -1){ // if the source is not defined
      this.source_node = marker.id;
      this.source_button_text = "source node: "+marker.name;
      this.show_source_button = true;
    }
    else if (this.destination_node == -1){ // if destination is not defined
      this.destination_node = marker.id;
      this.destination_button_text = "destination node: "+marker.name;
      this.show_destination_button = true;
    }
    else{ // if source and destination are defined
      console.log(this.source_node, this.destination_node);
    }
  }

  remove_source_node(){
    this.source_node = -1;
    this.show_source_button = false;
  }

  remove_destination_node(){
    this.destination_node = -1;
    this.show_destination_button = false;
  }

}