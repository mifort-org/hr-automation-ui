import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable } from 'rxjs';
import { MODAL_ACTIONS } from '@src/app/constants/modalActions';
import { Candidate } from '@src/app/models/candidate';
import { CommentData } from '@src/app/models/commentData';
import { HistoryElement } from '@src/app/models/historyElement';
import { CandidateDetailService } from '@src/app/services/candidate-detail.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-communication-comment',
  templateUrl: './communication-comment.component.html',
  styleUrls: ['./communication-comment.component.scss'],
})
export class CommunicationCommentComponent implements OnInit {
  @Input() historyItem!: HistoryElement;

  @Input() attachment!: string;

  @Output() commentDeleted: EventEmitter<number> = new EventEmitter<number>();

  @Output() commentWasUpdated: EventEmitter<CommentData> = new EventEmitter<CommentData>();

  @ViewChild('textareaRef') textareaRef!: ElementRef;

  public candidate!: Observable<Candidate>;

  public editFieldValue!: string;

  public editMode: boolean = false;

  public showModal: boolean = false;

  public MODAL_ACTIONS = MODAL_ACTIONS;

  constructor(private candidateDetailService: CandidateDetailService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.candidate = this.candidateDetailService.currentCandidate$;
  }

  public toggleOptionsModal(action: string): void {
    this.showModal = action === MODAL_ACTIONS.OPEN;
  }

  // open delete-comment dialog window
  public openDialog($event: Event): void {
    this.toggleOptionsModal(MODAL_ACTIONS.CLOSE);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '450px',
    });

    dialogRef
      .afterClosed()
      .pipe(filter((result) => result))
      .subscribe(() => this.commentDeleted.emit(this.historyItem.id));

    $event.preventDefault();
    $event.stopPropagation();
  }

  public editModeOn($event: Event): void {
    this.editFieldValue = this.historyItem.comment;
    this.toggleOptionsModal(MODAL_ACTIONS.CLOSE);
    this.editMode = true;
    $event.preventDefault();
    $event.stopPropagation();
  }

  public applyEditingComment(): void {
    this.editFieldValue = this.textareaRef.nativeElement.innerText;

    if (this.editFieldValue?.length) {
      const updatedDate: CommentData = {
        id: this.historyItem.id,
        comment: this.editFieldValue,
      };
      this.commentWasUpdated.next(updatedDate);
      this.editFieldValue = '';
      this.editMode = false;
    }
    this.toggleOptionsModal(MODAL_ACTIONS.CLOSE);
  }

  public editModeOff(): void {
    if (this.editMode) {
      this.editFieldValue = '';
      this.editMode = false;
      this.toggleOptionsModal(MODAL_ACTIONS.CLOSE);
    }
  }
}
