import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { catchError, forkJoin, of } from 'rxjs';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function initApp(http: HttpClient, translate: TranslateService) {
  return () =>
    new Promise<boolean>((resolve: (res: boolean) => void) => {
      const defaultLocale = 'pt-BR';
      const translationsUrl = '/assets/i18n/translations';
      const sufix = '.json';
      const storageLocale = localStorage.getItem('locale');
      const locale = storageLocale || defaultLocale;

      forkJoin([
        http.get(`/assets/i18n/dev.json`).pipe(catchError(() => of(null))),
        http
          .get(`${translationsUrl}/${locale}${sufix}`)
          .pipe(catchError(() => of(null))),
      ]).subscribe((response: any[]) => {
        const devKeys = response[0];
        const translatedKeys = response[1];

        translate.setTranslation(defaultLocale, devKeys || {});
        translate.setTranslation(locale, translatedKeys || {}, true);

        translate.setDefaultLang(defaultLocale);
        translate.use(locale);

        resolve(true);
      });
    });
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent, CardComponent, FormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LazyLoadImageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initApp,
    //   deps: [HttpClient, TranslateService],
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private translate: TranslateService) {
    // Set default language (e.g., English)
    this.translate.setDefaultLang('pt-BR');
    // Add other supported languages
    this.translate.addLangs(['en']);
    // Set the current language (you can change this dynamically)
    this.translate.use('pt-BR');
  }
}
