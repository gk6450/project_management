import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { SocketService } from '../services/socket.service';

@Component({
  standalone: true,
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  filteredProjects: any[] = [];
  notifications: any[] = [];
  searchTerm: string = '';
  filterStatus: string = 'All';
  sortOption: string = 'none';
  role: string = localStorage.getItem('role') || 'Viewer';

  constructor(
    private projectService: ProjectService,
    private socketService: SocketService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProjects();

    this.socketService.onNotification().subscribe((data: any) => {
      data.read = false;
      this.notifications.unshift(data);

      this.loadProjects();
    });
  }

  loadProjects() {
    this.projectService.getProjects().subscribe((data: any) => {
      this.projects = data;
      this.applyFilters();
    });
  }

  deleteProject(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe(() => {
        this.loadProjects();
      });
    }
  }

  editProject(id: string) {
    this.router.navigate(['/project-form'], { queryParams: { id } });
  }

  createProject() {
    this.router.navigate(['/project-form']);
  }

  markAsRead(notification: any) {
    notification.read = true;
  }

  applyFilters() {
    let filtered = this.projects;

    if (this.searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.filterStatus !== 'All') {
      filtered = filtered.filter(project =>
        project.status === this.filterStatus
      );
    }

    if (this.sortOption === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.sortOption === 'status') {
      filtered.sort((a, b) => a.status.localeCompare(b.status));
    } else if (this.sortOption === 'projectManager') {
      filtered.sort((a, b) => a.projectManager.localeCompare(b.projectManager));
    }
  
    this.filteredProjects = filtered;
  }
  
}
