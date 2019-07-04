# TypeScript API

### Configuration

The following files must be manually added to `/src`. These files contain metadata for the database including secret keys. Both files are listed within `.gitignore`.

- `dev-config.json` - configuration for local development
- `test-config.json` - configuration for local testing

Structure:

```
{
  "port": 8080,
  "bodyLimit": "100kb",
  "db": "mongodb://localhost:27017/name-of-db",
  "secret": "supersecretkey"
}
```

### Setup

- `npm install gulp -g`
- `npm install`

### Scripts
- `gulp`: Compile `/src` (TS) to `/built` (JS)
- `npm run test`: Run tests using test DB
- `npm run api`: Run API using default DB
- `npm run api-test`: Clear DB via `npm run test` and then run API on test DB. Use for E2E FE tests that require a fresh DB.
