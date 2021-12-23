import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Vnf } from 'src/app/models/vnf';
import { VnfService } from 'src/app/services/vnf.service';
import { Router } from '@angular/router';
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
    
  // @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  isEditable: boolean = true;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  isLinear = false;
  formGroup: FormGroup;
  form: FormArray;

  sfc_request: SfcRequest = {id: 0, name: "Teste", VNFs: [], destination: "",
                             source: "",flow_entries:[], 
                             requirements:{availability:0.99}};

  vnf_list: Vnf[] = [];
  newSteps: Step[] = [];

  infrastructure: Infrastructure;

  constructor(private vnf_service: VnfService, private router: Router, public dialog: MatDialog,
              private infrastructure_service: InfrastructureService,
              private sfc_request_service: SfcRequestService,
              private _formBuilder: FormBuilder) {}

  ngOnInit(): void {

    this.firstFormGroup = this._formBuilder.group({
      sfc_name_ctrl: ['My SFC', Validators.required],
      sfc_av_ctrl: [0.99, Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({});
    this.thirdFormGroup = this._formBuilder.group({});

    this.sfc_request.source = "";
    this.sfc_request.destination = "";

    this.get_vnfs();
  
  }

  ngAfterViewInit(){

  }


  cancel_update(){
    this.router.navigate(['/home']);
  }

  update_nodes_names(names: string[]){
    this.sfc_request.source = names[0];
    this.sfc_request.destination = names[1];
  }

  onSubmit(){

    this.sfc_request.name = this.firstFormGroup.value.sfc_name_ctrl;
    this.sfc_request.requirements.availability = this.firstFormGroup.value.sfc_av_ctrl;

    if(this.newSteps.length == 1){
      alert("Please, select at least one VNF!");
    }
    else if (this.sfc_request.source == ""){
      alert("Please, select a source node in the map!");
    }
    else if (this.sfc_request.destination == ""){
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

      // console.log(this.sfc_request);
      this.sfc_request_service.create_sfc_resquest(this.sfc_request).subscribe((sfc_request: SfcRequest) => {
        this.router.navigate(['/home']);
      });  
      }    
  }

  get_vnfs(){
    this.vnf_service.get_vnfs().subscribe((vnfs: Vnf[]) => {
      vnfs.forEach(vnf => {
        console.log(vnf);
        vnf.id = vnf['id'];
        this.vnf_list.push(vnf);
      });       
    });
  }

}

export class Mark{
  position: { lat: number, lng: number} ;
  name: string;
  id: number;
  label: {color: string}
}
