import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//ROUTING
import { AppRoutingModule } from './app-routing.module';
//COMPONENTS
import { AppComponent } from './app.component';
//MODULES
import { TodosModule } from './todos/todos.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, TodosModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
