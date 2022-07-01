import { Component } from '@angular/core';
import { SignInModalComponent } from '@components/shared/sign-in-modal/sign-in-modal.component';
import { EModalSizes } from '@constants/strings';
import { ModalService } from '@services/modal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(private modalService: ModalService) {}

  openSignInDialog() {
    this.modalService.open(SignInModalComponent, EModalSizes.MD);
  }
}
