# DRONES: nVault SKILLS ASSESSMENT

A comprehensive documenttaion for building server-side application for Drones with Express.js and TypeScript.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
- [DOCUMENTATION](#documentation)
  



## Introduction

There is a major new technology that is destined to be a disruptive force in the field of
transportation: **the drone**. Just as the mobile phone allowed developing countries to leapfrog
older technologies for personal communication, the drone has the potential to leapfrog
traditional transportation infrastructure.
Useful drone functions include delivery of small items that are (urgently) needed in locations
with difficult access.

## Features

- Express.js for handling HTTP requests.
- TypeScript for type safety and enhanced developer experience.
- Customizable project structure with clear separation of concerns.
- Configurable environment variables using `.env` files.
- Pre-configured logging and error handling middleware.
- Includes common dependencies such as `dotenv`, `Joi`, `Typescript`, `MySql` and `sequelize` for database interactions.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- Basic knowledge of TypeScript and Express.js.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:CaptainLeon445/nVault-skill-assessment.git
   cd nVault-skill-assessment
   
2. Install dependencies
   ```bash
   npm install


### Running the Development Server

1. Runs the application in development mode

   ```bash
   npm run watch

2. Open Browser or Postman

  * Open your browser to [http://localhost:3000](http://localhost:3000)
  * Invoke the `/` endpoint
  ```shell
  curl http://localhost:3000/
  ```

  * The `/v1/api/drones` endpoint is for the drones
  * The `/v1/api/medications` endpoint is for the medications
  * Check the routes files to get the other resource

### DOCUMENTATION

  * The API documentation is available on [https://documenter.getpostman.com/view/21828151/2s9YJW55pr](https://documenter.getpostman.com/view/21828151/2s9YJW55pr)
