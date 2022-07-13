import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, map, Observable, of } from 'rxjs';
import {
  CandidateCustomAttributeDto,
  CandidatesFilterData,
  Keywords,
  CommunicationHistory,
  CandidateAttribute,
  Candidate,
  CandidateAttributesTypes,
} from '@src/app/models/candidates';
import { ECandidateStatus } from '@constants/candidates';
import { defaultErrorhandler, getFullName } from '@utils/functions';
import { NotificationService } from '@services/notification.service';
import { FetchService } from './fetch.service';

interface IParam {
  [param: string]: any;
}

interface CandidateAttributesTypesDto {
  id: number;
  name: string;
  basicType: string;
  validation: string;
  identifier: boolean;
  value: string;
}

interface CandidateDto {
  id: string;
  lastContact: string;
  status: ECandidateStatus;
  candidateUpdates: any;
  keywords: Keywords[];
  communicationHistory: CommunicationHistory[];
  candidateAttributes: CandidateAttribute[];
  customAttribute?: CandidateCustomAttributeDto;
  mergeCandidates: any;
}

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  constructor(private fetch: FetchService, private notification: NotificationService) {}

  public getCandidates(filterData: CandidatesFilterData): Observable<Candidate[]> {
    const param = new HttpParams({ fromObject: filterData as IParam }).toString();

    return this.fetch.get<CandidateDto[]>(`candidates?${param}`).pipe(
      map((data: CandidateDto[]) => data?.map(this.mapCandidateDto.bind(this))),
      catchError((error) => defaultErrorhandler(this.notification, error))
    );
  }

  public getCandidateById(id: string): any {
    return this.fetch.get<CandidateDto>(`candidates/${id}`).pipe(
      map(this.mapCandidateDto.bind(this)),
      catchError((error) => defaultErrorhandler(this.notification, error))
    );
  }

  getCandidateAttributesById(id: string): Observable<Array<CandidateAttributesTypes>> {
    return this.fetch.get<Array<CandidateAttributesTypesDto>>(`candidates/${id}/attributes`).pipe(
      catchError((error) => of(error.status)),
      filter((data) => {
        // eslint-disable-next-line no-console
        console.log(data);
        return Array.isArray(data);
      })
    );
  }

  public updateCandidateAttributes(id: string, data: any) {
    return this.fetch
      .post(`candidates/${id}/attributes`, data)
      .pipe(catchError((error) => defaultErrorhandler(this.notification, error)));
  }

  public createNewCandidate(data: any) {
    return this.fetch
      .post(`candidates`, data)
      .pipe(catchError((error) => defaultErrorhandler(this.notification, error)));
  }

  public mapCandidateDto(candidate: CandidateDto): Candidate {
    return {
      ...candidate,
      fullName: getFullName(candidate.candidateAttributes),
      candidateAttributesValues: candidate.candidateAttributes.map((a) => ({
        name: a.attributeTypes.name || '',
        value: a.value || '',
      })),
    };
  }
}
