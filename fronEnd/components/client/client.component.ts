import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model'; 
import { ClientService } from 'src/app/services/client.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients: Client[] = [];

  selectedClient: Client = new Client();

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.getClients()
  }

  resetForm(form: NgForm) {
    if(form) {
      form.reset()
    }
  }

  addClient(form: NgForm) {
    if(form.value._id) {
      this.clientService.patchClient(form.value)
      .subscribe( res => {
        this.resetForm(form)
        this.getClients()  
      })     
    } else {
      this.clientService.postClient(form.value)
      .subscribe( res => {
      this.resetForm(form)
      this.getClients()
      })
    } 
  }

  getClients() {
    this.clientService.getClients()
    .subscribe( res => {
      this.clients = res as Client[]
    })
  }

  editClient(client: Client) {
    this.selectedClient = client
  }
  
  deleteClient(client: Client) {
    if(confirm('Realmente quiere borrar?')) {
      this.clientService.deleteClient(client)
      .subscribe( res => {
      this.getClients()
    })
    }
  }

}
