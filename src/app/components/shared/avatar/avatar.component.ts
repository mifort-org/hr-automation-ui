import { Component, HostBinding, Input, OnChanges, OnInit } from '@angular/core';
import { round } from 'lodash';
import { STATUS_COLOR, CandidateStatus } from '@src/app/constants/candidates';
import { Candidate } from '@src/app/models/candidate';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit, OnChanges {
  @Input() candidate: Candidate | undefined | null;

  @Input() width: number | undefined;

  @Input() height: number | undefined;

  initials: string = '';

  imageExists: boolean = false;

  @HostBinding('style.background-color') selectedColor: string = '';

  @HostBinding('style.box-shadow') shadowColor: string = '';

  @HostBinding('style.width') selectedWidth: string = '';

  @HostBinding('style.height') selectedHeight: string = '';

  ngOnInit(): void {
    this.selectedWidth = this.getWidth();
    this.selectedHeight = this.getHeight();
  }

  ngOnChanges(changes: any): void {
    if (changes.candidate.currentValue) {
      this.selectedColor = this.getColor(this.candidate!.status);
      this.shadowColor = this.getShadowColor(this.selectedColor);
      this.initials = this.getInitials(this.candidate?.firstName!, this.candidate?.lastName!);
      this.selectedWidth = this.getWidth();
      this.selectedHeight = this.getHeight();
    }
  }

  getInitials(name: string, surname: string): string {
    if (name == null || surname == null) {
      return '';
    }
    const [firstNameInitial] = name;
    const [lastNameInitial] = surname;

    if (firstNameInitial == null || lastNameInitial == null) {
      return '';
    }
    return (firstNameInitial + lastNameInitial).toLocaleUpperCase();
  }

  getColor(status: CandidateStatus): string {
    return STATUS_COLOR[status] || STATUS_COLOR[CandidateStatus.CREATED];
  }

  getShadowColor(colorHex: string): string {
    return `0px 0px 0px 3px ${colorHex}80`;
  }

  getWidth(): string {
    return this.width ? `${this.width}px` : '80px';
  }

  getHeight(): string {
    return this.height ? `${this.height}px` : '80px';
  }

  getTextSize(): string {
    // eslint-disable-next-line no-magic-numbers
    return this.height ? `${this.height * 0.3}px` : '32px';
  }

  getIconSize(): string {
    // eslint-disable-next-line no-magic-numbers
    return this.height ? `scale( ${round(this.height / 40)})` : 'scale(2)';
  }
}
