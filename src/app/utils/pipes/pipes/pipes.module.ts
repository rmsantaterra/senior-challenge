import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertToFormatDateBrPipe } from '../convert-to-format-date-br.pipe';

@NgModule({
  declarations: [ConvertToFormatDateBrPipe],
  imports: [
    CommonModule
  ],
  exports: [ConvertToFormatDateBrPipe]
})
export class PipesModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: PipesModule,
      providers: []
    };
  }
}
