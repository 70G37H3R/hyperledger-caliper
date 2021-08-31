"use strict";

const { WorkloadModuleBase } = require("@hyperledger/caliper-core");


const Temp = [
  "8.5",
  "23.45",
  "30",
  "17.2",
  "14.4",
  "18.1",
  "24",
  "5.3",
  "10.5",
  "27.2",
];

const Time = [
  "23.08.2021 15:35:33",
  "24.08.2021 12:01:23",
  "25.08.2021 07:01:15",
  "22.08.2021 22:10:33",
  "21.08.2021 04:05:12",
  "20.08.2021 23:02:11",
];

const randomNo = [ "0","1","2","3","4","5","6","7","8","9"];
const randomNo = [ "10","11","12","13","14","15","16","17","18","19"];

/**
 * Workload module for the benchmark round.
 */
class CreateDataWorkload extends WorkloadModuleBase {
  /**
   * Initializes the workload module instance.
   */
  constructor() {
    super();
    this.txIndex = 0;
  }

  /**
   * Assemble TXs for the round.
   * @return {Promise<TxStatus[]>}
   */
  async submitTransaction() {
    // get current time
    this.txIndex++;
    let ranNo = randomNo[Math.floor(Math.random() * randomNo.length)];
    let IdSensor = 'Client' + this.workerIndex + '_Sensor' + this.txIndex.toString();
    let TempSensor = Temp[Math.floor(Math.random() * Temp.length)];
    let TimeSensor = Time[Math.floor(Math.random() * Time.length)];

    let args = {
      contractId: "mycc",
      contractVersion: "v1",
      contractFunction: "addTemp",
      contractArguments: [IdSensor, TempSensor, TimeSensor],
      timeout: 30,
    };

    await this.sutAdapter.sendRequests(args);
  }
}

/**
 * Create a new instance of the workload module.
 * @return {WorkloadModuleInterface}
 */
function createWorkloadModule() {
  return new CreateDataWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
