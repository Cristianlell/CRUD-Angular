import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProducto } from 'src/app/interfaces/producto.interface';
import { MensajeService } from 'src/app/services/mensaje.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-agregar-editar',
  templateUrl: './agregar-editar.component.html',
  styleUrls: ['./agregar-editar.component.css']
})
export class AgregarEditarComponent implements OnInit {
  loading:boolean = false;
  form: FormGroup;
  paramsId:number = 0;
  title!:string;

  constructor( private _mensajeService:MensajeService, private formBuilder : FormBuilder, private route: ActivatedRoute, private _productService:ProductoService,private routerNav:Router) {
    this.paramsId = Number(route.snapshot.paramMap.get('id'));
    this.title = this.paramsId === 0 ? 'Agregar' : 'Editar';
    this.form = formBuilder.group({
      name:['',Validators.required],
      description:['',Validators.required],
      price:['',Validators.required],
      stock:['',Validators.required],
    })

    if (this.paramsId !== 0) {
      this.loading = true;
      this._productService.getProduct(this.paramsId).subscribe({
        next:(data) =>{
          this.loading = false;
          this.loading = false;
          this.form.setValue({
            name:data.body[0].name,
            description:data.body[0].description,
            price:data.body[0].price,
            stock:data.body[0].stock,
          })
        },
        error:(e) =>{
          this.loading = false;
          console.log(e);
          this._mensajeService.mensaje(e.statusText,true);
          this.routerNav.navigate(['/lista'])  
        },
        complete:()=>{
          console.log('Peticón completada');  
        }
      }) 
      
    }

  }

  ngOnInit(): void {
    
  }

  agregarEditar(){
    const producto : IProducto = {
      name : this.form.value.name,
      description : this.form.value.description,
      price : this.form.value.price,
      stock : this.form.value.stock,
    }
    
    if( this.paramsId !== 0){
      this.editar(this.paramsId,producto);
    }else{
      this.agregar(producto);
    }
  }

  agregar(producto:IProducto){
    this.loading = true;
    this._productService.addProduct(producto).subscribe({
      next:(data) =>{
        this.loading = false;
        console.log(data);
        this._mensajeService.mensaje('agregado',false);
        this.routerNav.navigate(['/lista'])
      },
      error:(e) =>{
        this.loading = false;
        console.log(e);
        this._mensajeService.mensaje(e.statusText,true)
      },
      complete:()=>{
        console.log('Peticón completada');  
      }
    })
  }

  editar(id:number,producto:IProducto){
      this.loading = true;
      this._productService.editProduct(id,producto).subscribe({
        next:(data) =>{
          this.loading = false;
          console.log(data);
          this._mensajeService.mensaje('editado',false);
          this.routerNav.navigate(['/lista'])
        },
        error:(e) =>{
          this.loading = false;
          console.log(e);
          this._mensajeService.mensaje(e.statusText,true)
        },
        complete:()=>{
          console.log('Peticón completada');  
        }
      })  
    
    
  }

}
