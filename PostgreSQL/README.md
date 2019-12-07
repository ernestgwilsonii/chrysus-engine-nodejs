# PostgreSQL

```bash
# Start a PostgreSQL instance in Docker for development
docker run --name postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
docker ps
#docker stop postgres && docker rm postgres

# Connect to PostgreSQL instance in Docker using bash inside the container
docker exec -it postgres bash
psql --help
psql -U postgres
help
select version();
\du
\q
exit

# Connect to PostgreSQL instance in Docker using psql inside the container
docker exec -it postgres psql -h localhost -U postgres
select version();
\l

# Connect to PostgreSQL instance in Docker using psql from a remote client OS
psql -h 127.0.0.1 -p 5432 -U postgres
mysecretpassword
select version();
\l

# Example: Create a staff database and a people table inside PostgreSQL
create database chrysus;
\l
\c chrysus
\d
create table events();
\dt;
\d events;
notify chrysus, 'Hello from PostgreSQL command line NOTIFY!';


# Starting PostgreSQL via Docker Compose
cd PostgreSQL/
docker-compose up -d
docker ps
#docker-compose down
```
