import { Component } from '@angular/core';
import { SignInModalComponent } from '@components/shared/sign-in-modal/sign-in-modal.component';
import { EModalSizes } from '@constants/strings';
import { ModalService } from '@services/modal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private _modalService: ModalService) {}

  openSignInDialog() {
    this._modalService.open(SignInModalComponent, EModalSizes.MD);
  }
}
