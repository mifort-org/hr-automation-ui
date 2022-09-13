import { HttpParams } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Keywords } from '@src/app/models/keywords';
import { CandidateStatus } from '@constants/candidates';
import { defaultErrorhandler, getFullName } from '@utils/functions';
import { NotificationService } from '@services/notification.service';
import { Candidate } from '../models/candidate';
import { CandidateAttribute } from '../models/candidateAttribute';
import { CandidatesFilterData } from '../models/candidatesFilterData';
import { CommunicationHistory } from '../models/communicationHistory';
import { FetchService } from './fetch.service';
import { CandidateUpdates } from '@src/app/models/candidate-updates';
import { MergeCandidate } from '@src/app/models/MergeCandidate';

interface IParam {
  [param: string]: any;
}

type CandidateCustomAttributeDto = { [key: string]: CandidateAttribute };

interface CandidateDto {
  id: string;
  lastContact: string;
  status: CandidateStatus;
  candidateUpdates: CandidateUpdates[];
  keywords: Keywords[];
  communicationHistory: CommunicationHistory[];
  candidateAttributes: CandidateAttribute[];
  customAttribute?: CandidateCustomAttributeDto;
  mergeCandidates: MergeCandidate[];
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
    return this.fetch.get<CandidateDto>(`candidates/${id}`).pipe(
      map((c) => this.mapCandidateDto(c)),
      catchError((error) => defaultErrorhandler(this.notification, error))
    );
  }

  public updateCandidateAttributes(id: string, data: any): Observable<CandidateDto> {
    return this.fetch
      .post<CandidateDto>(`candidates/${id}/attributes`, this.mapCandidateToDto(data))
      .pipe(catchError((error) => defaultErrorhandler(this.notification, error)));
  }

  public createNewCandidate(data: any): Observable<CandidateDto> {
    return this.fetch
      .post<CandidateDto>(`candidates`, this.mapCandidateToDto(data))
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

  public mapCandidateToDto(candidate: Candidate): CandidateDto {
    return candidate;
  }
}
