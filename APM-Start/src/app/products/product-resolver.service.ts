import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { ProductService } from './product.service';
import { IProduct } from './product';

@Injectable()
export class ProductResolverService implements Resolve<IProduct> {

    constructor(private productService: ProductService,
        private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProduct | Observable<IProduct> | Promise<IProduct> {
        const id = route.params['id'];
        if (isNaN(id)) {
            console.log(`product id is not a number: ${id}`);
            this.router.navigate(['/products']);
        }
        return this.productService.getProduct(+id)
            .map(product => {
                if (product) {
                    return product;
                }
                console.log(`Product was not found: ${id}`);
                this.router.navigate(['/products']);
                return null;
            })
            .catch(error => {
                console.log(`Retrieval error: ${error}`);
                this.router.navigate(['/products']);
                return Observable.of(null);
            })
    }
}
