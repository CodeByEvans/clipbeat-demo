import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  reorderThreeOutline,
  starOutline,
  star,
  create,
  logoInstagram,
  logoYoutube,
  shareOutline,
  lockClosedOutline,
  shieldCheckmarkOutline,
  trashOutline,
  logOutOutline,
  heartOutline,
  chatbubbleOutline,
} from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

addIcons({
  'chevron-back-outline': chevronBackOutline,
  'share-outline': shareOutline,
  'reorder-three-outline': reorderThreeOutline,
  'star-outline': starOutline,
  star,
  create,
  'logo-instagram': logoInstagram,
  'logo-youtube': logoYoutube,
  'lock-closed-outline': lockClosedOutline,
  'shield-checkmark-outline': shieldCheckmarkOutline,
  'trash-outline': trashOutline,
  'log-out-outline': logOutOutline,
  'heart-outline': heartOutline,
  'chatbubble-outline': chatbubbleOutline,
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
