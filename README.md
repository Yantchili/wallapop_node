# NodeApp


https://user-images.githubusercontent.com/112888040/211172172-5181d31f-4e81-40a9-ac8b-b14b50152194.mp4

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
| `GET`    | `http://localhost:3000/api/products`                          | Retrieve all products.                   |
| `GET`    | `http://localhost:3000/api/products?limit=2&skip=1` | Retrieve two products skipping the first document|
| `GET`    | `http://localhost:3000/api/products?tags=lifestyle&venta=true&nombre=Bici` | Search for products for sale, whose name starts with "Bici"(no case sensitive), with the tag of "lifestyle"|
| `GET`    | `http://localhost:3000/api/products?max=100&min=30` | Retrieve products with price less or equal to 100, and greater than or equal to 30|
| `GET`    | `http://localhost:3000/api/products/tags`                          | Retrieve the whole list of tags                       |
| `GET`    | `http://localhost:3000/api/products/63a9a617516187de9c271bfc`                          | Retrieve products by id                     |
| `POST`   | `http://localhost:3000/api/products/`                             | Create a new product.                       |
| `PUT`  | `http://localhost:3000/api/products/63a9a617516187de9c271bfc`                          | Update data in product of id "63a9a617516187de9c271bfc".                 |
| `DELETE` | `http://localhost:3000/api/products/63a9a617516187de9c271bfc`| Delete product of id "63a9a617516187de9c271bfc".                 |

# Web view
| URL                                      | Description                              |
| ---------------------------------------- | ---------------------------------------- |
| `http://localhost:3000/`                          | Home page                  |
| `http://localhost:3000/all_roduct`                          |All products                  |
| `http://localhost:3000/search_result?nombre=ipad`                          |Products with names beggining with "ipad"               |
| `http://localhost:3000/new`                          |Create a new prdoducts                |
| `http://localhost:3000/63b8b96de4260fe0e15e69a0`                          |Deatail info of certain product               |
