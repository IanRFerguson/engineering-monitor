# TMC Engineering Sync-In Monitor
This is a full-stack app that displays run status and success rates for the many sync-ins that Engineering manages.

## Setup
* Add a service account to `./service_accounts/`
* Populate an `.env` file like so

```
export GOOGLE_APPLICATION_CREDENTIALS="/app/service_accounts/{{ service account }}.json"
```

* The essential build steps are wrapped in an execuatable shell script

```
deploy/run.sh
```