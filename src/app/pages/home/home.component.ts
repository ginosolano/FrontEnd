import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';

import { DialogAddEditComponent } from '../dialog-add-edit/dialog-add-edit.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

import { Cliente } from '../../Interfaces/cliente';
import { ClienteService } from '../../Services/cliente.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatPaginatorModule, 
            MatTableModule,
            MatFormFieldModule,
            MatInputModule,
            FormsModule,
            MatIcon,
            MatDividerModule,
            MatButtonModule
          ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['Nombres', 'Apellidos', 'FechaNacimiento', 'CUIT', 'Domicilio', 'Celular', 'Email', 'Acciones'];
  dataSource = new MatTableDataSource<Cliente>();

  constructor(
    private _clienteService: ClienteService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar 
  ){

  }

  ngOnInit(): void {
      this.mostrarClientes()
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarClientes(){
    this._clienteService.getClients().subscribe({
      next:(dataResponse) => {
        console.log(dataResponse)
        this.dataSource.data = dataResponse;
      }, error:(e) =>{}
    });
  }

  dialogoNuevoCliente() {
   this.dialog.open(DialogAddEditComponent,{
    disableClose:true,
    width:"550px",
   }).afterClosed().subscribe(resultado=>{
    if (resultado === "creado"){
    this.mostrarClientes();
    }
   })
  }

  dialogoEditarCliente(dataCliente: Cliente){
    this.dialog.open(DialogAddEditComponent,{
      disableClose:true,
      width:"550px",
      data:dataCliente
     }).afterClosed().subscribe(resultado=>{
      if (resultado === "editado"){
      this.mostrarClientes();
      }
     })
  }

  mostrarAlerta(message: string, action: string) {
    this._snackBar.open(message, action,{
      horizontalPosition:"end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  dialogoEliminarCliente(dataCliente: Cliente){
    this.dialog.open(DialogDeleteComponent,{
      disableClose:true,
      data:dataCliente
     }).afterClosed().subscribe(resultado=>{
      if (resultado === "eliminar"){
        this._clienteService.delete(dataCliente.id).subscribe({
          next:(data) =>{
          this.mostrarAlerta("Cliente fue eliminado","Listo");
          this.mostrarClientes();
        }, error:(e)=> {console.log(e)}
      })
      }
     })
  }
}




