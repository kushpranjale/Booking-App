import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-employee-dashboard',
    templateUrl: './employee-dashboard.component.html',
    styleUrls: [
        './employee-dashboard.component.css',
        './../admin-dashboard/admin-dashboard.component.css',
    ],
})
export class EmployeeDashboardComponent implements OnInit {
    public mod: string;
    open: boolean;
    mq = window.matchMedia('(min-width: 800px)');
    menue: boolean;

    constructor(private routes: Router) {
        if (matchMedia) {
            this.mq.addEventListener('change', () => {
                console.log(this.mq.matches);
                this.ngOnInit();
            });
        }
    }

    ngOnInit() {
        if (this.mq.matches) {
            this.open = true;
            this.mod = 'side';
            this.menue = false;
            console.log(this.mq.matches);
        } else {
            console.log(this.mq.matches);
            this.open = false;
            this.mod = 'over';
            this.menue = true;

            // window width is less than 500px
        }
    }
    onClick(menuItem: string) {
        if (menuItem === 'add-customer') {
            this.routes.navigate(['employee', 'add-customer']);
        }
        if (menuItem === 'manage-customer') {
            this.routes.navigate(['employee', 'manage-customer']);
        }
        if (menuItem === 'complaints') {
            this.routes.navigate(['employee', 'complaints']);
        }
        if (menuItem === 'complaints') {
            this.routes.navigate(['employee', 'complaints']);
        }
        if (menuItem === 'booking') {
            this.routes.navigate(['employee', 'booking']);
        }
        if (menuItem === 'review') {
            this.routes.navigate(['employee', 'review']);
        }
    }
}
