import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjetserviceService } from 'src/app/Services/ProjectServices/projetservice.service';
import { ProjectDetailsComponentComponent } from './project-details-component/project-details-component.component';
import { Router } from '@angular/router';
import { UpdateprojectComponent } from '../updateproject/updateproject.component';
import { GroupGenerateComponentComponent } from '../group-generate-component/group-generate-component.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/Services/ProjectServices/notification.service';
import { Tasks } from 'src/app/Models/ProjectEntities/Tasks';

@Component({
  selector: 'app-getallproject',
  templateUrl: './getallproject.component.html',
  styleUrls: ['./getallproject.component.css']
})
export class GetallprojectComponent implements OnInit {
  projects: any[] = [];
  notificationCount: number = 0;
  notifications: string[] = [];
  tasks :Tasks[] = [];
  constructor(private notificationService: NotificationService ,private projectService: ProjetserviceService,private dialog: MatDialog,private router :Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllproject();
    this.notificationService.getNotifications().subscribe((notification: string) => { // Explicitly define the type of notification as string
      // Handle notification
      console.log('Notification Received:', notification);
      this.notifications.push(notification); // Add new notification to the array
      this.notificationCount = this.notifications.length; // Update notification count
    });
  }
  

  getAllproject() {
    this.projectService.getAllproject().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.projects = data;
          console.log('Projects with tasks:', this.projects); // Log projects data to inspect tasks
        } else {
          console.error("Expected an array of projects, but received:", data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Function to open the popup/modal
  showMore(project: any) {
    const dialogRef = this.dialog.open(ProjectDetailsComponentComponent, {
      width: '500px', // Set the width of the popup/modal
      data: project // Pass the project data to the dialog component
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  goToAddProject() {
    // Navigate to the "Project" component route
    this.router.navigate(['/addProject']);
  }


  deleteProject(project: any): void {
    // Assuming you have a method in your project service to delete a project
    this.projectService.delete(project.id).subscribe(
      () => {
        // If the deletion is successful, remove the project from the projects array
        this.projects = this.projects.filter(p => p.id !== project.id);
        console.log('Project deleted successfully.');
      },
      error => {
        console.error('Error deleting project:', error);
        // Handle error as needed, e.g., display an error message to the user
      }
    );
  }


 // Method to open update project dialog
  updateProject(project: any): void {
    const dialogRef = this.dialog.open(UpdateprojectComponent, {
      width: '500px',
      data: project
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'updated') {
        // If project is updated successfully, refresh the project list
        this.getAllproject();
      }
    });
  }

  assignStudentsToGroup(projectId: string): void {
    this.projectService.assignStudentsToGroup(projectId).subscribe(
      () => {
        // Update hasGroupProject field for the project after successfully assigning students to group
        const project = this.projects.find(p => p.id === projectId);
        if (project) {
          project.hasGroupProject = true; // Assuming group assignment means the project has a group
          this.notificationService.sendNotification('A new group has been assigned to a project.'); 
        }
        this.openSnackBar('Group assigned to project successfully', 'success');
      },
      error => {
        console.error('Error assigning group to project:', error);
        this.openSnackBar('This project already has a project ', 'wrong');
      }
    );
  }
  

  openSnackBar(message: string, type: string) {
    this.snackBar.open(message, '', {
      duration: 4000,
      panelClass: [type === 'success' ? 'success-snackbar' : 'wrong-snackbar', 'center-snackbar'],
      // Make sure the vertical position is set to middle
    });
  }
  





}
