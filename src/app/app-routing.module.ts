import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './components/listado/listado.component';
import { AgregarEditarComponent } from './components/agregar-editar/agregar-editar.component';
import { VerComponent } from './components/ver/ver.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'lista',
    pathMatch:'full'
  },
  {
    path:'lista',
    component:ListadoComponent
  },
  {
    path:'agregar',
    component:AgregarEditarComponent
  },
  {
    path:'editar/:id',
    component:AgregarEditarComponent
  },
  {
    path:'ver/:id',
    component:VerComponent
  },
  {
    path:'**',
    redirectTo:'lista',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
