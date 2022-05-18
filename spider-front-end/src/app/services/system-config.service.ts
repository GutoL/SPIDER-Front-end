import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SystemConfigService {

  server_ip: string = "http://192.168.0.209";
  server_port: number = 3500;

  constructor() {
    // this.server_ip = "http://192.168.0.209"; // "http://localhost";
    // this.server_port = 3500; // 3000;
  }

  set_server_ip(ip: string){
    this.server_ip = ip;
  }

  set_server_port(port: number){
    this.server_port = port;
  }

  get_server_ip(){
    return this.server_ip;
  }

  get_server_port(){
    return this.server_port
  }

}
