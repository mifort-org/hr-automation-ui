import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AttributeType, AttributeTypeDictionary } from '@src/app/models/attributes';
import { FetchService } from './fetch.service';

interface AttributeTypeDto {
  basicType: string;
  id: number;
  identifier: boolean;
  name: string;
  label: string;
  validation: string;
}

@Injectable({
  providedIn: 'root',
})
export class AttributesService {
  public attributes: AttributeType[] | null = null;

  public attributesDictionary: AttributeTypeDictionary = {};

  public identifiedAttributes: AttributeType[] | null = null;

  constructor(private fetch: FetchService) {}

  public getAllAttributes() {
    return this.fetch
      .get<AttributeTypeDto[]>(`attributetypes?pageNumber=1&pageSize=100`)
      .pipe(map((data: AttributeTypeDto[]) => data.map(this.mapAllAttributes.bind(this))))
      .subscribe({
        next: (resolve) => {
          this.attributes = resolve;
          this.identifiedAttributes = resolve.filter((el: AttributeType) => el.identifier);
          resolve.forEach((el) => {
            this.attributesDictionary[el.name] = { ...el };
          });
        },
      });
  }

  public mapAllAttributes(allAttributes: AttributeTypeDto): AttributeType {
    return allAttributes;
  }
}
