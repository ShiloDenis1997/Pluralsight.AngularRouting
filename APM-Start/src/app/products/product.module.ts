import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit.component';

import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service';

import { SharedModule } from '../shared/shared.module';
import { ProductResolverService } from './product-resolver.service';
import { ProductEditInfoComponent } from './product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit-tags.component';
import { ProductEditGuardService } from './product.guard.service';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: ProductListComponent,
                data: { pageTitle: 'Products List' }
            },
            {
                path: ':id',
                component: ProductDetailComponent,
                resolve: { product: ProductResolverService }
            },
            {
                path: ':id/edit',
                component: ProductEditComponent,
                canDeactivate: [ProductEditGuardService],
                resolve: { product: ProductResolverService },
                children: [
                    {
                        path: '', redirectTo: 'info', pathMatch: 'full'
                    },
                    {
                        path: 'info', component: ProductEditInfoComponent
                    },
                    {
                        path: 'tags', component: ProductEditTagsComponent
                    }
                ]
            }
        ])
    ],
    declarations: [
        ProductListComponent,
        ProductDetailComponent,
        ProductEditComponent,
        ProductFilterPipe,
        ProductEditInfoComponent,
        ProductEditTagsComponent
    ],
    providers: [
        ProductService,
        ProductResolverService,
        ProductEditGuardService
    ]
})
export class ProductModule { }
