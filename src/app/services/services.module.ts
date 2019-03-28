import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitoramentoService } from './monitoramento/monitoramento.service';
import { AngularFireDatabase } from 'angularfire2/database';

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    AngularFireDatabase,
    MonitoramentoService
  ],
  entryComponents: [],
  exports: []
})
export class ServicesModule {}