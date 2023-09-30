# Tessera
<p align="center">
  <img height="300px" src="client/public//tessera-logo.png" />
</p>
Project Website:

Project Documentation:

## Project Introduction

**Project Goal:** To combat the prevalence of scams in the ticket purchasing market today, whether it is for concerts or sports. 

## How to Run this Code

 ### Backend Server ###

Go to `backend` folder via the following command:

```
cd backend
```
For first time users, create a application.properties file with the following details:
(You must have a working MYSQL Workbench, WAMP/MAMP Server installed)
```
spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://${MYSQL_HOST:localhost}:3306/tesseraDB
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.show-sql: true

#Jwt
jwt.secret=
jwt.expiry=3600000

#DB name
spring.jpa.hibernate.naming.implicit-strategy=org.hibernate.boot.model.naming.ImplicitNamingStrategyLegacyJpaImpl
spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl

logging.level.org.springframework.security=DEBUG
```

Start the application:

```
./mvnw spring-boot:run
```

### Frontend Server ###

Go to `client` folder via the following command:

```
cd client
```

Following this, install necessary node packages:

```
npm i
```

Start the application:

```
npm run dev
```


