import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { round } from 'lodash';
import { NgxCroppedEvent, NgxPhotoEditorService } from 'ngx-photo-editor';
import { STATUS_COLOR, CandidateStatus } from '@src/app/constants/candidates';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit, OnChanges {
  @Input() firstName: string | undefined | null;

  @Input() lastName: string | undefined | null;

  @Input() status: CandidateStatus | undefined | null;

  @Input() width: number | undefined;

  @Input() height: number | undefined;

  @Input() fileUpload: boolean = false;

  initials: string = '';

  imageExists: boolean = false;

  @HostBinding('style.background-color') selectedColor: string = '';

  @HostBinding('style.box-shadow') shadowColor: string = '';

  @HostBinding('style.width') selectedWidth: string = '';

  @HostBinding('style.height') selectedHeight: string = '';

  @ViewChild('userProfilePhoto') userProfilePhoto: ElementRef | undefined;

  output?: NgxCroppedEvent;

  constructor(private changeDetector: ChangeDetectorRef, private service: NgxPhotoEditorService) {}

  ngOnInit(): void {
    this.selectedWidth = this.getWidth();
    this.selectedHeight = this.getHeight();
  }

  ngOnChanges(changes: any): void {
    if (changes.status?.currentValue) {
      this.selectedColor = this.getColor(this.status!);
      this.shadowColor = this.getShadowColor(this.selectedColor);
    }
    if (
      changes.firstName?.currentValue !== changes.firstName?.previousValue ||
      changes.lastName?.currentValue !== changes.lastName?.previousValue
    ) {
      this.initials = this.getInitials(this.firstName!, this.lastName!);
    }
    if (changes.width?.currentValue !== changes.width?.previousValue) {
      this.selectedWidth = this.getWidth();
    }
    if (changes.height?.currentValue !== changes.height?.previousValue) {
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
    return `0px 0px 0px 6px ${colorHex}80`;
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

  onFileSelected($event: any) {
    const file: File = $event.target.files[0];

    if (file) {
      this.service
        .open($event, {
          // eslint-disable-next-line no-magic-numbers
          aspectRatio: 4 / 4,
          autoCropArea: 1,
        })
        .subscribe((data) => {
          this.output = data;
          this.imageExists = true;
          this.changeDetector.detectChanges();
          const photo: ElementRef | undefined = this.userProfilePhoto;

          // @ts-ignore
          photo.nativeElement.src = this.output?.base64;
        });
    }
  }
}
