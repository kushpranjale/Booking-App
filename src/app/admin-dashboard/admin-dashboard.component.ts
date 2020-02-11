import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
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
        if (menuItem === 'department') {
            this.routes.navigate(['admindashboard', 'add-department']);
        }
        if (menuItem === 'man-dep') {
            this.routes.navigate(['admindashboard', 'manage-department']);
        }
        if (menuItem === 'add-emp') {
            this.routes.navigate(['admindashboard', 'add-employee']);
        }
        if (menuItem === 'man-emp') {
            this.routes.navigate(['admindashboard', 'man-employee']);
        }
        if (menuItem === 'room-type') {
            this.routes.navigate(['admindashboard', 'room-type']);
        }
        if (menuItem === 'add-room') {
            this.routes.navigate(['admindashboard', 'add-room']);
        }
        if (menuItem === 'man-room') {
            this.routes.navigate(['admindashboard', 'man-room']);
        }
        if (menuItem === 'add-extra') {
            this.routes.navigate(['admindashboard', 'add-extra']);
        }
        if (menuItem === 'man-extra') {
            this.routes.navigate(['admindashboard', 'man-extra']);
        }
    }
}
