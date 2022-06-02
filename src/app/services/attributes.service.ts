import { Injectable } from '@angular/core';
import { IAttribute } from '@interfaces/attributes';
import { FetchService } from './fetch.service';

@Injectable({
  providedIn: 'root',
})
export class AttributesService {
  public attributes: IAttribute[] | null = null;

  constructor(private _fetch: FetchService) {}

  getAllAttributes() {
    return this._fetch.get<IAttribute[]>(`attributetypes?pageNumber=1&pageSize=100`).subscribe({
      next: (resolve) => {
        this.attributes = resolve;
      },
    });
  }
}
