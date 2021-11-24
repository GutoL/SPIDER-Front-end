import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfrastructureService {

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

  constructor() { }

  get_nodes_makers(){
    return [this.marker_london, this.marker_LA, this.marker_recife];
  }

  get_links_markers(){
    return [
            this.marker_london.position,
            this.marker_LA.position,
            this.marker_recife.position,
            this.marker_london.position
          ]
  }
}
