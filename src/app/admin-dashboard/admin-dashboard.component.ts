import { Component, OnInit } from '@angular/core';

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

  constructor() {
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


}
