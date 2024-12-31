import { workerData, parentPort } from 'node:worker_threads';
import { evaluate } from '../common.js';

const { options, grid } = workerData;

parentPort.postMessage(evaluate(options, grid));
