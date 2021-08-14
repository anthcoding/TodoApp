import { Component } from '@angular/core';
//SERVICES
import { TodosService } from '../../services/todo.service';
//RXJS
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//TYPES
import { TodoInterface } from '../../types/todo.interface';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent {
  visibleTodos$: Observable<TodoInterface[]>;
  allTodosSelected$: Observable<boolean>;
  editingId: string | null = null;
  noTodosClass$: Observable<boolean>;
  filter$: Observable<FilterEnum>;

  constructor(private todosService: TodosService) {
    this.noTodosClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
    this.filter$ = this.todosService.filter$;

    this.allTodosSelected$ = this.todosService.todos$.pipe(
      map((todos) => todos.every((todo) => todo.isCompleted))
    );

    this.visibleTodos$ = combineLatest(
      this.todosService.todos$,
      this.todosService.filter$
    ).pipe(
      map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
        if (filter === FilterEnum.active) {
          return todos.filter((todo) => !todo.isCompleted);
        } else if (filter === FilterEnum.completed) {
          return todos.filter((todo) => todo.isCompleted);
        }
        return todos;
      })
    );
  }

  toggleAllTodos = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAll(target.checked);
  };

  setEditingId = (editingId: string | null): void => {
    this.editingId = editingId;
  };
}
