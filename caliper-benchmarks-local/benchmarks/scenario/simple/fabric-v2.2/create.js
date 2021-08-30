"use strict";

const { WorkloadModuleBase } = require("@hyperledger/caliper-core");

const SensorID = ["sensor1", "sensor2"];
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

    let IdSensor = SensorID[Math.floor(Math.random() * SensorID.length)];
    let TempSensor = Temp[Math.floor(Math.random() * Temp.length)];
    let TimeSensor = 'Client' + this.workerIndex + '_Time' + this.txIndex.toString();

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
