import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-task-form',
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css'],
  imports: [CommonModule, RouterModule]
})
export class TaskFormComponent implements OnInit {
  tasks: any[] = [];
  loading = false;
  error = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch tasks.';
        this.loading = false;
      }
    });
  }

  deleteTask(id: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.tasks = this.tasks.filter(task => task._id !== id);
      });
    }
  }

  markCompleted(task: any) {
    const updated = { ...task, completed: true };
    this.taskService.updateTask(task._id, updated).subscribe(() => {
      task.completed = true;
    });
  }

  viewTask(task: any) {
    alert(`
Task: ${task.title}
Description: ${task.description}
Due: ${task.dueDate}
Priority: ${task.priority}
    `);
  }
}
