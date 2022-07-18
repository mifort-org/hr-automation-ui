import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import {
  CandidateCustomAttributeDto,
  CandidatesFilterData,
  Keywords,
  CommunicationHistory,
  CandidateAttribute,
  Candidate,
} from '@src/app/models/candidates';
import { ECandidateStatus } from '@constants/candidates';
import { defaultErrorhandler, getFullName } from '@utils/functions';
import { NotificationService } from '@services/notification.service';
import { FetchService } from './fetch.service';

interface IParam {
  [param: string]: any;
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

  public getCandidateById(id: string): Observable<Candidate> {
    // eslint-disable-next-line no-console
    console.log('CandidatesService.getCandidateById', id);
    return this.fetch.get<CandidateDto>(`candidates/${id}`).pipe(
      map((c) => this.mapCandidateDto(c)),
      catchError((error) => defaultErrorhandler(this.notification, error))
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
