import { Component, OnInit } from '@angular/core';
import { ClientService } from "../../services/client.service";
import { Client } from "../../models/Client";
import { NavbarService } from '../../navbar.service'
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  totalOwed: number;

  constructor(private clientService: ClientService, breakpointObserver: BreakpointObserver, nav: NavbarService) {
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
       nav.hide();
       console.log("hide");
      }
      else{
        console.log("show");
        nav.show();
      }
    });
   }

  ngOnInit() {
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
      this.getTotalOwed();
      console.log(this.clients);
    });
  }
  getTotalOwed(){
    this.totalOwed = this.clients.reduce( (total, client) => {
      return total + client.balance;
    }, 0);
  }

}
