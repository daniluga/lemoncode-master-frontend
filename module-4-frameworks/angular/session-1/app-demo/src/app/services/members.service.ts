import { Injectable } from '@angular/core';
import { MemberEntity } from '../../model';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private baseUrl: string = 'https://api.github.com/orgs';
  private members: MemberEntity[] = [];

  constructor(private http: HttpClient) {}

  /*async*/ getOrgMembers(
    org: string = 'lemoncode'
  ): Observable<MemberEntity[]> {
    return this.http
      .get<MemberEntity[]>(`https://api.github.com/orgs/${org}/members`)
      .pipe(shareReplay(1)); // Compartimos el resultado de la petición con todos los suscriptores

    // if (this.members.length > 0) {
    //   return this.members;
    // }

    // try {
    //   const response = await fetch(`${this.baseUrl}/${org}/members`);
    //   if (response.ok) {
    //     const result = await response.json();
    //     this.members = [...result];
    //   }
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   return this.members;
    // }
  }
}
