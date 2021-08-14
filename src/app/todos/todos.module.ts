import { NgModule } from '@angular/core';
//ROUTING
import { RouterModule, Routes } from '@angular/router';
//COMPONENTS
import { HeaderComponent } from './components/hader/header.component';
import { TodosComponent } from './components/todos/todos.component';
import { ContentComponent } from './components/content/content.component';
import { TodoComponent } from './components/todo/todo.component';
import { FooterComponent } from './components/footer/footer.component';
//ROUTES
const routes: Routes = [{ path: '', component: TodosComponent }];
//SERVICES
import { TodosService } from './services/todo.service';

import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    TodosComponent,
    HeaderComponent,
    ContentComponent,
    TodoComponent,
    FooterComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [TodosService],
})
export class TodosModule {}
