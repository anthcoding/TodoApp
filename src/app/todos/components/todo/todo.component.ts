import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { TodosService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnChanges {
  @Input('todo') todoProps!: TodoInterface;
  @Input('isEditing') isEditingPorps!: boolean;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> =
    new EventEmitter();
  editingText: string = '';

  @ViewChild('textInput') textInput!: ElementRef;

  constructor(private todoService: TodosService) {}

  ngOnInit(): void {
    this.editingText = this.todoProps.text;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.isEditingPorps.currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 0);
    }
  }

  setTodoInEditMode = (): void => {
    console.log('setTodoInEdit mode');
    this.setEditingIdEvent.emit(this.todoProps.id);
  };

  deleteTodo = (): void => {
    this.todoService.deleteTodo(this.todoProps.id);
  };
  toggleTodo = (): void => {
    this.todoService.toggleTodo(this.todoProps.id);
    console.log('Toggle Todo Chekbox');
  };
  changeText = (event: Event): void => {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  };
  changeTodo = (): void => {
    this.todoService.changeTodo(this.todoProps.id, this.editingText);
    this.setEditingIdEvent.emit(null);
  };
}
