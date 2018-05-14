import { Injectable } from '@angular/core';
import { Lessons, Lesson } from './class.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';



@Injectable()
export class LessonsService {

    private lessons: Lesson[] = Lessons.filter(() => true);

    public getLessons(): Lesson[] {
        return this.lessons.filter(() => true);
    }

    public addLesson(lesson: Lesson): void {
        this.lessons.push(lesson);
    }

    public removeLesson(lessonId: number): void {
        const ind = this.lessons.findIndex((el) => {
            return el.id === lessonId;
        });
        this.lessons.splice(ind, 1);
    }

    public updateLesson(lesson: Lesson): void {
        const ind = this.lessons.findIndex((les)=>les.id===lesson.id);
        if(ind === -1) {
            return;
        }
        this.lessons[ind] = lesson;
    }

    public getLessonsObservable() {
        return of(this.lessons);
    }

}