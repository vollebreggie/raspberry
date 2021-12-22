import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { AppComponent } from './app.component';
import { MessageService } from './services/MessageService';
import { WebsocketService } from './services/WebsocketService';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { RootComponent } from './components/root/root.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConsoleComponent } from './components/console/console.component';
import { ScheduleService } from './services/ScheduleService';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { SchedulePeriodComponent } from './components/schedule-period/schedule-period.component';
import { WeekComponent } from './components/week/week.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RecipeService } from './services/RecipeService';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimeAgoPipe } from 'time-ago-pipe';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingListService } from './services/ShoppingListService';
import { MusicComponent } from './components/music/music.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { TimeConversionPipe } from './pipes/time-conversion.pipe';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ComponentListComponent } from './components/component-list/component-list.component';
import { ComponentDetailsComponent } from './components/component-details/component-details.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ProjectService } from './services/ProjectService';
import { ComponentService } from './services/ComponentService';
import { BaseTaskService } from './services/BaseTaskService';
import { ProjectCommandoService } from './services/ProjectCommandoService';
import { WeekService } from './services/WeekService';
import { RedDotComponent } from './components/red-dot/red-dot.component';

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader =>  new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [AppComponent, SideBarComponent, NotificationsComponent, RootComponent, ConsoleComponent, ScheduleComponent, SchedulePeriodComponent, WeekComponent, RecipeDetailsComponent, TimeAgoPipe, RecipeListComponent, ShoppingListComponent, MusicComponent, MusicPlayerComponent, TimeConversionPipe, ProjectListComponent, ProjectDetailsComponent, ComponentListComponent, ComponentDetailsComponent, TaskDetailsComponent, TaskListComponent, RedDotComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgbModule
  ],
  providers: [WeekService, MessageService, WebsocketService, ScheduleService, RecipeService, ShoppingListService, ProjectService, ComponentService, BaseTaskService, ProjectCommandoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
