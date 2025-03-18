# Makan Now API Documentation

## Overview

- **Base URL**: `https://makan-now-backend.onrender.com`
<!-- - **Authentication**: No authentication required for these endpoints (public). -->
- **Content Type**: `application/json`

---

## Endpoint: `POST /auth/sign-up`

### Description

Creates a new user account. This endpoint registers a new user with their provided credentials.

### Method

`POST`

### Endpoint URL

`/auth/sign-up`

### Request

#### Headers

```json
{
	"Content-Type": "application/json"
}
```

#### Body

- `username` (string, required): The username of the user.
- `password` (string, required): The password associated with the user's account.

```json
{
	"username": "Username",
	"password": "Password"
}
```

#### Response

- Success Response - Status Code: `201 OK`

Response Body:

```json
{
	"token": "<-hashed string->"
}
```

---

## Endpoint: `POST /auth/sign-in`

### Description

This endpoint allows a user to log in by providing their email and password. On successful authentication, a JWT (JSON Web Token) will be returned for authenticating subsequent requests.

### Method

`POST`

### Endpoint URL

`/auth/sign-in`

### Request

#### Headers

```json
{
	"Content-Type": "application/json"
}
```

#### Body

- `username` (string, required): The username of the user.
- `password` (string, required): The password associated with the user's account.

```json
{
	"username": "Username",
	"password": "Password"
}
```

#### Response

- Success Response - Status Code: `200 OK`

Response Body:

```json
{
	"token": "<-hashed string->"
}
```

---

## Endpoint: `GET /shops/`

### Description

This endpoint will provide all full list of all the shops .

### Method

`GET`

### Endpoint URL

`/shops/`

### Request

#### Headers

```json
{
	"Content-Type": "application/json"
}
```

#### Response

- Success Response - Status Code: `200 OK`

Response Body:

```json
[
	{
		"_id": "67bea84407155c3b9fd3c65b",
		"shopName": "Satay King"
	},
	{
		"_id": "67bea84407155c3b9fd3c65b",
		"shopName": "Han's Chicken Rice"
	}
]
```

---

## Endpoint: `POST /shops/`

### Description

This endpoint will allow users to create a shop profile .

### Method

`POST`

### Endpoint URL

`/shops/`

### Request

#### Headers

```json
{
	"Content-Type": "application/json"
}
```

#### Body

- `shopName` (string, required): The name of the Shop.
- `address` (string, required): The address of the shop.

```json
{
	"shopName": "Shop Name",
	"address": "Shop address"
}
```

#### Response

- Success Response - Status Code: `201 OK`

Response Body:

```json
{
	"shopName": "Shop Name",
	"address": "Shop address",
	"_id": "67bebcfc83e4c11073870ad6",
	"menu": [],
	"__v": 0
}
```

---

## Endpoint: `GET /shops/:shopId`

### Description

This endpoint will provide details of a specific shop.

### Method

`GET`

### Endpoint URL

`/shops/:shopId`

### Request

#### Headers

```json
{
	"Content-Type": "application/json"
}
```

#### Response

- Success Response - Status Code: `200 OK`

Response Body:

```json
{
	"shopName": "Shop Name",
	"address": "Shop address",
	"_id": "67bebcfc83e4c11073870ad6",
	"menu": [],
	"__v": 0
}
```

---

## Endpoint: `DELETE /shops/:shopId`

### Description

This endpoint will delete the specified shop.

### Method

`DELETE`

### Endpoint URL

`/shops/:shopId`

### Request

#### Headers

```json
{
	"Content-Type": "application/json"
}
```

#### Response

- Success Response - Status Code: `200 OK`

Response Body:

```json
{
	"deleted": {
		"shopName": "Shop Name",
		"address": "Shop address",
		"_id": "67bebcfc83e4c11073870ad6",
		"menu": [],
		"__v": 0
	}
}
```

---

## Endpoint: `PUT /shops/:shopId`

### Description

This endpoint will update the specified shop.

### Method

`PUT`

### Endpoint URL

`/shops/:shopId`

### Request

#### Headers

```json
{
	"Content-Type": "application/json"
}
```

#### Body

- `shopName` (string): The updated name of the Shop.
- `address` (string): The updated address of the shop.

```json
{
	"shopName": "Updated Name",
	"address": "Updated address"
}
```

#### Response

- Success Response - Status Code: `200 OK`

Response Body:

```json
{
	"shopName": "Shop Name",
	"address": "Shop address",
	"_id": "67bebcfc83e4c11073870ad6",
	"menu": [],
	"__v": 0
}
```

---

## Endpoint: `GET /shops/:shopId/menu`

### Description

This endpoint will provide an array of all the menu items from the specified shop.

### Method

`GET`

### Endpoint URL

`/shops/:shopId/menu`

### Request

#### Headers

```json
{
	"Content-Type": "application/json"
}
```

#### Response

- Success Response - Status Code: `200 OK`

Response Body:

```json
[
	{
		"itemName": "Dish Name",
		"price": 99.99,
		"description": "Item description",
		"image": "https://res.cloudinary.com/dxiknrak0/image/upload/v1740552401/set_kqnbkc.jpg",
		"itemType": "Set Meal",
		"_id": "67beb95383e4c11073870a9e"
	}
]
```

---

## Endpoint: `POST /shops/:shopId/menu`

### Description

This endpoint will allow user to create a new menu item in the specified shop.

### Method

`POST`

### Endpoint URL

`/shops/:shopId/menu`

### Request

#### Headers

```json
{
	"Content-Type": "application/json"
}
```

#### Body

- `itemName` (string): The name of the item.
- `price` (number): The price of the item.
- `image` (string): The image URL.
- `itemType` (string): The item type - ['Set Meal', 'Ala Carte', 'Add On'].

```json
{
	"itemName": "Dish Name",
	"price": 99.99,
	"description": "Item description",
	"image": "https://res.cloudinary.com/dxiknrak0/image/upload/v1740552401/set_kqnbkc.jpg",		"itemType": "Set Meal",
    "_id": "67beb95383e4c11073870a9e"
 },
```

#### Response

- Success Response - Status Code: `201 OK`

Response Body:

```json
{
	"itemName": "Dish Name",
	"price": 99.99,
	"description": "Item description",
	"image": "https://res.cloudinary.com/dxiknrak0/image/upload/v1740552401/set_kqnbkc.jpg",
	"itemType": "Set Meal",
	"_id": "67beb95383e4c11073870a9e"
}
```

---

## Endpoint: `DELETE /shops/:shopId/menu/:itemId`

### Description

This endpoint will allow user to delete a specified menu item in the specified shop.

### Method

`DELETE`

### Endpoint URL

`/shops/:shopId/menu/:itemId`

### Request

#### Headers

```json
{
	"Content-Type": "application/json"
}
```

#### Response

- Success Response - Status Code: `201 OK`

Response Body:

```json
{
	"deleted": {
		"itemName": "Dish Name",
		"price": 99.99,
		"description": "Item description",
		"image": "https://res.cloudinary.com/dxiknrak0/image/upload/v1740552401/set_kqnbkc.jpg",
		"itemType": "Set Meal",
		"_id": "67beb95383e4c11073870a9e"
	}
}
```
