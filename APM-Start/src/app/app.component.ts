import { Component } from '@angular/core';
import {
    Router, Event, NavigationStart, NavigationEnd,
    NavigationError, NavigationCancel
} from '@angular/router';

import { MessageService } from './messages/message.service';
import { AuthService } from './user/auth.service';

@Component({
    selector: 'pm-app',
    templateUrl: './app/app.component.html'
})
export class AppComponent {
    pageTitle: string = 'Acme Product Management';
    isLoading = true;

    constructor(
        private authService: AuthService,
        private messageService: MessageService,
        private router: Router) {
        router.events.subscribe((routerEvent: Event) => {
            this.checkRouterEvent(routerEvent);
        });
    }

    showMessages(): void {
        this.messageService.isDisplayed = true;
        this.router.navigate([{ outlets: { popup: ['messages'] } }]);
    }

    hideMessages(): void {
        this.messageService.isDisplayed = false;
        this.router.navigate([{ outlets: { popup: null } }]);
    }

    logOut(): void {
        this.authService.logout();
        console.log('Log out');
        this.router.navigateByUrl('/welcome');
    }

    private checkRouterEvent(routerEvent: Event): void {
        if (routerEvent instanceof NavigationStart) {
            this.isLoading = true;
        }

        if (routerEvent instanceof NavigationEnd ||
            routerEvent instanceof NavigationCancel ||
            routerEvent instanceof NavigationError) {
            this.isLoading = false;
        }
    }
}
