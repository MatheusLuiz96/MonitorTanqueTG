import { TestBed } from '@angular/core/testing';

import { MonitoramentoService } from './monitoramento.service';

describe('MonitoramentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MonitoramentoService = TestBed.get(MonitoramentoService);
    expect(service).toBeTruthy();
  });
});
