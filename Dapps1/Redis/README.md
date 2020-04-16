# Redis 

Run `npm i redis-cli --save` in a directory of your choice. 

`redis-server`: command to start redis-server 

Open a new terminal, and run `redis-cli`:
 - `SET varName value`
 - `GET varName`
 - `DEL varName`
 - `EXISTS varName` 
   - 0: does not exist
   - 1: exists
 - `EXPIRE varName number`
   - 0: ttl was not set
   - 1: ttl was set
 - `TTl varName`
   - returns number of seconds left to live 
