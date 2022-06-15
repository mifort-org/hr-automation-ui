import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-merge-page',
  templateUrl: './merge-page.component.html',
  styleUrls: ['./merge-page.component.scss'],
})
export class MergePageComponent implements OnInit {
  // constructor() {}
  candidatesIds: Array<string> = ['Pety', 'Vasiya', 'Ulia'];

  attributesSetList = new Set();

  attributesTitles: Array<string> = [];

  attributesMatrix: Array<Array<string>> = [];

  candidates = [
    [
      {
        id: 134,
        value: 'Artem',
        valueSource: 0,
        name: 'Firstname',
        archived: null,
      },
      {
        id: 134,
        value: 'Cat',
        valueSource: 0,
        name: 'Cat',
        archived: null,
      },
    ],
    [
      {
        id: 2,
        value: 'rabota.by',
        valueSource: 0,
        name: 'Twitter',
        archived: false,
      },
      {
        id: 134,
        value: 'Artem',
        valueSource: 0,
        name: 'Firstname',
        archived: null,
      },
    ],
    [
      {
        id: 2,
        value: 'rabota.by',
        valueSource: 0,
        name: 'Twitter',
        archived: false,
      },
      {
        id: 135,
        value: 'Skrebets',
        valueSource: 0,
        name: 'Lastname',
        archived: null,
      },
    ],
  ];

  ngOnInit() {
    this.findAllAttributes();
    this.fillTitleValues();
    this.fillMatrix();
  }

  findAllAttributes() {
    this.candidates.forEach((attrArray) =>
      attrArray.forEach((attr) => this.attributesSetList.add(attr.name))
    );
  }

  fillTitleValues() {
    this.attributesTitles = [...(Array.from(this.attributesSetList.values()) as Array<string>)];
  }

  fillMatrix() {
    this.attributesMatrix = this.candidates.map((candidateArr) =>
      this.attributesTitles.map((item) => {
        const candidateAttribute = candidateArr.find((attr) => attr.name === item);
        return candidateAttribute ? candidateAttribute.value : '';
      })
    );
  }
}
