import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from '../../../../core/services/site.service';
import { Site } from '../../../../data/model/site.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-site-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.scss']
})
export class SiteDetailComponent implements OnInit {
  siteId: string = '';
  site: Site | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private siteService: SiteService
  ) {}

  ngOnInit() {
    this.siteId = this.route.snapshot.paramMap.get('id')!;
    this.siteService.getSiteById(this.siteId).subscribe({
      next: (site) => {
        this.site = site;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load site:', err);
        this.loading = false;
      }
    });
  }
}
