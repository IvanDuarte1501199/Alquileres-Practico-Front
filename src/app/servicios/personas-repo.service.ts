import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../models/Persona';

@Injectable({
  providedIn: 'root'
})
export class PersonasRepoService {

  listadoPersonas: Persona[] = [];
  personaAmostrar: Persona = new Persona('', '', null, null, '');
  personaLogeada: Persona = new Persona('', '', null, null, '');
  nombresDueños: string[] = [];
  constructor(private _httpClient: HttpClient) { }

  getAllPersonas() {
    this._httpClient.get<Persona[]>('http://localhost:4000/api/personas')
      .subscribe(
        (data) => {
          this.listadoPersonas = data
          
          //carga de nombres de dueños 
          

          /* 
          this._personasRepoService.getPersonaById(propiedad.dueñoId).subscribe((per) => {
            this._personasRepoService.nombresDueños[propiedad.id] = per.nombre;
          })
            */
        });
  }

  getPersonaById(personaId: number) {
    return this._httpClient.get<Persona>(`http://localhost:4000/api/personas/${personaId}`);
  }

  agregarPersona(nuevaPersona: Persona) {
    return this._httpClient.post('http://localhost:4000/api/personas', nuevaPersona);
  }

  borrarPersona(personaId: number) {
    return this._httpClient.delete(`http://localhost:4000/api/personas/${personaId}`);
  }

  actualizarPersona(persona: Persona) {
    return this._httpClient.put(`http://localhost:4000/api/personas/${persona.id}`, persona);
  }
}
