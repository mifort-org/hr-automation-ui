import { NgModule } from '@angular/core';

import { StatusPipe } from './status.pipe';
import { FullnamePipe } from './fullname.pipe';

@NgModule({
  declarations: [FullnamePipe, StatusPipe],
  exports: [FullnamePipe, StatusPipe],
})
export class AppPipesModule {}
