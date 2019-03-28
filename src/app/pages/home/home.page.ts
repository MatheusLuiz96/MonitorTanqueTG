import { Component, OnInit } from '@angular/core';
import { MonitoramentoService } from './../../services/monitoramento/monitoramento.service';
import { Monitoramento } from '../../models/monitoramento';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
	// variavel que vai guardar o ultimo monitoramento
	medicaoAtual: Monitoramento;
	currentDegree: any;
	currentSecondsLeft: number;
	degreesPerSecond : number = 180/ 50;
	intervalIncrement: any;
	nextInsertTime : any;
	constructor( private monitoramentoService: MonitoramentoService ) { 

	}

	ngOnInit() {
		console.log("called");
		//Função do nosso service que pega sempre o ultimo monitoramento
		this.monitoramentoService.getLast()
		.subscribe((snapshot)=>{
			if(snapshot.payload && snapshot.type == "child_added")
			{
				console.log(snapshot.payload.val());
				// atribui o ultimo monitoramento para a variavel medicaoatual
				this.medicaoAtual = <Monitoramento>snapshot.payload.val();
				
				// calcula a data do proximo monitoramento
				this.nextInsertTime = new Date( this.medicaoAtual.timestamp + 50000 );
				this.currentSecondsLeft = Math.round((50 - (( Date.now() - new Date(this.medicaoAtual.timestamp).getTime() )/1000)));
				this.currentDegree = this.degreesPerSecond * (Math.abs((( Date.now() - new Date(this.medicaoAtual.timestamp).getTime() )/1000)));
				
				if( this.intervalIncrement ) clearInterval(this.intervalIncrement);
				this.intervalIncrement = setInterval(()=>{
					this.currentSecondsLeft = this.currentSecondsLeft - 1 >= 0 ? this.currentSecondsLeft - 1 : 0;
					this.currentDegree = ( this.currentDegree +this.degreesPerSecond > 180 ? 180 : this.currentDegree +this.degreesPerSecond );
					if( this.currentDegree >= 180 )
					{
						clearInterval(this.intervalIncrement);
					}
				}, 1000);
			}
		})
	}
}