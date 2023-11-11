# Tessera: Your Trusted Event Ticketing Platform
<p align="center">
  <img height="100px" src="client/public//tessera-logo-white.png" />
</p>
Project Website: https://cs203-tessera.vercel.app

Project Documentation: https://smu.sg/CS203-Tessera-Documentation

### Done by: 

[Axel TAN Xian Lin](https://github.com/axeltanxl)

[WU Zi Jian (Bruce)](https://github.com/BruceWu2001)

[Olivia OW Jialin](https://github.com/oliviaow2022)

[KOH Kang Min](https://github.com/phosphurous)

[NEO Shyh Ruey](https://github.com/shyhruey)

## Project Introduction

**Project Goal:** Tessera is an event ticketing platform for concerts and sports events that aims to curb scam cases in the ticket purchasing market today.

**Project Main Features:**
- **Tessera Marketplace**: Provides a secure central hub for ticket transactions. It opens two weeks before the event until 11:59 on the day before the event, minimizing reliance on third-party platforms and ensuring a scam-free resale environment.
- **Tessera E-tickets**: Features dynamically refreshing QR codes that changes every 10 seconds, preventing duplication and unauthorized sharing, and holding users accountable through user IDs in QR code generation, thus enhancing security and reducing scam incidents.

## Built with
| NextJS | TailwindCSS | Spring Boot | MySQL |
|--------|-------------|-------------|-------|
| <img height="80px" src="https://images.ctfassets.net/c63hsprlvlya/IacLLeOBR5WCvdCPqKuff/6860b5cc464c4f54703a2befa3f706b4/nextjs3.webp" /> | <img height="80px" src="https://miro.medium.com/v2/resize:fit:1400/1*oPL8C-i04sqAUoOS_da9aA.jpeg" /> | <img height="80px" src="https://e4developer.com/wp-content/uploads/2018/01/spring-boot.png" /> | <img height="80px" src="https://v5c2e8r4.stackpathcdn.com/wp-content/uploads/2014/09/mysql-logo.jpg" /> |

| AWS | Stripe | Docker | Vercel |
|-----|--------|--------|--------|
| <img height="80px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLrR2Lbll5DQAPXM5pSY0Mv8I_IOd1vblUNqAcVecJMQ383rJOtXb2Az9WRYSG1ojakew&usqp=CAU" /> | <img height="80px" src="https://media.designrush.com/inspiration_images/135142/conversions/_1511452770_462_stripe-mobile.jpg" /> | <img height="80px" src="https://logos-world.net/wp-content/uploads/2021/02/Docker-Logo-700x394.png" /> | <img height="80px" src="https://logowik.com/content/uploads/images/vercel1868.jpg" /> |

## How to Run this Code

 ### Backend Server ###

Go to `backend` folder via the following command:

```
cd backend
```
For first time users, create a `application.properties` file with the the template provided in `application.properties.sample`.
(You must have a working MYSQL Workbench, WAMP/MAMP Server installed)

### Configuration for `application.properties`
| Field | Description |
:-------| :-----------|
| spring.datasource.url | Connection string/URL of the SQL database for Spring Boot project. |
| spring.datasource.password | Password credentials for database. |
| jwt.secret | Secret key for JWT. Should be a long random string that is secret to you. |
| jwt.admin.pass | Password for default admin user. |
| aws.secretKey | AWS secret key for authentication to AWS. |
| aws.accessKeyId | AWS access key ID for the corresponding AWS secret key. |
| aws.region | Default AWS region. |


Start the application:

```
./mvnw spring-boot:run
```

### Frontend Server ###

Go to `client` folder via the following command:

```
cd client
```
Create a `.env` file with the template provided in `.env.sample`

### Configuration for `.env`
| Field | Description |
:-------| :-----------|
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | Stripe publishable key: found under Developer, [api key](https://stripe.com/docs/keys) |
| STRIPE_SECRET_KEY | Stripe secret key: found under Developer, [api key](https://stripe.com/docs/keys) |
| DATABASE_URL | [Connection string/URL of the SQL database](https://www.prisma.io/docs/reference/database-reference/connection-urls#:~:text=%7D-,MySQL,-schema.prisma). |
| NEXTAUTH_URL | Base url for nextauth: authority component of next backend   |
| NEXTAUTH_SECRET | [Secret key to encrypt nextauth jwt](https://next-auth.js.org/configuration/options#:~:text=openssl%20rand%20%2Dbase64%2032)  |
| SPRING_BACKEND | Base url for server components to make request to Spring backend: [authority component]/api/v1  |
| NEXT_PUBLIC_SPRING_BACKEND | Base url for client components to make request to Spring backend: [authority component]/api/v1 |
| NEXT_BACKEND | Base url for components to make request to Next backend: [authority component]/api |
| QR_SECRET_KEY1 | Secret key to generate unique code for each ticket |
| QR_SECRET_KEY2 | Secret key to generate qr string using unique code and time |
| STRIPE_WEBHOOK_ENDPOINT_SECRET | Secret key for webhook endpoint to run locally: generated when [running command](#forward-stripe-events-to-webhook) |

Following this, install necessary node packages:

```
npm i
```

Start the application:

```
npm run dev
```

## Forward stripe events to webhook:

```
stripe listen --forward-to [authority component of next server]/api/connectWebhook
```
Stripe connect should also be setup to allow clients to create express stripe account for payout
