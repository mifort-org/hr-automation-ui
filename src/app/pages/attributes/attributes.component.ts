import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AttributesService, AttributeTypeDto, Types } from '@src/app/services/attributes.service';
import { DeleteDialogComponent } from '@pages/candidate-detail/candidate-communications/communication-comment/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss'],
})
export class AttributesComponent implements OnInit {
  public attributes!: AttributeTypeDto[];

  public isCreate: boolean = false;

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

  fillAllAttributesGrid() {
    this.attributeService.getAllAttributes().subscribe((attributes) => {
      this.attributes = attributes;
    });
  }

  onAttributeSave(element: AttributeTypeDto) {
    if (element.id) {
      this.attributeService.updateAttribute(element.id, element).subscribe(() => {});
    } else {
      this.attributeService.createAttribute(element).subscribe(() => {
        this.fillAllAttributesGrid();
      });
      this.isCreate = false;
    }
  }

  addRow() {
    if (!this.isCreate) {
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
  }

  removeRow(id: number | undefined) {
    this.attributes = this.attributes.filter((u) => u.id !== id);
  }

  onCancel(id: number | undefined) {
    if (!id) {
      this.attributes = this.attributes.filter((u) => u.id !== null);
      this.isCreate = false;
    }
  }

  public openDialog($event: Event, element: AttributeTypeDto): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '450px',
    });
    const instance = dialogRef.componentInstance;
    instance.title = 'Delete attribute';
    instance.text = `Are you sure you want to delete ${element.name} attribute?`;
    dialogRef.afterClosed().subscribe(() => {
      this.attributeService.deleteAttribute(element.id).subscribe(() => {
        this.removeRow(element.id);
      });
    });

    $event.preventDefault();
  }
}
