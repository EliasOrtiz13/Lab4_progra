import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/operators';

import { Client } from '../models/client.model'; 

@Injectable({
  providedIn: 'root'
})
export class ClientService {
readonly URL_API = 'http://localhost:5000/clients';

  constructor(private http: HttpClient) { }

  postClient(data : Client) {
    return this.http.post(this.URL_API, data)
  }

  getClients() {
    return this.http.get(this.URL_API)
  }

  patchClient(data: Client) {
    return this.http.patch(this.URL_API + `/${data._id}`, data)
  }

  deleteClient(data: Client) {
    return this.http.delete(this.URL_API + `/${data._id}`)
  }
}
