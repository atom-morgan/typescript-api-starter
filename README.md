# TypeScript API

### Scripts
- `tsc`: Compile `/src` (TS) to `/built` (JS)
- `npm run test`: Run tests using test DB `api-starter-test`
- `npm run api`: Run API using default DB `api-starter`
- `npm run api-test`: Clear DB via `npm run test` and then run API on test DB `api-starter-test`. Use for E2E FE tests that require a fresh DB.

### Setup
The following files must be manually added to `/built` since they are not moved from `/src` when running `tsc`.

- `config.json`
- `dev.json`
- `test/mocha.opts`