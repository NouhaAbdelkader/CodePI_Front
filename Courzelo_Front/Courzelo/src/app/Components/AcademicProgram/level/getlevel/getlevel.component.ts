import { Component } from '@angular/core';
import { Level } from 'src/app/Models/AcademicProgramEntities/Level';
import { LevelServiceService } from 'src/app/Services/AcademicProgramServices/Level/level-service.service';

@Component({
  selector: 'app-getlevel',
  templateUrl: './getlevel.component.html',
  styleUrls: ['./getlevel.component.css']
})
export class GetlevelComponent {
  levels: Level[] = [];
  message ="";
  currentLevel:any;

  constructor(private levelService: LevelServiceService) { }

  ngOnInit() {
    this.getAllLevels();
  }

  getAllLevels() {
    this.levelService.getAlllevel().subscribe(
      (data: any) => {
        // Check if data is an array before assigning
        if (Array.isArray(data)) {
          this.levels = data;
          console.log(data);
        } else {
          console.error("Expected an array of levels, but received:", data);
        }
      },
      (error) => {
        console.log(error);
      }
    );

  }

  updateLevel(level: Level): void {
    this.levelService.updateLevel(level).subscribe(updatedLevel => {
      // Handle the updated level as needed
      console.log('Level updated:', updatedLevel);
    });
  }

  deleteLevel(levelId: string): void {
    if (confirm("Are you sure you want to delete this level?")) {
      this.levelService.delete(levelId).subscribe(
        () => {
          console.log('Level deleted successfully');
          // Optionally, you can refresh the levels after deletion
          this.getAllLevels();
        },
        (error) => {
          console.error('Error deleting level:', error);
          // Handle error, display an error message, etc.
        }
      );
    }
  }
}

