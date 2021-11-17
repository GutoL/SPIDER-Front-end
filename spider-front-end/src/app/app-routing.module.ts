import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VnfCatalogComponent } from './components/vnf-catalog/vnf-catalog.component';
import { SfcScreenComponent } from './components/sfc-screen/sfc-screen.component';
import { SettingsScreenComponent } from './components/settings-screen/settings-screen.component';

const routes: Routes = [
  {path:  "", pathMatch:  "full",redirectTo:  "/home"},
  {path: "home", component: HomeComponent},
  {path: "vnf_catalog", component: VnfCatalogComponent},
  {path: "sfc", component: SfcScreenComponent},
  {path: "settings", component: SettingsScreenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
