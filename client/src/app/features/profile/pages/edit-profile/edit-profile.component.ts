import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../data/model/user.model';
import { FooterComponent } from "../../../../shared/footers/footer/footer.component";

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FooterComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {

  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.auth.getCurrentUser();
    if (!currentUser) {
      this.router.navigate(['/auth']);
      return;
    }

    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      status: [''],
    });

    this.loadProfile(currentUser.userId);
  }

  loadProfile(userId: string) {
    this.loading = true;
    this.userService.getUserProfile(userId).subscribe({
      next: (user: User) => {
        this.form.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          status: user.status,
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Profile load failed', err);
        this.loading = false;
      },
    });
  }

  save() {
    if (this.form.invalid) return;

    const updatedData = this.form.getRawValue();
    const userId = this.auth.getCurrentUser()?.userId;

    this.userService.updateUserProfile(userId, updatedData).subscribe({
      next: () => {
        alert('Profile updated successfully!');
        this.router.navigate(['/profile']);
      },
      error: () => {
        alert('Update failed.');
      },
    });
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
