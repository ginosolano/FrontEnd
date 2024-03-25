import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogContent, MatDialogActions, MatDialogClose, MatDialogTitle } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatGridTile, MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';


import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import moment from 'moment';

import { Cliente } from '../../Interfaces/cliente';
import { ClienteService } from '../../Services/cliente.service';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export const MY_DATE_FORMATS = {
  parse:{
    dateInput: 'DD-MM-YYYY',
  },
  display:{
    dateInput:'DD-MM-YYYY',
    monthYearLabel:'MMMM YYYY',
    dateA11yLabel:'LL',
    monthYearA11yLabel:'MMMM YYYY'
  }
}

@Component({
  selector: 'app-dialog-add-edit',
  standalone: true,
  imports: [MatDialogContent,
            MatDialogActions,
            MatDialogTitle,
            MatButtonModule,
            ReactiveFormsModule,
            MatGridTile,
            MatGridListModule,
            MatFormFieldModule,
            MatInputModule,
            MatDatepickerModule,
            MatDialogClose
            ],
  templateUrl: './dialog-add-edit.component.html',
  styleUrl: './dialog-add-edit.component.css',
  providers: [
    {provide: MAT_DATE_FORMATS,useValue:MY_DATE_FORMATS}
  ]
})
export class DialogAddEditComponent {
  formCliente: FormGroup;
  tituloAccion:string="Nuevo";
  botonAccion: string="Guardar";


  constructor(
    private dialogReferencia: MatDialogRef<DialogAddEditComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) public dataCliente: Cliente

  ){
    this.formCliente = this.fb.group({
      nombres: ['',Validators.required],
      apellidos: ['',Validators.required],
      fechaNacimiento: [''],
      cuit: ['',Validators.required],
      domicilio: [''],
      telefonoCelular:['',Validators.required],
      email:['',Validators.required]
    })

  }

  mostrarAlerta(message: string, action: string) {
    this._snackBar.open(message, action,{
      horizontalPosition:"end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  addEditCliente(){
    
    console.log(this.formCliente.value)

    const modelo:Cliente={
      id:0,
      nombres:this.formCliente.value.nombres,
      apellidos:this.formCliente.value.apellidos,
      fechaDeNacimiento:moment(this.formCliente.value.fechaNacimiento,'DD-MM-YYYY').toString(),
      cuit:this.formCliente.value.cuit,
      domicilio:this.formCliente.value.domicilio,
      telefonoCelular:this.formCliente.value.telefonoCelular,
      email:this.formCliente.value.email
    }

    if(this.dataCliente == null){

    this._clienteService.add(modelo).subscribe({
      next:(data) =>{
        this.mostrarAlerta("Cliente fue creado","Listo");
        this.dialogReferencia.close("creado")
      }, error:(e)=>{
        this.mostrarAlerta("Cliente no se pudo crear","Error");
      }
    })
    }else
    {
      this._clienteService.update(this.dataCliente.id,modelo).subscribe({
        next:(data) =>{
          this.mostrarAlerta("Cliente fue editado","Listo");
          this.dialogReferencia.close("editado")
        }, error:(e)=>{
          this.mostrarAlerta("Cliente no se pudo actualizar","Error");
        }
      })
    }
  }
  ngOnInit():void{

    if(this.dataCliente){
      this.formCliente.patchValue({
        nombres:this.dataCliente.nombres,
        apellidos:this.dataCliente.apellidos,
        fechaDeNacimiento: moment(this.dataCliente.fechaDeNacimiento,'DD-MM-YYYY').toString(),
        cuit:this.dataCliente.cuit,
        domicilio:this.dataCliente.domicilio,
        telefonoCelular:this.dataCliente.telefonoCelular,
        email:this.dataCliente.email
      })

      this.tituloAccion="Editar";
      this.botonAccion="Actualizar";
    }

  }
}
