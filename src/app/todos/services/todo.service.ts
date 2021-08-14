import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//DATA TYPES
import { TodoInterface } from '../types/todo.interface';
import { FilterEnum } from '../types/filter.enum';

@Injectable()
export class TodosService {
  todos$ = new BehaviorSubject<TodoInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  /*************ADD TODO METHOD*************/
  addTodo = (text: string): void => {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(15),
    };
    const updatedTodosArray = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodosArray);
  };
  /*************ADD TODO METHOD*************/

  /*************TOGGLE ALL METHOD*************/
  toggleAll = (isCompleted: boolean): void => {
    console.log('isCompleted', isCompleted);
    const updatedTodos = this.todos$.getValue().map((todo) => {
      return {
        ...todo,
        isCompleted,
      };
    });
    console.log('updatedTodos', updatedTodos);
    this.todos$.next(updatedTodos);
  };
  /*************TOGGLE ALL METHOD*************/

  /*************CHANGE MENU METHOD*************/
  changeFilter = (filterName: FilterEnum): void => {
    this.filter$.next(filterName);
  };
  /*************CHANGE MENU METHOD*************/

  /*************CHANGE TODO FROM NEW INPUT EDITED*************/
  changeTodo = (id: string, text: string): void => {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text,
        };
      }
      return todo;
    });
    this.todos$.next(updatedTodos);
  };
  /*************CHANGE TODO FROM NEW INPUT EDITED*************/

  /*************DELETE TODO*************/
  deleteTodo = (id: string): void => {
    const updatedTodos = this.todos$
      .getValue()
      .filter((todo) => todo.id !== id);
    this.todos$.next(updatedTodos);
  };
  /*************DELETE TODO *************/

  /*************TOGGLE TODO (CHECKBOX) *************/
  toggleTodo = (id: string): void => {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      if (todo.id === id)
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      return todo;
    });
    this.todos$.next(updatedTodos);
  };
  /*************TOGGLE TODO (CHECKBOX) *************/
}
