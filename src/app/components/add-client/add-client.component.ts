import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService} from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { Client } from "../../models/Client";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    balance: 0,
    email: '',
    phone: ''
  };
  disableBalanceOnAdd : boolean = true;
  @ViewChild('clientForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onSubmit({value, valid}: {value: Client, valid: boolean}){
    console.log(value, valid);
    if(this.disableBalanceOnAdd){
      value.balance = 0;
    }
    if(!valid){
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
      //show error
    }
    else{
      // add new client
      this.clientService.newClient(value);
      // show msg
      this.flashMessage.show('New client added', {
        cssClass: 'alert-success', timeout: 4000
      });
      // REdirect to 
      this.router.navigate(['/']);
    }
  }

}
