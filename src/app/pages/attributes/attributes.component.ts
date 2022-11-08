import { Component, OnInit } from '@angular/core';
import { AttributesService } from '@src/app/services/attributes.service';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss'],
})
export class AttributesComponent implements OnInit {
  public attributes: any;

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

  constructor(private attributeService: AttributesService) {}

  ngOnInit() {
    this.attributes = this.attributeService.getAllAttributes();
  }

  fillAllAttributesGrid() {
    this.attributeService.getAllAttributes().subscribe((costumers: any) => {
      this.attributes = costumers;
    });
  }
}
