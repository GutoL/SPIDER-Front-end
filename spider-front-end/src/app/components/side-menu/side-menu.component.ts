import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { delay } from 'rxjs/operators';

// tutorial: https://zoaibkhan.com/blog/create-a-responsive-sidebar-menu-with-angular-material/

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private router: Router) { }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }
  

  ngOnInit(): void {
  }

  go_to_home_screen(){
    this.router.navigate(['/home']).then(() => {
      window.location;
    });
  }

  go_to_vnf_catalog_screen(){
    this.router.navigate(['/vnf_catalog']).then(() => {
      window.location;
    });
  }

  go_to_sfc_screen(){
    this.router.navigate(['/sfc']).then(() => {
      window.location;
    });
  }


  go_to_settings_screen(){
    this.router.navigate(['/settings']).then(() => {
      window.location;
    });
  }

}
