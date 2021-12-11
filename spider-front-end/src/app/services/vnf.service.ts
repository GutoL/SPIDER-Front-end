import { Injectable } from '@angular/core';
import { Vnf } from '../models/vnf';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError} from 'rxjs';
import { Config } from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class VnfService {
  
  vnf_to_update: Vnf;
  server_url: string;

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  
  constructor(private httpClient: HttpClient) { 

    this.server_url = Config.server_ip+":"+Config.server_port+"/vnf";
    this.reset_vnf();

  }

  get_vnfs(): Observable<Vnf[]>{
    return this.httpClient.get<Vnf[]>(this.server_url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  get_vnf_by_id(id: number): Observable<Vnf> {
    return this.httpClient.get<Vnf>(this.server_url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  create_vnf(vnf: Vnf): Observable<Vnf> {
    return this.httpClient.post<Vnf>(this.server_url, JSON.stringify(vnf), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  update_vnf(vnf: Vnf): Observable<Vnf> {
    return this.httpClient.put<Vnf>(this.server_url + '/' + vnf.id, JSON.stringify(vnf), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  delete_vnf(vnf: Vnf) {
    return this.httpClient.delete<Vnf>(this.server_url + '/' + vnf.id, this.httpOptions)
      .pipe(
        retry(1),
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

  reset_vnf(){
    this.vnf_to_update ={
        "name": "",
        "id": "",
        "cpu": 0,
        "memory": 0,
        "storage": 0,
        "mttf": 0,
        "mttr": 0,
        "availability": 0,
        "path_to_files": ""
    };
  }
}
