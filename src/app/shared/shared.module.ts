import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialFormsModule } from './material-forms/material-forms.module';
import { WeatherIconComponent } from './weather-icon/weather-icon.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialFormsModule
  ],
  declarations: [WeatherIconComponent],
  exports: [MaterialFormsModule, WeatherIconComponent]
})
export class SharedModule { }
