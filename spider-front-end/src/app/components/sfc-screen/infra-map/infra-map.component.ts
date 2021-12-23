import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Infrastructure } from 'src/app/models/infrastructure';
import { InfrastructureService } from 'src/app/services/infrastructure.service';

declare const getInfrastructureMapToSelect:any;
// declare const getInfrastructureMapToView:any;

@Component({
  selector: 'app-infra-map',
  templateUrl: './infra-map.component.html',
  styleUrls: ['./infra-map.component.css']
})
export class InfraMapComponent implements OnInit {
  // https://github.com/themustafaomar/jsvectormap 

  infrastructure: Infrastructure;
  nodes: {}[] = [];
  links: {}[] = [];

  source_name: string = "";
  destination_name: string = "";

  infra_name: string = "my_infra";
  @Output() change_nodes_name_event = new EventEmitter<string[]>();

  constructor(private infrastructure_service: InfrastructureService) { }

  ngOnInit(): void {

    let src_node: string;
    let dst_node: string;
    
    // this.infrastructure_service.get_infrastructure_by_name(this.infra_name).subscribe((infrastructure: Infrastructure) => {
    this.infrastructure_service.get_infrastructure_from_monitor().subscribe((infrastructure: Infrastructure) => {
      console.log(infrastructure)
      this.infrastructure = infrastructure;

      for (let i=0; i < this.infrastructure.nodes.length; i++){
        this.nodes.push(
          {
            "name": this.infrastructure.nodes[i].name,
            "coords": [
              this.infrastructure.nodes[i].latitude,
              this.infrastructure.nodes[i].longitude
            ],
            "labelName": this.infrastructure.nodes[i].name,
            "style": {}
          }
        );
      }

      for (let i=0; i < this.infrastructure.links.length; i++){

        for (let j=0; j < this.infrastructure.nodes.length; j++){
          if (this.infrastructure.links[i].src_node == this.infrastructure.nodes[j]._id){
            src_node = this.infrastructure.nodes[j].name;
            break;
          }
        }
        
        for (let j=0; j < this.infrastructure.nodes.length; j++){
          if (this.infrastructure.links[i].dst_node == this.infrastructure.nodes[j]._id){
            dst_node = this.infrastructure.nodes[j].name;
            break;
          }
        }

        this.links.push(
          {
            "from": src_node,
            "to": dst_node,
            "style": {
              "stroke": "black",
              "strokeWidth": 1
            }
          }
        );
      }
      let map_name = "world_merc";
      getInfrastructureMapToSelect(this.nodes, this.links, map_name);      
    });
    
  }

  change_nodes_name(){
    this.source_name = ""+document.getElementById("badgeSource")?.innerText;
    this.destination_name = ""+document.getElementById("badgeTarget")?.innerText;

    this.change_nodes_name_event.emit([this.source_name,this.destination_name]);
  }

}
