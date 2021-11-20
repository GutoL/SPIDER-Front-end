import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Vnf } from 'src/app/models/vnf';
import { VnfService } from 'src/app/services/vnf.service';
import { Router } from '@angular/router';


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

  form_group_list: FormGroup[] = [];

  isLinear = false;
  formGroup: FormGroup;
  form: FormArray;
  @ViewChild('stepper') stepper: any;

  vnf_list: Vnf[];
  
  newSteps: Step[] = [];
  
  constructor(private vnf_service: VnfService, private router: Router) {
     
  }


  ngOnInit() {
    this.get_vnfs();

    let source = {name: "Source", bandwidth:10 }
    
    this.newSteps.push(source);
    this.form_group_list.push(this.create_form(source));
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

}