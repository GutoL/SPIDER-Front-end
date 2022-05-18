import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { SystemConfigService } from '../services/system-config.service';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError} from 'rxjs';
import { Infrastructure } from '../models/infrastructure';
import { Mark } from '../components/sfc-screen/sfc-screen.component';

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

  // marker_LA = { position: { lat: 34.04633676302544, lng: -118.29779261974802 }, 
  //               name: "Los Angeles", 
  //               id: 1,
  //               label: {color: 'red'} 
  //             };
  // marker_recife = { position: { lat: -8.052348087207431, lng: -34.88293029716518 }, 
  //                   name: "Recife", id: 2, 
  //                 label: {color: 'red'} 
  //               };

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  
  infrastructure: Infrastructure;
  server_url : string;
  
  load_infrastructure(name: string){
    // this.get_infrastructure_by_id(id).subscribe((infrastructure: Infrastructure) => {
    //   this.infrastructure = infrastructure;
    // });
    this.get_infrastructure_by_name(name).subscribe((infrastructure: Infrastructure) => {
      this.infrastructure = infrastructure;
    });    
  }

  constructor(private httpClient: HttpClient, private config: SystemConfigService) {
    this.server_url = this.config.server_ip+":"+this.config.server_port+"/infra";
  }

  get_all_infrastructures(): Observable<Infrastructure[]>{
    return this.httpClient.get<Infrastructure[]>(this.server_url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // get_infrastructure_by_id(id: number): Observable<Infrastructure>{
  //   return this.httpClient.get<Infrastructure>(this.server_url + '/' + id)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError)
  //     )
  // }

  get_infrastructure_from_monitor(): Observable<Infrastructure>{
    return this.httpClient.get<Infrastructure>(this.server_url + '_monitor')
      .pipe(
        // retry(2),
        catchError(this.handleError)
      )
  }

  
  get_infrastructure_by_name(name: string): Observable<Infrastructure>{
    return this.httpClient.get<Infrastructure>(this.server_url + '/' + name)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // An error occured at the client side
      errorMessage = error.error.message;
    } else {
      // An error occured at the server side
      errorMessage = `Error code: ${error.status}, ` + `message: ${error.message}`;
    }
    console.log('ERROR:',errorMessage);
    return throwError(errorMessage);
  }  
}
