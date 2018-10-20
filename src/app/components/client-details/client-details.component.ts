import { Component, OnInit } from '@angular/core';
import { ClientService } from "../../services/client.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Client } from "../../models/Client";

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  
  id: string;
  client: Client;
  hasBalance: boolean = false;
  shoBalanceUpdateInput: boolean = false;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get id from URL
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
      console.log(this.client);
    });
  }

}
