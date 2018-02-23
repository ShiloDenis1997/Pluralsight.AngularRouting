import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuardService } from './user/auth.guard.service';
import { SelectiveStrategy } from './selective.strategy';

const appRoutes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    {
        path: 'products',
        canActivate: [AuthGuardService],
        loadChildren: 'app/products/product.module#ProductModule',
        data: {
            preload: true
        }
    },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            enableTracing: true, preloadingStrategy: SelectiveStrategy
        })
    ],
    exports: [
        RouterModule
    ],
    providers: [
        SelectiveStrategy
    ]
})
export class AppRoutingModule {
}
