import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SignInModalComponent } from '@components/shared/sign-in-modal/sign-in-modal.component';
import { EModalSizes } from '@constants/strings';
import { ModalService } from '@services/modal.service';
import { ROUTES } from '@src/app/routes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() public isExpanded: boolean = false;

  @Output() public toggleSidenav: EventEmitter<void> = new EventEmitter<void>();

  constructor(private modalService: ModalService, private router: Router) {}

  public openSignInDialog(): void {
    this.modalService.open(SignInModalComponent, EModalSizes.MD);
  }

  public back(): void {
    this.router.navigate([ROUTES.CANDIDATES]);
  }

  public goToDashboard(): void {
    this.router.navigate([ROUTES.CANDIDATES]);
  }

  checkIsMainPage() {
    return this.router.url === `/${ROUTES.CANDIDATES}`;
  }
}
