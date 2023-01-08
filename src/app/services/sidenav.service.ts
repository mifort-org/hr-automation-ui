import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private readonly SIDENAV_STATUS_KEY = 'sidenavExpanded';

  public saveSidenavStatus(isExpanded: boolean): void {
    localStorage.setItem(this.SIDENAV_STATUS_KEY, JSON.stringify(isExpanded));
  }

  public getSidenavStatus(): boolean {
    return JSON.parse(localStorage.getItem(this.SIDENAV_STATUS_KEY) || 'false');
  }
}
