import { Component } from '@angular/core';
//SERVICE
import { TodosService } from '../../services/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  text: string = '';

  constructor(private todoService: TodosService) {
    this.todoService.todos$.subscribe((todos) => {
      console.log('Todos Array', todos);
    });
  }

  changeText = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  };

  addTodo = (): void => {
    console.log('Todo:', this.text);
    this.todoService.addTodo(this.text);
    this.text = '';
  };
}
