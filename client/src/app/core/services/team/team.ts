import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamMember } from '../../interfaces/ITeam';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class teamService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl + '/team-members';

  getTeamMembers() {
    return this.http.get<TeamMember[]>(this.apiUrl);
  }
}
