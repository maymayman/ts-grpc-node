const PROTO_PATH = './proto/customers.proto';

import { 
  Server,
  ServerCredentials,
  loadPackageDefinition,
  GrpcObject,
  ServiceDefinition 
} from 'grpc';
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

const packageDefinition = loadSync(PROTO_PATH, protoOptions);
const customersProto = loadPackageDefinition(packageDefinition);
const CustomerService = customersProto.CustomerService as GrpcObject;

const server = new Server();

server.addService(CustomerService.service as ServiceDefinition<any>, {
  find: (call: CallRequest, callback: Callback)  => {
    console.log(call);
    callback(null, { result: [] });
  }
})

server.bind("127.0.0.1:30043", ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:30043");
server.start();