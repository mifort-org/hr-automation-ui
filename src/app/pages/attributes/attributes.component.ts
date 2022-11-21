import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AttributesService } from '@src/app/services/attributes.service';
import { DeleteDialogComponent } from '@pages/candidate-detail/candidate-communications/communication-comment/delete-dialog/delete-dialog.component';
import {
  Attribute,
  AttributeType,
  DEFAULT_TYPE,
  PREDEFINED_TYPES,
} from '@src/app/models/attributeType';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss'],
})
export class AttributesComponent implements OnInit, OnDestroy {
  public attributes!: Attribute[];

  public isCreate: boolean = false;

  private subscription!: Subscription;

  public displayedColumns: string[] = [
    'id',
    'name',
    'title',
    'icon',
    'type',
    'validation',
    'identifier',
    'multivalued',
    'actions',
  ];

  public types: AttributeType[] = PREDEFINED_TYPES;

  constructor(private attributeService: AttributesService, public dialog: MatDialog) {}

  public ngOnInit(): void {
    this.fillAllAttributesGrid();
  }

  public fillAllAttributesGrid(): void {
    this.subscription = this.attributeService
      .getAllAttributes()
      .subscribe((attributes: Attribute[]) => {
        this.attributes = attributes;
      });
  }

  public onAttributeSave(element: Attribute): void {
    if (element.id) {
      this.attributeService.updateAttribute(element.id, element).subscribe(() => {});
    } else {
      this.attributeService.createAttribute(element).subscribe(() => {
        this.fillAllAttributesGrid();
      });
      this.isCreate = false;
    }
  }

  public addRow(): void {
    if (this.isCreate) {
      return;
    }

    const newRow: Attribute = {
      basicType: DEFAULT_TYPE.basicType,
      isIdentifier: false,
      isMultivalued: false,
      name: '',
      label: '',
      validation: '',
      icon: '',
      isEdit: true,
    };

    // @ts-ignore
    this.attributes = [newRow, ...this.attributes];
    this.isCreate = true;
  }

  public removeRow(id: number | undefined): void {
    this.attributes = this.attributes.filter((u: Attribute) => u.id !== id);
  }

  public onCancel(id: number | undefined): void {
    if (!id) {
      this.attributes = this.attributes.filter((u: Attribute) => !!u.id);
      this.isCreate = false;
    }
  }

  public openDialog($event: Event, element: Attribute): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '450px',
      data: {
        title: 'Delete attribute',
        text: `Are you sure you want to delete ${element.name} attribute?`,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.attributeService.deleteAttribute(element.id!).subscribe(() => {
        this.removeRow(element.id);
      });
    });

    $event.preventDefault();
  }

  public onEdit(element: Attribute): void {
    // eslint-disable-next-line no-param-reassign
    element.isEdit = !element.isEdit;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
