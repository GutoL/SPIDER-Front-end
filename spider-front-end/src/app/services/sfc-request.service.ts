import { Injectable } from '@angular/core';
import { Observable, of, throwError} from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Config } from '../models/config';
import { SfcRequest } from '../models/sfc-request';

@Injectable({
  providedIn: 'root'
})
export class SfcRequestService {

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  
  server_url: string;

  constructor(private httpClient: HttpClient) {
    this.server_url = Config.server_ip+":"+Config.server_port+"/sfc_request";
  }

  get_sfc_resquests(): Observable<SfcRequest[]>{
    return this.httpClient.get<SfcRequest[]>(this.server_url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  get_sfc_resquests_by_id(id: number): Observable<SfcRequest> {
    return this.httpClient.get<SfcRequest>(this.server_url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  create_sfc_resquest(sfc_request: SfcRequest): Observable<SfcRequest> {
    // console.log('sfc_request',sfc_request);
    // console.log('server url:',this.server_url);
    return this.httpClient.post<SfcRequest>(this.server_url, JSON.stringify(sfc_request), this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError)
      )
  }

  update_sfc_resquest(sfc_request: SfcRequest): Observable<SfcRequest> {
    return this.httpClient.put<SfcRequest>(this.server_url + '/' + sfc_request._id, JSON.stringify(sfc_request), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  delete_sfc_resquest(sfc_request: SfcRequest){

    return this.httpClient.delete<SfcRequest>(this.server_url+'/'+sfc_request.name, this.httpOptions)
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

}
