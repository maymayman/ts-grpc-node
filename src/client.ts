const PROTO_PATH = './proto/customers.proto';

import { credentials, loadPackageDefinition, Client } from 'grpc';
import { Options, loadSync } from '@grpc/proto-loader';

const protoOptions: Options = {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
};

interface Callback {
	( error: Error, result?: any ): void;
}

interface CallRequest {
  request: any
}

class CustomerServiceClient extends Client {
  find: (call: CallRequest | null, Callback: Callback) => void
};


const packageDefinition = loadSync(PROTO_PATH, protoOptions);
const CustomerService = loadPackageDefinition(packageDefinition).CustomerService as typeof CustomerServiceClient;
// const CustomerServiceClient = 
// class CustomerService extends Client {

// }
export const client = new CustomerService(
  "localhost:30043",
  credentials.createInsecure()
);