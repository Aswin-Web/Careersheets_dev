const dns = require("node:dns");
const mongoose = require("mongoose");

const DEFAULT_DNS_SERVERS = ["8.8.8.8", "1.1.1.1"];

function getDnsServersFromEnv() {
  const rawServers = process.env.MONGO_DNS_SERVERS;
  if (!rawServers) {
    return DEFAULT_DNS_SERVERS;
  }

  return rawServers
    .split(",")
    .map((server) => server.trim())
    .filter(Boolean);
}

async function tryMongoConnect(uri) {
  return mongoose.connect(uri, {
    serverSelectionTimeoutMS: 15000,
  });
}

async function connectDB() {
  mongoose.set("strictQuery", true);

  const mongoUrl = process.env.MONGO_URL;
  const mongoDirectUrl = process.env.MONGO_URL_DIRECT;

  if (!mongoUrl) {
    console.log("MONGO_URL is missing in environment variables");
    return;
  }

  try {
    await tryMongoConnect(mongoUrl);
    console.log("MongoDB Connected SuccessFully");
    return;
  } catch (err) {
    const isSrvDnsError =
      mongoUrl.startsWith("mongodb+srv://") &&
      err?.code === "ECONNREFUSED" &&
      err?.syscall === "querySrv";

    if (!isSrvDnsError) {
      console.log(err);
      console.log("Something Went Wrong with MongoDB");
      return;
    }

    const dnsServers = getDnsServersFromEnv();
    console.log(
      `MongoDB SRV DNS lookup failed. Retrying with DNS servers: ${dnsServers.join(
        ", "
      )}`
    );

    dns.setServers(dnsServers);

    try {
      await tryMongoConnect(mongoUrl);
      console.log("MongoDB Connected SuccessFully");
      return;
    } catch (retryErr) {
      if (mongoDirectUrl) {
        try {
          await tryMongoConnect(mongoDirectUrl);
          console.log("MongoDB Connected SuccessFully (direct URI)");
          return;
        } catch (directErr) {
          console.log(directErr);
        }
      }

      console.log(retryErr);
      console.log("Something Went Wrong with MongoDB");
    }
  }
}

module.exports = connectDB;
