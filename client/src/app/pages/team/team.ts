import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TeamMember } from '../../core/interfaces/ITeam';
import { teamService } from '../../core/services/team/team';

@Component({
  selector: 'app-team',
  imports: [CommonModule, RouterLink],
  templateUrl: './team.html',
  styleUrl: './team.scss',
})
export class Team {
  constructor(private teamService: teamService) {}
  teamMembers: TeamMember[] = [];

  ngOnInit() {
    this.teamService.getTeamMembers().subscribe({
      next: (res: any) => {
        this.teamMembers = res.data;
      },
      error: (err: any) => console.log(err),
    });
  }

  getProjectImageUrl(image: string): string {
    return `http://localhost:5000/uploads/${image}`;
  }
}
