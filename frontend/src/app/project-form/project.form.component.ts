import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { AlertService } from '../services/alert.service';

@Component({
  standalone: true,
  selector: 'app-project-form',
  templateUrl: './project.form.component.html',
  styleUrls: ['./project.form.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class ProjectFormComponent implements OnInit {
  project: any = { title: '', description: '', projectManager: '', status: '' };
  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const projectId = params['id'];
      if (projectId) {
        this.isEditMode = true;
        this.loadProject(projectId);
      }
    });
  }

  loadProject(id: string) {
    this.projectService.getProjectById(id).subscribe((data: any) => {
      this.project = data;
    });
  }

  onCancel() {
    this.router.navigate(['/projects']);
  }

  saveProject() {
    if (!this.project.title || !this.project.description || !this.project.projectManager || !this.project.status) {
      this.alertService.showMessage('danger', 'All fields are required!');
      return;
    }

    if (this.isEditMode) {
      this.projectService.updateProject(this.project._id, this.project).subscribe(() => {
        this.alertService.showMessage('info', 'Project updated successfully!');
        this.router.navigate(['/projects']);
      });
    } else {
      this.projectService.createProject(this.project).subscribe(() => {
        this.alertService.showMessage('info', 'Project created successfully!'); 
        this.router.navigate(['/projects']);
      });
    }
  }
}
