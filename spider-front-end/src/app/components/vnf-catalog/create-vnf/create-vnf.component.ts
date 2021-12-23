import { Component, OnInit } from '@angular/core';
import { Vnf, VnfFlavour } from 'src/app/models/vnf';
import { VnfService } from 'src/app/services/vnf.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

// https://zoaibkhan.com/blog/create-a-responsive-card-grid-in-angular-using-flex-layout-part-1/

@Component({
  selector: 'app-create-vnf',
  templateUrl: './create-vnf.component.html',
  styleUrls: ['./create-vnf.component.css']
})
export class CreateVnfComponent implements OnInit {

  formVNF: FormGroup;
  create_button_text: string;
  create_vnf: boolean = true;
  vnf_to_update: Vnf;
  title_text: string;
  flavour_selected: string;

  cpu_list: number[] = [1,2,4];
  memory_list: number[] = [2,4,8];
  storage_list: number[] = [10, 20, 30];

  flavours: VnfFlavour[] = [
    {name:"small",cpu: 1,memory: 2,storage: 10,mttf: 100,mttr: 10,availability: 0.99},
    {name:"medium",cpu: 2,memory: 4,storage: 20,mttf: 100,mttr: 10,availability: 0.99},
    {name:"large",cpu: 4,memory: 8,storage: 30,mttf: 100,mttr: 10,availability: 0.99},
  ];

  constructor(private router: Router, private vnf_service: VnfService) { }

  ngOnInit(): void {
    
    this.vnf_to_update = this.vnf_service.vnf_to_update;

    this.create_form(this.vnf_to_update);
    
    if (this.vnf_to_update.name.length > 0){
      this.create_button_text = 'update';
      this.title_text = "Update VNF";
      this.create_vnf = false;
    }
    else{
      this.create_button_text = 'create';
      this.title_text = "New VNF";
      this.create_vnf = true;
    }
    
  }

  create_form(vnf: Vnf){
    this.formVNF = new FormGroup({
      name: new FormControl(vnf.name),
      cpu: new FormControl(vnf.resources.cpu),
      memory: new FormControl(vnf.resources.memory),
      storage: new FormControl(vnf.resources.storage),
      mttf: new FormControl(vnf.mttf),
      mttr: new FormControl(vnf.mttr),
      availability: new FormControl(vnf.availability),
      path_to_files: new FormControl(vnf.path_to_files)
    });
  }

  cancel_update(){
    this.router.navigate(['/vnf_catalog']);
  }

  onChange() {
    for(let i in this.flavours){
      if(this.flavours[i].name == this.flavour_selected){
        let vnf: Vnf = {
                  "id": "0",
                  "name":this.formVNF.value.name,
                  "resources": {  
                    "cpu":this.flavours[i].cpu,
                    "memory":this.flavours[i].memory,
                    "storage":this.flavours[i].storage
                  },
                  "mttf":this.flavours[i].mttf,
                  "mttr":this.flavours[i].mttr,
                  "availability":this.flavours[i].availability,
                  "path_to_files": this.formVNF.value.path_to_files
                  }
        this.create_form(vnf);
        // this.formVNF.value.cpu = this.flavours[i].cpu;
        // this.formVNF.value.memory = this.flavours[i].memory;
        // this.formVNF.value.storage = this.flavours[i].storage;
        // this.formVNF.value.mttf = this.flavours[i].mttf;
        // this.formVNF.value.mttr = this.flavours[i].mttr;
        // this.formVNF.value.availability = this.flavours[i].availability;
        break;
      }
    }
  }

  onSubmit(){
    
    this.vnf_to_update.name = this.formVNF.value.name;
    this.vnf_to_update.resources.cpu = this.formVNF.value.cpu;
    this.vnf_to_update.resources.memory = this.formVNF.value.memory;
    this.vnf_to_update.resources.storage = this.formVNF.value.storage;
    this.vnf_to_update.mttf = this.formVNF.value.mttf;
    this.vnf_to_update.mttr = this.formVNF.value.mttr;
    this.vnf_to_update.availability = this.formVNF.value.availability;
    this.vnf_to_update.path_to_files = this.formVNF.value.path_to_files;
    
    console.log('test');

    if(this.create_vnf == true){
      this.vnf_service.create_vnf(this.vnf_to_update).subscribe((vnf: Vnf) => {
        
      });      
    }
    else{
      this.vnf_service.update_vnf(this.vnf_to_update).subscribe((vnf: Vnf) => {
        
      }); 
      // this.vnfService.update_vnf(this.vnf_to_update);
    }    
    
    this.router.navigate(['/vnf_catalog']);
  }

}
