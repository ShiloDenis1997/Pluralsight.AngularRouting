import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

const appRoutes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    { path: 'products', loadChildren: 'app/products/product.module#ProductModule'},
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { enableTracing: true })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
