import { Injectable } from '@angular/core';
// import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
// import { Observable } from "rxjs";
// import { map } from 'rxjs/operators';
// import {Client} from "../models/Client";

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
  } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
// import 'rxjs/add/operator/map';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) { 
    this.clientsCollection =this.afs.collection('clients', ref => ref.orderBy('lastName', 'asc'));
    console.log(this.clientsCollection);

  }
  getClients = (): Observable<Client[]> => {
    this.clients = this.clientsCollection.snapshotChanges().pipe(
     map(changes => {
       return changes.map(
         action => {
      // map(actions => actions.map(a => {
           const data = action.payload.doc.data() as Client;
           data.id = action.payload.doc.id;
           return data;
         }
      //  )
      )}
     )
    );
     return this.clients;
   }
   newClient(client: Client){
     this.clientsCollection.add(client);
   }
   getClient (id: string): Observable<Client>{
    this.clientDoc =  this.afs.doc<Client>(`client/${id}`);
    console.log("Client doc ",this.clientDoc);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map(
          action => {
            if(action.payload.exists === false){
              return null;
            }
             else{
               const data = action.payload.data() as Client;
               data.id = action.payload.id;
               return data;
             }
          }
    ));
    return this.client;
   }
}
