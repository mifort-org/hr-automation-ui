import { Component, Input } from '@angular/core';
import { ROUTES } from '@src/app/routes';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Input() public isExpanded: boolean = false;

  public readonly candidatesPage: string = ROUTES.CANDIDATES;

  public navigationItems: { icon: string; path: string; label: string }[] = [
    {
      icon: 'view_list',
      path: ROUTES.CANDIDATES,
      label: 'Candidates',
    },
    {
      icon: 'call_merge',
      path: ROUTES.CANDIDATES_MERGE,
      label: 'Merge',
    },
    {
      icon: 'format_list_bulleted',
      path: ROUTES.ATTRIBUTES,
      label: 'Attribute types',
    },
  ];
}
