import moment from 'moment';
import jsonContract from "./data/contract.json";
import {ContractModel} from './models/contract';
import * as XLSX from 'xlsx';

class Contract{

  private contract:ContractModel

  constructor() {
    this.contract = jsonContract.contract
  }

  public formatData() {

    // Transform ISO date to human readable one
    this.contract.rent.date_start = moment(this.contract.rent.date_start).format('DD/MM/YYYY à hh:mm')
    this.contract.rent.date_end = moment(this.contract.rent.date_end).format('DD/MM/YYYY à hh:mm')

    return this.contract

  }

}

class OutputFile{

  private contract: ContractModel

  constructor(cont: ContractModel) {
    this.contract = cont;
  }

  private formatDataFile(contract: ContractModel):Array<object>{

    let items = [
      {"COL1":"", "COL2": ""},
      {"COL1":"Fiche de location de véhicule"},
      {"COL1":"Immatriculation:", "COL2": contract.car.plate_registration},
      {"COL1":"Kilométrage:", "COL2": contract.car.kilometers},
      {"COL1":"Nom/Prénom de l'emprunteur:", "COL2": `${contract.user.name} ${contract.user.firstname}`},
      {"COL1":"Date de début de la location", "COL2": contract.rent.date_start},
      {"COL1":"Date de fin de la location", "COL2": contract.rent.date_end},
      {"COL1":"", "COL2": ""},
      {"COL1":"", "COL2": ""}
    ];

    let defTitle = "Défauts constatés sur le véhicule"

    for(let defect of contract.car.defects){
      items.push({"COL1":defTitle, "COL2": defect})
      defTitle = ""
    }

    return items

  }

  public createFile(){

    // Prepare contract data format for XLSX
    let data = this.formatDataFile(this.contract)

    // XLSX Library Use
    let ws = XLSX.utils.json_to_sheet(data, {skipHeader: true})

    // This snippet allow to change the column size
    let wscols = [
      {wch:28},
      {wch:28}
    ]
  
    ws['!cols'] = wscols
    
    let wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Fiche de location")
    XLSX.writeFile(wb, "uploads/fiche_location.xlsx")
  }

}

let data = new Contract
new OutputFile(data.formatData()).createFile()