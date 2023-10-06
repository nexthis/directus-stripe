### Installing the Directus Plugin

To install the Directus plugin for your project, follow these steps:

1. **Fill Your .env File**

    Before you begin, make sure you have your project's configuration set up in the `.env` file. Just copy and rename `.env.example` file, then fill your data

2. **Create Data Model Based on extensions/directus-bundles-stripe/src/types/database.ts**

    The Directus plugin require specific data models and tables to function properly. To create the necessary data model, you should refer to the plugin's source code, which is usually located in a file like `extensions/directus-bundles-stripe/src/types/database.ts`

3. **Run your project**

    Just type `docker-compose up --build` in your terminal! 😎