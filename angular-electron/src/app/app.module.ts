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

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader =>  new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [AppComponent, SideBarComponent, NotificationsComponent, RootComponent, ConsoleComponent],
  imports: [
    BrowserModule,
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
  providers: [MessageService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule {}
