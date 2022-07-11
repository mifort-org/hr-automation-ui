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
} from '@interfaces/candidates';
import { ECandidateStatus } from '@constants/candidates';
import { defaultErrorhandler } from '@constants/strings';
import { NotificationService } from '@services/notification.service';
import { FetchService } from './fetch.service';

interface IParam {
  [param: string]: any;
}

interface CandidateDto {
  id: string;
  lastContact: string;
  status: ECandidateStatus;

  // TODO: Need to resolve this one any;
  candidateUpdates: any;
  keywords: Keywords[];
  communicationHistory: CommunicationHistory[];
  candidateAttributes: CandidateAttribute[];
  customAttribute?: CandidateCustomAttributeDto;

  // TODO: Need to resolve this one any
  mergeCandidates: any;
}

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  constructor(private fetch: FetchService, private notification: NotificationService) {}

  getCandidates(filterData: CandidatesFilterData): Observable<Candidate[]> {
    const param = new HttpParams({ fromObject: filterData as IParam }).toString();

    return this.fetch.get<CandidateDto[]>(`candidates?${param}`).pipe(
      map((data: CandidateDto[]) => data?.map(this.mapCandidateDto.bind(this))),
      catchError((error, caught) => defaultErrorhandler(this.notification, error, caught))
    );
  }

  getCandidateById(id: string): any {
    return this.fetch.get<CandidateDto>(`candidates/${id}`).pipe(
      map(this.mapCandidateDto.bind(this)),
      catchError((error, caught) => defaultErrorhandler(this.notification, error, caught))
    );
  }

  updateCandidateAttributes(id: string, data: any) {
    return this.fetch.post(`candidates/${id}/attributes`, data);
  }

  createNewCandidate(data: any) {
    return this.fetch.post(`candidates`, data);
  }

  mapCandidateDto(candidate: CandidateDto): Candidate {
    return {
      ...candidate,
      candidateAttributesValues: candidate.candidateAttributes.map((a) => ({
        name: a.attributeTypes.name || '',
        value: a.value || '',
      })),
    };
  }
}
