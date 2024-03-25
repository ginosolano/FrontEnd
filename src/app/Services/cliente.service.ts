import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Cliente } from '../Interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private http = inject(HttpClient);

  constructor() { }

  getClients(){
    return this.http.get<Cliente[]>('http://localhost:5048/cliente/getall');
  }

  getClientById(){
    return this.http.get<Cliente>('http://localhost:5048/cliente/getbyid');
  }

  getSearch(){
    return this.http.get<Cliente[]>('http://localhost:5048/cliente/search');
  }

  add(modelo:Cliente){
    return this.http.post<Cliente>('http://localhost:5048/cliente/create',modelo);
  }

  update(id:number,modelo:Cliente){
    return this.http.put<Cliente>(`http://localhost:5048/cliente/update/${id}`,modelo);
  }

  delete(id:number){
    return this.http.delete<void>(`http://localhost:5048/cliente/delete/${id}`);
  }
}
