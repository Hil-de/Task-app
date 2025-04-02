import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

interface Itask {
  title: string;
  descrip: string;
  complete: boolean;
  date?: Date;
}

interface Imessage {
  main: string;
  sub: string;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  @ViewChild('titleInput') titleInput!: ElementRef;
  taskForm: any = FormGroup;
  picker: any;

  ngOnInit() {
    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      descrip: new FormControl('', [Validators.required]),
      date: new FormControl({value:null, disabled: false}),
    });
  }

  tasks: Itask[] = [];
  completedtasks: Itask[] = [
    { title: 'Tarea 4', descrip: 'Descripción de la tarea 4', complete: true },
    { title: 'Tarea 5', descrip: 'Descripción de la tarea 5', complete: true },
  ];

  showForm: boolean = false;
  toggleForm() {
    this.showForm = !this.showForm;
    this.focusInput();
  }

  focusInput() {
    if (this.showForm) {
      setTimeout(() => {
        this.titleInput.nativeElement.focus();
      });
    }
  }

 
  selectedDateType: 'today' | 'tomorrow' | 'calendar' | null = null;

  setTaskDate(type: 'today' | 'tomorrow' | 'calendar') {

    if(this.selectedDateType === type){
      this.selectedDateType = null;
      this.taskForm.get('date')?.setValue(null);
      return
    }

    const today = new Date();
    let selectedDate = new Date(today)

    if(type === 'tomorrow'){
      selectedDate.setDate(today.getDate() + 1);
    }

    this.selectedDateType = type;
    this.taskForm.get('date')?.setValue(selectedDate);

    console.log(this.taskForm.get('date').value)
  }

  resettasks() {
    this.taskForm.reset();
    this.selectedDateType = null;
  }

  pushtasks() {
    if (
      this.taskForm.get('title').valid ||
      this.taskForm.get('descrip').valid
    ) {
      const newtask: Itask = {
        title: this.taskForm.value.title,
        descrip: this.taskForm.value.descrip,
        complete: false,
        date: this.taskForm.value.date,
      };
      this.tasks.push(this.taskForm.value);
      console.log(this.taskForm.value);
      this.resettasks();
      this.toggleForm();
      
    }
  }

  estateCheck(task: Itask) {
    task.complete = !task.complete;
    if (task.complete) {
      const index = this.tasks.indexOf(task);
      if (index > -1) {
        this.tasks.splice(index, 1);
        this.completedtasks.push(task);
      }
    } else {
      const index = this.completedtasks.indexOf(task);
      if (index > -1) {
        this.completedtasks.splice(index, 1);
        this.tasks.push(task);
      }
    }
  }

  deleteTask(task: Itask) {
    // Buscar y eliminar la tarea del array correspondiente
    const indexInTasks = this.tasks.indexOf(task);
    if (indexInTasks > -1) {
      this.tasks.splice(indexInTasks, 1);
      return;
    }

    // Si no está en tasks, buscar en completedtasks
    const indexInCompleted = this.completedtasks.indexOf(task);
    if (indexInCompleted > -1) {
      this.completedtasks.splice(indexInCompleted, 1);
    }
  }

  showMessage(): Imessage {
    if (this.tasks.length === 0 && this.completedtasks.length === 0) {
      return {
        main: 'Aun no hay tareas',
        sub: 'Agrega tareas para llevar un seguimiento de ellas',
      };
    } else if (this.tasks.length === 0 && this.completedtasks.length > 0) {
      return {
        main: 'Se han completado todas las tareas',
        sub: '¡Buen trabajo!',
      };
    }
    return {
      main: '',
      sub: '',
    };
  }

  showCompletedTask: boolean = false;
  toogleCompletedTask() {
    this.showCompletedTask = !this.showCompletedTask;
  }

  completedTaskCount(): number {
    return this.completedtasks.length;
  }
}
