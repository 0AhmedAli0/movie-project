import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SavedComponent } from './saved/saved.component';

@NgModule({
  declarations: [
    SavedComponent
  ],
  imports: [CommonModule, SettingsRoutingModule, ProfileComponent],
})
export class SettingsModule {}
