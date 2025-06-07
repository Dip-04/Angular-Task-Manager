import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task'; // ✅ Import your service
import { HttpClientModule } from '@angular/common/http'; // If needed

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html', // ✅ Corrected path
  styleUrls: ['./task-list.css'],
  standalone: true, // ✅ Needed if you're using 'imports' in the component
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule // Optional if needed
  ]
})
export class TaskListComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {} // ✅ Inject TaskService

ngOnInit() {
  this.taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    dueDate: ['', Validators.required],
    priority: ['medium', Validators.required],
    completed: [false] // ✅ Added completed field
  });
}

  onSubmit() {
  if (this.taskForm.invalid || !this.taskForm.value.title.trim()) return;

  this.taskService.createTask(this.taskForm.value).subscribe(() => {
    this.taskForm.reset({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      completed: false
    });
  });
}


  get title() {
    return this.taskForm.get('title');
  }

  get dueDate() {
    return this.taskForm.get('dueDate');
  }

  get priority() {
    return this.taskForm.get('priority');
  }
}
