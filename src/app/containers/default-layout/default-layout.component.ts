import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { LogoutService } from '../../services/logout/logout.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(
    private out: LogoutService
  ) {}

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() { this.out.logout(); }
}
