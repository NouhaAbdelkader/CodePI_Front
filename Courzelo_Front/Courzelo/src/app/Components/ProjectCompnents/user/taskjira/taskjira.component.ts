import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/Models/ProjectEntities/Project';
import { Tasks, status } from 'src/app/Models/ProjectEntities/Tasks';
import { ProjetserviceService } from 'src/app/Services/ProjectServices/projetservice.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Observable, catchError, switchMap } from 'rxjs';


@Component({
  selector: 'app-taskjira',
  templateUrl: './taskjira.component.html',
  styleUrls: ['./taskjira.component.css']
})
export class TaskjiraComponent {
  todoTasks$: Tasks[]=  [];
  inProgressTasks$: Tasks[]=  [];
  doneTasks$:Tasks[]=  [];
  list!:Tasks[];

  constructor(private tasksService: ProjetserviceService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.tasksService.getTasksByStatus(status.ToDo)
      .subscribe(tasks => this. todoTasks$ = tasks);
    this.tasksService.getTasksByStatus(status.InProgress)
      .subscribe(tasks => this.inProgressTasks$ = tasks);

    this.tasksService.getTasksByStatus(status.Done)
      .subscribe(tasks => this.doneTasks$ = tasks,
         );

  }
   onTaskDropped(event: any, newStatus: string) {
    const taskId = event.item.element.nativeElement.id;
    const newStatusEnum: status = status[newStatus as keyof typeof status]; // Convert string to enum
    this.tasksService.moveTask(taskId, newStatusEnum).subscribe(()=>{this.ngOnInit()} );
      /*.pipe(
        switchMap(() => {
          // Reload tasks after moving one
          return this.tasksService.getTasksByStatus(newStatusEnum);
        }),
        catchError(error => {
          console.error('Error moving task:', error);
          // Handle error
          return [];
        })
      )
      .subscribe(tasks => {
        // Update the corresponding task list
        if (newStatusEnum === status.ToDo) {
          this.todoTasks = tasks;
        } else if (newStatusEnum === status.InProgress) {
          this.inProgressTasks = tasks;
        } else if (newStatusEnum === status.Done) {
          this.doneTasks = tasks;
        }
      });*/
  } 
  calculateProgress(): number {
    let tot = this.doneTasks$.length + this.inProgressTasks$.length + this.todoTasks$.length;
    let perc = this.doneTasks$.length + (this.inProgressTasks$.length /2 )
    let f = (perc/tot )*100 ;
    return f;
    //const tasksInStatus = status.tasks.length;
    //return  this.doneTasks$.length > 0 ? (tasksInStatus /this.doneTasks$.length  ) * 100 : 0;
  }
}
