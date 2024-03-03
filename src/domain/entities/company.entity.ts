import { States } from "../interfaces/states";
import { GeneralManagerEntity } from "./general-manager.entity";
import { RepresentativeEntity } from "./representative.entity";
import { SupervisorEntity } from "./supervisor.entity";

export class CompanyEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly razon_social: string,
    public readonly ruc: string,
    public readonly distrito: string,
    public readonly provincia: string,
    public readonly address: string,
    public readonly state: States,

    public readonly Representative?: RepresentativeEntity,
    public readonly GeneralManager?: GeneralManagerEntity,
    public readonly Supervisor?: SupervisorEntity,

    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const {
      id,
      name,
      email,
      razon_social,
      ruc,
      distrito,
      provincia,
      address,
      state,

      Representative,
      GeneralManager,
      Supervisor,

      createdAt,
      updatedAt,
    } = object;

    if (!id) throw "missing id";
    if (!name) throw "missing name";
    if (!email) throw "missing email";
    if (!razon_social) throw "missing razon_social";
    if (!ruc) throw "missing ruc";
    if (!distrito) throw "missing distrito";
    if (!provincia) throw "missing provincia";
    if (!address) throw "missing address";
    if(!state) throw 'missing state';
    if(!(state as States)) throw 'missing state';

    return new CompanyEntity(
      id,
      name,
      email,
      razon_social,
      ruc,
      distrito,
      provincia,
      address,
      state,
      
      Representative,
      GeneralManager,
      Supervisor,

      updatedAt,
      createdAt
    );
  }
}
