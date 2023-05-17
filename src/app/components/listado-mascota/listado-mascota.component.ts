import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IMascota } from 'src/app/interfaces/mascota.interface';

const listaMascotas: IMascota[] =[
  {
    nombre: 'Ciro',
    edad:3,
    raza:'caniche',
    color:'blanco',
    peso:10
  },
  {
    nombre: 'Hulk',
    edad:4,
    raza:'caniche',
    color:'blanco',
    peso:10
  },
  {
    nombre: 'Oso',
    edad:3,
    raza:'caniche',
    color:'blanco',
    peso:10
  },
  {
    nombre: 'Manchitas',
    edad:5,
    raza:'caniche',
    color:'blanco',
    peso:10
  },
  {
    nombre: 'Blanca',
    edad:2,
    raza:'caniche',
    color:'blanco',
    peso:10
  },
  {
    nombre: 'Wily',
    edad:1,
    raza:'caniche',
    color:'blanco',
    peso:10
  },
];

@Component({
  selector: 'app-listado-mascota',
  templateUrl: './listado-mascota.component.html',
  styleUrls: ['./listado-mascota.component.css']
})
export class ListadoMascotaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color','peso', 'acciones'];
  dataSource = new MatTableDataSource<IMascota>(listaMascotas);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Items por Página';
    this.dataSource.sort = this.sort;

  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
