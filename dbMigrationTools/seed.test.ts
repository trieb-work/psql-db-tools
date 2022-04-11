import util from 'util';

import { exec as execCB } from 'child_process';
const exec = util.promisify(execCB);

test("It should work", async () => {
    const { stderr, stdout } = await exec("yarn ts-node ./dbMigrationTools/seed.ts --port=5432 --hostname=localhost --password=mysecretpassword --dbName=saleor --userName=saleor --password=saleor --dumpFile=saleor.sql")
    expect(stdout).toContain("Starting seed for saleor with user saleor and file saleor.sql")
    
})