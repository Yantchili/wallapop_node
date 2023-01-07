# NodeApp
![Preview gif1 gif](https://user-images.githubusercontent.com/112888040/211122732-e836d8c4-872a-4e60-bc07-f87464d00962.gif)

Deploy:

```sh
npm install
```

Load initial data to database:

```
npm run init-db
```

Start the application in production with:

```sh
npm start
```

Start the application in development with:

```sh
npm run dev
```

# API Documentation


| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `/api/products`                          | Retrieve all products.                   |
| `GET`    | `/api/products?limit=2&skip=1` | Retrieve two products skipping the first document|
| `GET`    | `/api/products?tags=lifestyle&venta=true&nombre=Bici` | Search for products for sale, whose name starts with "Bici"(no case sensitive), with the tag of "lifestyle"|
| `GET`    | `/api/products?max=100&min=30` | Retrieve products with price less or equal to 100, and greater than or equal to 30|
| `GET`    | `/api/products/tags`                          | Retrieve the whole list of tags                       |
| `GET`    | `/api/products/63a9a617516187de9c271bfc`                          | Retrieve products by id                     |
| `POST`   | `/api/products/`                             | Create a new product.                       |
| `PUT`  | `/api/products/63a9a617516187de9c271bfc`                          | Update data in product of id "63a9a617516187de9c271bfc".                 |
| `DELETE` | `/api/products/63a9a617516187de9c271bfc`| Delete product of id "63a9a617516187de9c271bfc".                 |
