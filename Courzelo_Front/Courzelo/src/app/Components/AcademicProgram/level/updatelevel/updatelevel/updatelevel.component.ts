import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Level } from 'src/app/Models/AcademicProgramEntities/Level';
import { LevelServiceService } from 'src/app/Services/AcademicProgramServices/Level/level-service.service';

@Component({
  selector: 'app-updatelevel',
  templateUrl: './updatelevel.component.html',
  styleUrls: ['./updatelevel.component.css']
})
export class UpdatelevelComponent implements OnInit {
  message = '';
  currentLevel: any;
  updatedLevel: any; // Define the 'updatedLevel' property here

  constructor(
    private levelService: LevelServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.message = '';
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getLevel(id);
    });
  }

  getLevel(id: any) {
    this.levelService.getlevel(id).subscribe(
      (data) => {
        this.currentLevel = data;
        console.log('Level retrieved:', data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateLevel(): void {
    this.levelService.updateLevel(this.currentLevel).subscribe(updatedLevel => {
      // Handle the updated level as needed
      console.log('Level updated:', updatedLevel);
      this.router.navigate(['/getalllevels']);
     
    });
  }
 
}
  
