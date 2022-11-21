import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AttributesService } from '@src/app/services/attributes.service';
import { DeleteDialogComponent } from '@pages/candidate-detail/candidate-communications/communication-comment/delete-dialog/delete-dialog.component';
import { AttributeType, Types } from '@src/app/models/attributeType';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss'],
})
export class AttributesComponent implements OnInit, OnDestroy {
  public attributes!: AttributeType[];

  public isCreate: boolean = false;

  subscription!: Subscription;

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

  types: Types[] = [
    { basicType: 'data', viewValue: 'Data' },
    { basicType: 'string', viewValue: 'String' },
    { basicType: 'number', viewValue: 'Number' },
    { basicType: 'date', viewValue: 'Date' },
  ];

  constructor(private attributeService: AttributesService, public dialog: MatDialog) {}

  ngOnInit() {
    this.fillAllAttributesGrid();
  }

  fillAllAttributesGrid(): void {
    this.subscription = this.attributeService
      .getAllAttributes()
      .subscribe((attributes: AttributeType[]) => {
        this.attributes = attributes;
      });
  }

  onAttributeSave(element: AttributeType): void {
    if (element.id) {
      this.attributeService.updateAttribute(element.id, element).subscribe(() => {});
    } else {
      this.attributeService.createAttribute(element).subscribe(() => {
        this.fillAllAttributesGrid();
      });
      this.isCreate = false;
    }
  }

  addRow(): void {
    if (this.isCreate) {
      return;
    }
    const newRow = {
      id: null,
      basicType: '',
      identifier: '',
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

  removeRow(id: number | undefined): void {
    this.attributes = this.attributes.filter((u: AttributeType) => u.id !== id);
  }

  onCancel(id: number | undefined): void {
    if (!id) {
      this.attributes = this.attributes.filter((u: AttributeType) => !!u.id);
      this.isCreate = false;
    }
  }

  public openDialog($event: Event, element: AttributeType): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '450px',
      data: {
        title: 'Delete attribute',
        text: `Are you sure you want to delete ${element.name} attribute?`,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.attributeService.deleteAttribute(element.id).subscribe(() => {
        this.removeRow(element.id);
      });
    });

    $event.preventDefault();
  }

  onEdit(element: AttributeType): void {
    // eslint-disable-next-line no-param-reassign
    element.isEdit = !element.isEdit;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
