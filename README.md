# @trieb.work/psql-db-tools
This is a little javascript CLI tool to be used to seed postgres databases with the PSQL tool. 

Usage: 
```
$ npm i -g @trieb.work/psql-db-tools
```
```
$ seed --port=5432 --hostname=localhost --password=mysecretpassword --dbName=saleor --userName=saleor --password=saleor --dumpFile=saleor.sql
```