import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Vnf } from 'src/app/models/vnf';
import { VnfService } from 'src/app/services/vnf.service';

@Component({
  selector: 'app-add-vnfs-stepper',
  templateUrl: './add-vnfs-stepper.component.html',
  styleUrls: ['./add-vnfs-stepper.component.css']
})
export class AddVnfsStepperComponent implements OnInit {

  @Input() vnf_list: Vnf[];  
  @Input() newSteps: Step[];

  form_group_list: FormGroup[] = [];

  @ViewChild('stepper_add_vnfs') stepper: any;
  
  constructor(private vnf_service: VnfService) { }

  ngOnInit(): void {
    let source = {name: "Source", bandwidth:10, cost: 1}
    
    this.newSteps.push(source);
    this.form_group_list.push(this.create_form(source));
  }

  
  addItem() {

    let temp_vnf = { name: "", bandwidth: 10, cost: 1};

    this.form_group_list.push(this.create_form(temp_vnf));
    this.newSteps.push(temp_vnf);

    // this.stepper.selectedIndex = this.newSteps.length;
  }

  changeStep(i: number){

    this.newSteps[i].name = this.form_group_list[i].value.name;
    this.newSteps[i].bandwidth = this.form_group_list[i].value.bandwidth;
    
  }

  onRemoveAll() {
    this.newSteps = [];
    this.newSteps.push({ name: "Source", bandwidth:10, cost: 1 });

    this.form_group_list = [];
    this.form_group_list.push(this.create_form({name: "Source", bandwidth:10, cost: 1}));
  }

  removeStep(i: number){
    this.newSteps.splice(i,1);
    this.form_group_list.splice(i, 1);
  }

  create_form(step: Step){
    let formGroup = new FormGroup({
      name: new FormControl(step.name),
      bandwidth: new FormControl(step.bandwidth),
      cost: new FormControl(step.cost)
    });
    return formGroup;
  }
  
}

export class Step{
  name: string;
  bandwidth: number;
  cost: number;
}
