import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MensajeService {
  constructor(private _snackBar: MatSnackBar) {}
  mensaje(mensaje: string, error: boolean) {
    
    let mensajeString = !error
      ? `Producto ${mensaje} con éxito`
      : `Ocurrio un error: ${mensaje}`;

    this._snackBar.open(mensajeString, '', {
      duration: 5 * 1000,
      verticalPosition: 'bottom',
    });
  }
}
