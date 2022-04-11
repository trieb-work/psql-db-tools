#! /usr/bin/env node

import util from 'util';
import { exec as execCB } from 'child_process';
import yargs from 'yargs';
const exec = util.promisify(execCB);

type DatabaseConfig = {
    dbName: string;
    userName: string;
    password: string;
    dumpFile: string;
    resetDbWithSeed: boolean;
}

const startSeed = async (hostname: string, port: string, {dbName, userName, password, dumpFile}: DatabaseConfig) => {
    console.log(`Starting seed for ${dbName} with user ${userName} and file ${dumpFile}`);
    const cmd = `PGPASSWORD=${password} psql -h ${hostname} -p ${port} -U ${userName} ${dbName} < ${dumpFile}`
    await exec(cmd);
    console.log(`Finished seed for ${dbName}`);
}

const usage = "\nUsage: seed <options> to seed a postgres db with an SQL dump";
const options = yargs  
      .usage(usage)  
      .option("hostname", { describe: "The postgres host", type: "string", demandOption: false })
      .option("port", { describe: "The postgres port", type: "number", demandOption: false }) 
      .option("dbName", { describe: "The postgres db to seed into", type: "string", demandOption: false }) 
      .option("userName", { describe: "The postgres userName", type: "string", demandOption: false }) 
      .option("password", { describe: "The postgres password to authenticate with", type: "string", demandOption: false })
      .option("dumpFile", { describe: "The location to the SQL dumpFile: e.g.: ./saleor.sql", type: "string", demandOption: false })   
      .option("resetDbWithSeed", { describe: "Should we reset the DB before seeding", type: "boolean", demandOption: false })   
      
      .help(true)  
      .argv;
      

const exit = () => {
    console.error("Usage example: seed --port=5432 --hostname=localhost --password=mysecretpassword --dbName=saleor --userName=saleor --password=saleor --dumpFile=saleor.sql")
    process.exit(1);
}
export const main = async () => {
    const [ parsedOptions ] = await Promise.all([options])
    
    if (parsedOptions){
        if(!parsedOptions.port){
            console.error("port is missing");
            exit();
        }
        if(!parsedOptions.hostname){
            console.error("hostname is missing");
            exit();
        }
        if(!parsedOptions.password){
            console.error("password is missing");
            exit();
        }
        if(!parsedOptions.dbName){
            console.error("dbName is missing");
            exit();
        }
        if(!parsedOptions.userName){
            console.error("userName is missing");
            exit();
        }
        if(!parsedOptions.password){
            console.error("password is missing");
            exit();
        }
        if(!parsedOptions.dumpFile){
            console.error("dumpFile is missing");
            exit();
        }
        // if(typeof parsedOptions.resetDbWithSeed !== boolean){
        //     console.error("resetDbWithSeed is missing");
        //     exit();
        // }
        let config = {
            ...parsedOptions,
            resetDbWithSeed: parsedOptions.resetDbWithSeed,
        } as DatabaseConfig & { hostname: string; port: number }
        config.resetDbWithSeed = (config.resetDbWithSeed as any ) === "true" ? true : false;
        await startSeed(config.hostname, config.port.toString(), config);
    } else {
        console.error("No options given! Use --help to get the available options")
        // for(const db of dbs){
        //     await startSeed(hostname, port.toString(), db);
        // }
        // await Promise.all(dbs.map(async (db) => startSeed(hostname, port.toString(), db)));
    }
};
main();