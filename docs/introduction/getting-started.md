 ::: danger
This plugin is currently on stage: proof of concept/test 
:::

## Installation Plugin

The package is published to npm:
`npm install directus-extension-stripe-bundle`

**Manual Installation**
- Download or fork the repository
- Install the requirements\
  `npm install`
- Build the extension\
  `npm run build`
- Move the entire project to your extension folder (only the `package.json` and `dist` folder are strictly necessary)\
  `mv ./ extensions/directus-extension-stripe-bundle`
- Restart your Directus instance


## Database Installation

Installing a database is a straightforward process. You has 2 option: 

### Fresh Installation using a Directus Snapshot

1) First, download the  <a href="/directus-stripe//snapshot.yaml" target="_blank" rel="noreferrer" download>Snapshot</a>.

2) Make sure to familiarize yourself with the [Directus Snapshot documentation](https://docs.directus.io/self-hosted/cli.html).

3) Now, load your snapshot using one of the following methods:

   - If you're using Docker, run the following command:
     ```bash
     docker exec docker-image-name npx directus schema apply --yes /directus/snapshots/snapshot.yaml
     ```

   - For a standard installation, use this command:
     ```bash
     npx directus schema apply ./path/to/snapshot.yaml
     ```

4) That's it! 😎

### Create manually 
You must create only 2 table ``orders`` (related ``orders_products``) and ``products`` \
**Orders**
```
id              -  Just id... 
status          - Dropdown ( new, prepending, paid, fail ) default: new 
sort            - Input
user_created    - Many to One
date_created    - Datetime
user_updated    - Many to One
date_updated    - Datetime

items           - Many to Many (products) !required on create
link            - Input (text)
link_expires_at - Datetime (datetime)
user            - Many to One (directus_users)
name            - Input (string)
phone           - Input (string)
email           - Input (string)
country         - Input (string)
line1           - Input (string)
line2           - Input (string)
city            - Input (string)
postal_code     - Input (string)
```

**Products**
```
id - Just id... 
status - Dropdown (standard)
sort - Input
user_created - Many to One
date_created - Datetime
user_updated - Many to One
date_updated - Datetime

image - Image  (image) !required on create
name - Input (string) !required on create
price - Input (float) !required on create
short - Textarea (text) !required on create
amount - Input (integer) !required on create
```

Feel free to add columns to the table, but **please refrain from making changes to the current columns**. You are also allowed to introduce status fields as needed.

## Creating Your First Order

To create your first order using the Directus admin panel or Directus API, follow these steps:

1. First, create your products in Directus.

2. Once your order is ready for payment, make a **POST** request to the following API endpoint:

    ```json
    http://your-directus-domain/stripe/payment/{order_id}
    ```
    
    Include the following information in the request body:

    ```json
    {
      "name": "First name Surname",
      "customer_email": "test@o2.pl",
      "phone": "+48 555 555 555",
      "address": {
        "line1": "Address line 1 (e.g., street, PO Box, or company name)",
        "city": "City, district, suburb, town, village, or ward",
        "country": "US",
        "line2": "Address line 2 (e.g., apartment, suite, unit, or building)",
        "postal_code": "ZIP or postal code"
      }
    }
    ```

    Ensure that you provide accurate customer information.

4. After making the request, you will receive a response containing a URL:

   ```json
   {
     "url": "https://checkout.stripe.com/c/pay/cs_test_...."
   }
   ```

   This URL will take you to the payment checkout page. The link and the expiration time are saved in your order for reference.

By following these steps, you can easily create and process your first order through Directus and Stripe.