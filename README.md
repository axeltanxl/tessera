# Tessera
<p align="center">
  <img height="100px" src="client/public//tessera-logo-white.png" />
</p>
Project Website:

Project Documentation:

## Project Introduction

**Project Goal:** Tessera is an event ticketing platform for concerts and sports events that aims to curb scam cases in the ticket purchasing market today.

## Built with
| NextJS | TailwindCSS | Spring Boot | MySQL | AWS | Stripe
|--------|-------------|-------------|-------|-----|------|
| <img height="80px" src="https://images.ctfassets.net/c63hsprlvlya/IacLLeOBR5WCvdCPqKuff/6860b5cc464c4f54703a2befa3f706b4/nextjs3.webp" /> | <img height="80px" src="https://miro.medium.com/v2/resize:fit:1400/1*oPL8C-i04sqAUoOS_da9aA.jpeg" /> | <img height="80px" src="https://e4developer.com/wp-content/uploads/2018/01/spring-boot.png" /> | <img height="80px" src="https://v5c2e8r4.stackpathcdn.com/wp-content/uploads/2014/09/mysql-logo.jpg" /> | <img height="80px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLrR2Lbll5DQAPXM5pSY0Mv8I_IOd1vblUNqAcVecJMQ383rJOtXb2Az9WRYSG1ojakew&usqp=CAU" /> | <img height="80px" src="https://media.designrush.com/inspiration_images/135142/conversions/_1511452770_462_stripe-mobile.jpg" />

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
spring.datasource.username=#<TO FILL>
spring.datasource.password=#<TO FILL>
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.show-sql: true

#Jwt
jwt.secret=
jwt.expiry=3600000

#DB name
spring.jpa.hibernate.naming.implicit-strategy=org.hibernate.boot.model.naming.ImplicitNamingStrategyLegacyJpaImpl
spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl

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

### Done by: 

[Axel](https://github.com/axeltanxl)

[Zi Jian](https://github.com/BruceWu2001)

[Olivia](https://github.com/oliviaow2022)

[Kang Min](https://github.com/phosphurous)

[Shyh Ruey](https://github.com/shyhruey)

