import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoMascotaComponent } from './components/listado-mascota/listado-mascota.component';
import { AgregarEditarMascotaComponent } from './components/agregar-editar-mascota/agregar-editar-mascota.component';
import { VerMascotaComponent } from './components/ver-mascota/ver-mascota.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'listaMascota',
    pathMatch:'full'
  },
  {
    path:'listaMascota',
    component:ListadoMascotaComponent
  },
  {
    path:'agregarMascota',
    component:AgregarEditarMascotaComponent
  },
  {
    path:'editarMascota/:id',
    component:AgregarEditarMascotaComponent
  },
  {
    path:'verMascota/:id',
    component:VerMascotaComponent
  },
  {
    path:'**',
    redirectTo:'listaMascota',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
