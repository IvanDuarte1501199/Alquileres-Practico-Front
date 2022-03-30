import { Component, OnInit } from '@angular/core';
import { PropiedadesRepoService } from 'src/app/servicios/propiedades-repo.service';
import { AlquileresRepoService } from 'src/app/servicios/alquileres-repo.service';
import { PersonasRepoService } from 'src/app/servicios/personas-repo.service';

@Component({
  selector: 'app-datos-propiedad',
  templateUrl: './datos-propiedad.component.html',
  styleUrls: ['./datos-propiedad.component.css']
})
export class DatosPropiedadComponent implements OnInit {
  fechaInicio: Date;
  fechaFin: Date;
  retorno: boolean;
  ver: boolean = false;
  cantDias: number;
  cantDiasTotal:number;
  cantVeces: number;
  constructor(private _propiedadesRepoService: PropiedadesRepoService, private _alquileresRepoService: AlquileresRepoService, private _personasRepoService: PersonasRepoService) {
    this._propiedadesRepoService.getAllPropiedades();
    this._propiedadesRepoService.getAllPropiedadesXduenio();
    this._alquileresRepoService.getAllAlquileres();
  }
  //  cuantas veces y cuantos dias se ha alquilado una propiedad entre dos fechas
  ngOnInit() {

  }
  verDatos() {
    this.cantVeces = 0;
    this.cantDias = 0;
    this.cantDiasTotal = 0;
    var Ifechaini = new Date(this.fechaInicio);
    var Ifechafin = new Date(this.fechaFin);
    if (this.verificarDatos()) {
      this._alquileresRepoService.listadoAlquileres.forEach(alquiler => {
        var Afechaini = new Date(alquiler.fechaInicio);
        var Afechafin = new Date(alquiler.fechaFin);
        this.cantVeces = this.cantVeces + 1;
        if (alquiler.propiedadId == this._propiedadesRepoService.propiedadAmostrar.id) {
          if ((this.fechaInicio >= alquiler.fechaInicio && this.fechaInicio <= alquiler.fechaFin) && (this.fechaFin >= alquiler.fechaInicio && this.fechaFin <= alquiler.fechaFin)) {
            this.cantDias = Ifechafin.getTime() - Ifechaini.getTime();
            this.cantDias = Math.round(this.cantDias / (1000 * 60 * 60 * 24));
            this.cantDiasTotal = this.cantDiasTotal + this.cantDias + 1;
          } else {
            if ((this.fechaInicio >= alquiler.fechaInicio && this.fechaInicio <= alquiler.fechaFin) && !(this.fechaFin >= alquiler.fechaInicio && this.fechaFin <= alquiler.fechaFin)) {
              this.cantDias = Afechafin.getTime() - Ifechaini.getTime();
              this.cantDias = Math.round(this.cantDias / (1000 * 60 * 60 * 24));
              this.cantDiasTotal = this.cantDiasTotal + this.cantDias + 1;
            } else {
              if (!(this.fechaInicio >= alquiler.fechaInicio && this.fechaInicio <= alquiler.fechaFin) && (this.fechaFin >= alquiler.fechaInicio && this.fechaFin <= alquiler.fechaFin)) {
                this.cantDias = Ifechafin.getTime() - Afechaini.getTime();
                this.cantDias = Math.round(this.cantDias / (1000 * 60 * 60 * 24));
                this.cantDiasTotal = this.cantDiasTotal + this.cantDias + 1;
              } else {
                if (this.fechaInicio <= alquiler.fechaInicio && this.fechaFin >= alquiler.fechaFin) {
                  this.cantDias = Afechafin.getTime() - Afechaini.getTime();
                  this.cantDias = Math.round(this.cantDias / (1000 * 60 * 60 * 24));
                  this.cantDiasTotal = this.cantDiasTotal + this.cantDias + 1;
                }
              }
            }
          }
        } 
      });
      this.ver = true;
    }else{
      this.ver = false;
    }
  }



  verificarDatos() {
    this.retorno = true;
    if (this.fechaInicio == null || this.fechaFin == null) {
      alert('Ingrese fechas correctamente');
      this.retorno = false;
    } else {
      if (this.fechaInicio > this.fechaFin) {
        alert('La fecha de fin no puede ser menor a la de inicio');
        this.retorno = false;
      }
    }
    return this.retorno;
  }
}
