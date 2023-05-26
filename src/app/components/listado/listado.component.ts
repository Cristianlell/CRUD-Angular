import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IProducto } from 'src/app/interfaces/producto.interface';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'nombre',
    'descripcion',
    'precio',
    'stock',
    'acciones',
  ];
  dataSource = new MatTableDataSource<IProducto>();
  loading: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _productService: ProductoService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por Página';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getProducts() {
    this.loading = true;
    this._productService.getProducts().subscribe({
      next: (data) => {
        this.loading = false;
        console.log(data)
        this.dataSource.data = data.body;
      },
      error:(err) =>{
        this.loading = false;
        console.log(err);
      },
      complete: () => {
        console.info('Petición getProducts completa')
      },
    });
  }

  eliminar(id: number) {
    this.loading = true;
    this._productService.deleteProduct(id).subscribe({
      next:(data)=>{
        this.loading = false;
        console.log(data);
        this.getProducts()
        this.mensajeExito();
      },
      error:(e) =>{
        this.loading = false;
        console.log(e);
      },
      complete:()=>{
        console.log('petición delete completa');
      }

    })
  }

  mensajeExito(){
       this._snackBar.open('Producto Eliminado', '', {
      duration: 5 * 1000,
      verticalPosition: 'top',
    });
  }
}
