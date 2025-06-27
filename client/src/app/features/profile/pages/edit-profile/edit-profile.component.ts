import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../data/model/user.model';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {

  user: User | null = null;
  currentUser: User | null = null;
  userId: string = '';
  isAdminView = false;

  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.currentUser = this.auth.getCurrentUser();

    this.userId = this.route.snapshot.paramMap.get('id') || this.currentUser?.userId!;

    this.isAdminView = this.route.snapshot.url[0]?.path === 'users';

    if (!this.currentUser || (!this.isAdminView && this.userId !== this.currentUser.userId)) {
      this.router.navigate(['admin/unauthorized']);
      return;
    }

    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      status: [''],
      address: [''],
      city: [''],
      country: [''],
      postalCode: [''],
      about: [''],
    });

    this.loadProfile(this.userId);
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
    console.log('Form values after patch:', this.form.value);
  }

  save() {
    if (this.form.invalid) return;

    const updatedData = this.form.getRawValue();

    this.userService.updateUserProfile(this.userId, updatedData).subscribe({
      next: () => {
        alert('Profile updated successfully!');
        this.goToProfile();
      },
      error: () => {
        alert('Update failed.');
      },
    });
  }

  goToProfile() {
    const path = this.isAdminView
      ? `/admin/users/${this.userId}`
      : `/profile`;
    this.router.navigate([path]);
  }
}
