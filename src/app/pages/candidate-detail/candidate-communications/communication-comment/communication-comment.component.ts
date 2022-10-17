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
import { Observable } from 'rxjs';
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

  @Input() candidate!: Observable<Candidate>;

  @Input() attachment!: string;

  @Output() commentDeleted: EventEmitter<number> = new EventEmitter<number>();

  @Output() commentWasUpdated: EventEmitter<CommentData> = new EventEmitter<CommentData>();

  @ViewChild('textareaRef') textareaRef!: ElementRef;

  public editMode: boolean = false;

  public editFieldValue!: string;

  public showModal = false;

  public MODAL_ACTIONS = MODAL_ACTIONS;

  constructor(private candidateDetailService: CandidateDetailService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.candidate = this.candidateDetailService.currentCandidate$;
  }

  public toggleOptionsModal(action: string) {
    if (action === MODAL_ACTIONS.CLOSE) {
      this.showModal = false;
    } else if (action === MODAL_ACTIONS.OPEN) {
      this.showModal = true;
    }
  }

  public openDialog(): void {
    // open delete-comment dialog window
    this.toggleOptionsModal(MODAL_ACTIONS.CLOSE);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.commentDeleted.emit(this.historyItem.id);
      }
    });
  }

  public editModeOn(): void {
    this.editFieldValue = this.historyItem.comment;
    this.toggleOptionsModal(MODAL_ACTIONS.CLOSE);
    this.editMode = true;
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
