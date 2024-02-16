import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {provideHttpClient, withFetch} from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err))
{
  {
    [provideHttpClient(withFetch())]
  }
}
// Inicializa ToastrModule.forRoot() aquí
ToastrModule.forRoot();
