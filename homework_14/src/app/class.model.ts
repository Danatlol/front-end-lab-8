

export class Lesson {
    public constructor(
        public id: number = 0,
        public topic: string = "",
        public date: string = "",
        public lecture: string = ""
    ){}
}


export const Lessons: Lesson[] = [
    new Lesson(1,"HTML5",new Date().toDateString(), "Man"),
    new Lesson(2,"CSS",new Date().toDateString(), "NaN"),
    new Lesson(3,"Angular",new Date().toDateString(), "Undefined"),
    new Lesson(4,"React",new Date().toDateString(), "null")
];
