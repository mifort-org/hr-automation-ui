import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { NewCandidateModalComponent } from '../components/shared/new-candidate-modal/new-candidate-modal.component';
import { EModalSizes } from '../constants/strings';
import { MODAL_SIZE, ModalService } from './modal.service';

describe('ModalService', () => {
  let spectator: SpectatorService<ModalService>;
  let dialog: any;
  let dialogSpy: any;
  const returnData = {
    width: MODAL_SIZE[EModalSizes.SM],
    data: null,
    id: undefined,
  };

  const createService = createServiceFactory({
    service: ModalService,
    mocks: [MatDialog],
  });

  beforeEach(() => {
    spectator = createService();
    dialog = spectator.inject<MatDialog>(MatDialog);
    dialogSpy = jest.spyOn(dialog, 'open').mockReturnValue({ afterClosed: () => of({}) });
  });

  describe('show method', () => {
    it('should open modal without callback', () => {
      spectator.service.open(NewCandidateModalComponent, EModalSizes.SM, null, undefined);
      expect(dialogSpy).toHaveBeenCalledWith(NewCandidateModalComponent, returnData);
    });

    it('should open modal with callback', () => {
      spectator.service.open(NewCandidateModalComponent, EModalSizes.SM, null, () => {});
      expect(dialogSpy).toHaveBeenCalledWith(NewCandidateModalComponent, returnData);
    });
  });
});
