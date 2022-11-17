import { Component, OnInit } from '@angular/core';
import { AttributesService, AttributeTypeDto, Types } from '@src/app/services/attributes.service';

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

  constructor(private attributeService: AttributesService) {}

  ngOnInit() {
    this.attributeService.getAllAttributes().subscribe((attributes) => {
      this.attributes = attributes;
    });
  }

  fillAllAttributesGrid() {
    this.attributeService.getAllAttributes().subscribe((costumers: any) => {
      this.attributes = costumers;
    });
  }

  onAttributeSave(element: AttributeTypeDto) {
    if (element.id) {
      this.attributeService.updateAttribute(element.id, element).subscribe(() => {});
    } else {
      this.attributeService.createAttribute(element).subscribe(() => {});
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

  removeRow() {
    this.attributes = this.attributes.filter((u) => u.id != null);
    this.isCreate = false;
  }
}
