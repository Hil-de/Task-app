import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


interface Itask {
  title: string;
  descrip: string;
  complete: boolean
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  taskForm: any = FormGroup;

  ngOnInit() {
    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      descrip: new FormControl('', [Validators.required]),
    });
  }

  tasks: Itask[] = [
    { title: 'Tarea 1', descrip: 'Descripción de la tarea 1', complete: false },
    { title: 'Tarea 2', descrip: 'Descripción de la tarea 2', complete: false },
    { title: 'Tarea 3', descrip: 'Descripción de la tarea 3', complete: false }
  ];
  completedtasks: Itask[] = [
    { title: 'Tarea 4', descrip: 'Descripción de la tarea 4', complete: true },
    { title: 'Tarea 5', descrip: 'Descripción de la tarea 5', complete: true }
  ];
  showForm: boolean = false;

  toggleForm() {
    this.showForm = !this.showForm;
  }

  resettasks() {
    this.taskForm.reset();
  }

  pushtasks() {
    if (this.taskForm.get('title').valid || this.taskForm.get('descrip').valid) {
      const newtask: Itask = {
        title: this.taskForm.value.title,
        descrip: this.taskForm.value.descrip,
        complete: false
      };
    this.tasks.push(this.taskForm.value);
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

}
