import soap from "soap";
import logger from "./logger";

const log = logger("graphql-vsphere:");

export default async function createSchema(options) {
  const {username, password, host, proto = "https", disableSSLValidation} = options;
  if (disableSSLValidation) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }
  const client = await soap.createClientAsync(`${proto}://${host}/sdk/vimService.wsdl`, {});
  // console.log("client", Object.keys(client).filter((k) => k.startsWith("List")));

  const clientKeys = Object.keys(client).sort().filter((k) =>
    k.toLowerCase().indexOf("content".toLowerCase()) > -1 &&
    // k.toLowerCase().indexOf("query".toLowerCase()) > -1 &&
    k.toLowerCase().indexOf("async") > -1
  );
  clientKeys.forEach((k) => {
    log.info(k);
  });
  return true;
}
