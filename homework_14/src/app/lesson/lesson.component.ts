import { Component, Input } from '@angular/core';
import { Lesson } from '../class.model';
import { LessonsService } from '../lessons.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent {


  public isEdit: boolean = false;
  public tempValue: Lesson;

  @Input() public data: Lesson;

  public constructor(
    public lessonsService: LessonsService
  ) { }

  public onDelete(): void {
    this.lessonsService.removeLesson(this.data.id);
  }

  public onEdit(): void {
    this.tempValue = { ...this.data };
    this.isEdit = true;
  }

  public onSave(): void {
    this.lessonsService.updateLesson(this.tempValue);
    this.isEdit = false;
  }

  public onCancel(): void {
    this.isEdit = false;
  }

}
