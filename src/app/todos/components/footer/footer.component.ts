import { Component } from '@angular/core';
import { TodosService } from '../../services/todo.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  noTodosClass$: Observable<boolean>;
  filterEnum = FilterEnum;
  filter$: Observable<FilterEnum>;

  constructor(private todoService: TodosService) {
    this.noTodosClass$ = this.todoService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
    this.filter$ = this.todoService.filter$;
  }

  changeMenu = (event: Event, filterName: FilterEnum) => {
    event.preventDefault();
    console.log(filterName);
    this.todoService.changeFilter(filterName);
  };
}
