import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogContent, MatDialogActions, MatDialogClose, MatDialogTitle } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { Cliente } from '../../Interfaces/cliente';

@Component({
  selector: 'app-dialog-delete',
  standalone: true,
  imports: [MatDialogActions,
            MatButtonModule,
            MatDialogContent,
            MatDialogClose,
            MatDialogTitle
            ],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.css'
})
export class DialogDeleteComponent {

  constructor(
    private dialogReferencia: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataCliente: Cliente
  ){

  }

  ngOnInit(): void {
    
  }

  confirmarDelete(){
    if(this.dataCliente){
      this.dialogReferencia.close("eliminar")
    }
  }
}
