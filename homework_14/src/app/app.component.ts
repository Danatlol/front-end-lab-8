import { Component, OnInit } from '@angular/core';
import { Lesson } from './class.model';
import { LessonsService } from './lessons.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public constructor(
    public lessonsService: LessonsService
  ) { }

  public less$: Observable<Lesson[]>;

  ngOnInit(): void {
    this.less$ = this.lessonsService.getLessonsObservable();
  }

  public onAddClick(): void {
    let id;
    if (this.lessonsService.getLessons().length !== 0) {
      const ind = this.lessonsService.getLessons().length - 1;
      id = this.lessonsService.getLessons()[ind].id + 1;
    }
    else {
      id = 1;
    }
    this.lessonsService.addLesson(new Lesson(id, "Edit topic", "Edit date", "Edit lecture"));
  }

}
