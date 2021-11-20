import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Vnf } from 'src/app/models/vnf';
import { VnfService } from 'src/app/services/vnf.service';
import { Router } from '@angular/router';
import { GoogleMap } from '@angular/google-maps';


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
  // @ViewChild(GoogleMap) map: GoogleMap;
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;

  form_group_list: FormGroup[] = [];

  isLinear = false;
  formGroup: FormGroup;
  form: FormArray;
  @ViewChild('stepper') stepper: any;

  vnf_list: Vnf[];
  
  newSteps: Step[] = [];

  // maps tutorial: https://medium.com/swlh/angular-google-map-component-basics-and-tips-7ff679e383ff
  // https://timdeschryver.dev/blog/google-maps-as-an-angular-component#googlemap

  mapOptions: google.maps.MapOptions = {
      zoom : 14,
      disableDefaultUI: true,
  }

  marker_london = { position: { lat: 51.523181508616624, lng: -0.12909595901958482 } };
  marker_LA = { position: { lat: 34.04633676302544, lng: -118.29779261974802 } };
  marker_recife = { position: { lat: -8.052348087207431, lng: -34.88293029716518 } };


  markers = [this.marker_london, this.marker_LA, this.marker_recife];
  
  polylineOptions = {
    path: Array(),
    strokeColor: '#32a1d0',
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

    // this.newSteps[i].name = this.form_group_list[i].value.name;
    
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

}