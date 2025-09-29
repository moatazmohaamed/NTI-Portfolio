import { Component, ChangeDetectionStrategy, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { inject } from '@angular/core';
import { DashboardDataService } from '../services/dashboard-data.service';
import { environment } from '../../../environments/environment';
import { TeamMember } from '../../core/interfaces/ITeam';

@Component({
  selector: 'app-dash-team',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dash-team.html',
  styleUrl: './dash-team.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashTeam {
  private fb = inject(FormBuilder);
  private dashboardService = inject(DashboardDataService);

  teamMembers = signal<TeamMember[]>([]);
  memberToDelete = signal<TeamMember | null>(null);

  showModal = signal<boolean>(false);
  showDeleteModal = signal<boolean>(false);
  isEditMode = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);
  isDeleting = signal<boolean>(false);
  successMessage = signal<string>('');
  errorMessage = signal<string>('');
  photoPreview = signal<string | null>(null);
  photoError = signal<string | null>(null);
  selectedFile: File | null = null;

  constructor() {
    this.loadTeamMembers();

    effect(() => {
      if (this.successMessage()) {
        setTimeout(() => this.successMessage.set(''), 5000);
      }
    });

    effect(() => {
      if (this.errorMessage()) {
        setTimeout(() => this.errorMessage.set(''), 5000);
      }
    });
  }

  teamForm: FormGroup = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    role: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    bio: new FormControl('', [Validators.maxLength(500)]),
    linkedin: new FormControl(''),
    github: new FormControl(''),
    isActive: new FormControl(true),
  });

  loadTeamMembers(): void {
    this.dashboardService.getTeamMembers().subscribe({
      next: (teamMembers: any) => {
        this.teamMembers.set(teamMembers);
      },
      error: (error) => {
        console.error('Error loading team members:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Full error object:', error);
        this.errorMessage.set(`Failed to load team members: ${error.status} ${error.statusText || error.message}`);
      },
    });
  }

  submitForm(): void {
    if (this.teamForm.invalid) {
      Object.values(this.teamForm.controls).forEach(control => control.markAsTouched());
      return;
    }

    if (!this.isEditMode() && !this.selectedFile) {
      this.photoError.set('Photo is required for new team members');
      return;
    }

    const formValue = this.teamForm.value;
    this.isSubmitting.set(true);

    const formData = new FormData();
    formData.append('name', formValue.name || '');
    formData.append('role', formValue.role || '');
    formData.append('bio', formValue.bio || '');
    formData.append('isActive', (formValue.isActive !== false).toString());

    const socialLinks = {
      linkedin: formValue.linkedin || '',
      github: formValue.github || '',
    };
    formData.append('socialLinks', JSON.stringify(socialLinks));

    if (this.selectedFile) {
      formData.append('memberPhoto', this.selectedFile);
    }


    if (this.isEditMode()) {
      const memberId = formValue._id;
      if (!memberId) {
        this.errorMessage.set('Member ID is missing for update operation');
        this.isSubmitting.set(false);
        return;
      }

      this.dashboardService.updateTeamMember(memberId, formData).subscribe({
        next: (updatedMember) => {
          this.teamMembers.update((members) =>
            members.map((member: any) =>
              member._id === updatedMember._id ? updatedMember : member
            )
          );
          this.closeModal();
          this.loadTeamMembers();
          this.successMessage.set('Team member updated successfully!');
          this.isSubmitting.set(false);
        },
        error: (error) => {
          console.error('Error updating team member:', error);
          this.errorMessage.set(
            error.error?.message || 'Failed to update team member. Please try again.'
          );
          this.isSubmitting.set(false);
        },
      });
    } else {
      this.dashboardService.createTeamMember(formData).subscribe({
        next: (newMember) => {
          this.teamMembers.update((members: any) => [...members, newMember]);
          this.closeModal();
          this.loadTeamMembers();
          this.successMessage.set('Team member created successfully!');
          this.isSubmitting.set(false);
        },
        error: (error) => {
          console.error('Error creating team member:', error);
          this.errorMessage.set(
            error.error?.message || 'Failed to create team member. Please try again.'
          );
          this.isSubmitting.set(false);
        },
      });
    }
  }

  deleteTeamMember(): void {
    const memberToDelete = this.memberToDelete();
    if (!memberToDelete?._id) return;

    this.isDeleting.set(true);

    this.dashboardService.deleteTeamMember(memberToDelete._id).subscribe({
      next: () => {
        this.teamMembers.update((members) => members.filter((m) => m._id !== memberToDelete._id));
        this.successMessage.set('Team member deleted successfully!');
        this.closeDeleteModal();
        this.loadTeamMembers();
      },
      error: (error) => {
        this.isDeleting.set(false);
        this.errorMessage.set(
          error.error?.message || 'Failed to delete team member. Please try again.'
        );
        console.error('Error deleting team member:', error);
      },
    });
  }

  toggleMemberStatus(member: TeamMember): void {
    const updatedStatus = !member.isActive;

    const formData = new FormData();
    formData.append('isActive', updatedStatus.toString());
    if (member.socialLinks) {
      formData.append('socialLinks', JSON.stringify(member.socialLinks));
    }

    this.dashboardService.updateTeamMember(member._id || '', formData).subscribe({
      next: (teamMember: any) => {
        this.teamMembers.update((members: any) => {
          const index = members.findIndex((m: any) => m._id === member._id);
          if (index !== -1) {
            const updatedMembers = [...members];
            updatedMembers[index] = teamMember;
            return updatedMembers;
          }
          return members;
        });
        this.successMessage.set(
          `Team member ${updatedStatus ? 'activated' : 'deactivated'} successfully!`
        );
      },
      error: (error) => {
        this.errorMessage.set(error.error?.message || 'Failed to update status. Please try again.');
        console.error('Error updating status:', error);
      },
    });
  }

  openAddModal(): void {
    this.isEditMode.set(false);
    this.teamForm.reset();
    this.photoPreview.set(null);
    this.photoError.set(null);
    this.selectedFile = null;
    this.showModal.set(true);
  }

  openEditModal(member: TeamMember): void {
    this.isEditMode.set(true);

    this.teamForm.patchValue({
      _id: member._id,
      name: member.name,
      role: member.role,
      bio: member.bio || '',
      photo: member.photo,
      linkedin: member.socialLinks?.linkedin || '',
      github: member.socialLinks?.github || '',
      isActive: member.isActive,
    });

    this.photoPreview.set(this.getImgUrl(member.photo));
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.isEditMode.set(false);
    this.photoPreview.set(null);
    this.photoError.set(null);
    this.selectedFile = null;
  }

  confirmDelete(member: TeamMember): void {
    this.memberToDelete.set(member);
    this.showDeleteModal.set(true);
  }

  closeDeleteModal(): void {
    this.showDeleteModal.set(false);
    this.memberToDelete.set(null);
    this.isDeleting.set(false);
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.match(/image\/*/) || file.size > 5 * 1024 * 1024) {
        this.photoError.set('Please upload an image file (max 5MB)');
        return;
      }
      this.photoError.set(null);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photoPreview.set(e.target.result);
      };
      reader.readAsDataURL(file);

      this.selectedFile = file;
    }
  }

  clearSuccessMessage(): void {
    this.successMessage.set('');
  }

  clearErrorMessage(): void {
    this.errorMessage.set('');
  }

  getImgUrl(path: string) {
    return `${environment.imageUrl}/${path}`;
  }
}
