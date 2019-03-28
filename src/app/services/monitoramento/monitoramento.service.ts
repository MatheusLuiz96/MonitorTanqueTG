import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Monitoramento } from '../../models/monitoramento';

@Injectable()
export class MonitoramentoService {
	constructor(private afDB: AngularFireDatabase) {
		// this.addNew();
		// setInterval(()=>{
		// 	this.addNew();
		// }, 50000)
	}
	getLast()
	{
		return this.afDB.list('/sensor', ref=> ref.orderByChild('timestamp').startAt(Date.now() - 50000))
		.stateChanges();
	}
	addNew()
	{
		console.log("adding");
		return this.afDB.list('/sensor').push({ litros: Math.floor(Math.random() * 1024) + 1 ,  timestamp: { ".sv" : "timestamp"} })
	}
}