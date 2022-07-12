import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentData, HistoryElement } from '@src/app/models/history';

@Component({
  selector: 'app-communication-comment',
  templateUrl: './communication-comment.component.html',
  styleUrls: ['./communication-comment.component.scss'],
})
export class CommunicationCommentComponent {
  @Input() historyItem!: HistoryElement;

  @Input() attachment!: string;

  @Output() commentDeleted: EventEmitter<number> = new EventEmitter<number>();

  @Output() commentWasUpdated: EventEmitter<CommentData> = new EventEmitter<CommentData>();

  public commentWidth!: string;

  public commentHeight!: string;

  public editMode: boolean = false;

  public editFieldValue!: string;

  public editModeOn(): void {
    const textRect: DOMRect | undefined = document
      .getElementById(`${this.historyItem.id}_comment_text`)
      ?.getBoundingClientRect();
    if (textRect) {
      this.commentWidth = `${textRect.width}px`;
      this.commentHeight = `${textRect.height}px`;
      this.editFieldValue = this.historyItem.comment;
      this.editMode = true;
    }
  }

  public editModeOff(): void {
    if (this.editFieldValue?.length) {
      const updatedDate: CommentData = {
        id: this.historyItem.id,
        comment: this.editFieldValue,
      };
      this.commentWasUpdated.next(updatedDate);
      this.editFieldValue = '';
    }
    this.editMode = false;
  }
}
