## Description

Smartlink API

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Endpoints

* [Authorization](#authorization)
    1. [Signup](#1-signup)
        * [Signup success response](#i-example-request-signup-success-response)
    1. [Signin](#2-signin)
        * [Signin](#i-example-request-signin)
    1. [Logout](#3-logout)
        * [Logout](#i-example-request-logout)
    1. [Refresh token](#4-refresh-token)
        * [Signin](#i-example-request-signin-1)
* [Forms](#forms)
    1. [Create form](#1-create-form)
        * [Create form](#i-example-request-create-form)
    1. [List all forms](#2-list-all-forms)
        * [List all forms](#i-example-request-list-all-forms)
    1. [Delete form](#3-delete-form)
        * [Delete form](#i-example-request-delete-form)
    1. [Associate a reward with form](#4-associate-a-reward-with-form)
        * [Associate a reward with form](#i-example-request-associate-a-reward-with-form)
* [Questions](#questions)
    1. [Create question](#1-create-question)
        * [Create question](#i-example-request-create-question)
    1. [Delete Question](#2-delete-question)
        * [Delete Question](#i-example-request-delete-question)
* [Rewards](#rewards)
    1. [Get all rewards](#1-get-all-rewards)
        * [Get all rewards](#i-example-request-get-all-rewards)
    1. [Create reward](#2-create-reward)
        * [Create reward](#i-example-request-create-reward)

--------



## Authorization



### 1. Signup



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{base_url}}/api/v1/auth/signup
```



***Body:***

```js        
{
    "phone": "+12079008514",
    "password": "12341234"
}
```



***More example Requests/Responses:***


#### I. Example Request: Signup success response



***Body:***

```js        
{
    "phone": "+12079008514",
    "password": "12341234"
}
```



#### I. Example Response: Signup success response
```js
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjcsInBob25lIjoiKzEyMDc5MDA4NTE0IiwiaWF0IjoxNjQ5MTMxMDM0LCJleHAiOjE2NDkxNTYyMzR9.88yQo3a3gBElOZROW9oJi-I9jGObxqbANqyRXO_jndg",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjcsInBob25lIjoiKzEyMDc5MDA4NTE0IiwiaWF0IjoxNjQ5MTMxMDM0LCJleHAiOjE2NDkxNTYyMzR9.7gs7A98lODXiWkwnWTK3LI5jh7Z9WypEX540IBn4Hzc"
}
```


***Status Code:*** 201

<br>



### 2. Signin



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{base_url}}/api/v1/auth/signin
```



***Body:***

```js        
{
    "phone": "+12079008514",
    "password": "12341234"
}
```



***More example Requests/Responses:***


#### I. Example Request: Signin



***Body:***

```js        
{
    "phone": "+12079008514",
    "password": "12341234"
}
```



#### I. Example Response: Signin
```js
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjcsInBob25lIjoiKzEyMDc5MDA4NTE0IiwiaWF0IjoxNjQ5MTMxMjc1LCJleHAiOjE2NDkxNTY0NzV9.kUMpnMGVZv_PiuByCK-B0ApZz1cnqoH4xqXCcghDtB0",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjcsInBob25lIjoiKzEyMDc5MDA4NTE0IiwiaWF0IjoxNjQ5MTMxMjc1LCJleHAiOjE2NDkxNTY0NzV9.qiaggWPu1M6P-bvBuKmVmkTFyMI0YVqU9FyTwMHwCJ0"
}
```


***Status Code:*** 200

<br>



### 3. Logout



***Endpoint:***

```bash
Method: POST
Type: 
URL: {{base_url}}/api/v1/auth/logout
```



***More example Requests/Responses:***


#### I. Example Request: Logout



***Body: None***



#### I. Example Response: Logout
```js
{
    "message": "success"
}
```


***Status Code:*** 200

<br>



### 4. Refresh token



***Endpoint:***

```bash
Method: POST
Type: 
URL: {{base_url}}/api/v1/auth/refresh
```



***More example Requests/Responses:***


#### I. Example Request: Signin



***Body:***

```js        
{
    "email": "test12345@gmail.com",
    "password": "12341234"
}
```



#### I. Example Response: Signin
```js
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImVtYWlsIjoidGVzdDEyMzQ1QGdtYWlsLmNvbSIsImlhdCI6MTY0OTA4MTg3OCwiZXhwIjoxNjQ5MDgyNzc4fQ.hJ_6XxRwgIHcOLq3bvKNw4QiTqUt_8De8Vo-KaRL41c",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImVtYWlsIjoidGVzdDEyMzQ1QGdtYWlsLmNvbSIsImlhdCI6MTY0OTA4MTg3OCwiZXhwIjoxNjQ5MTA3MDc4fQ.5YO-TVKetk8BDE8gNoBvNzekp_5lXBZVs5uM7tUkvH4"
}
```


***Status Code:*** 200

<br>



## Forms



### 1. Create form



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{base_url}}/api/v1/forms
```



***Body:***

```js        
{
    "type": "survey",
    "validity": "2022-04-04T15:11:13.378Z"
}
```



***More example Requests/Responses:***


#### I. Example Request: Create form



***Body:***

```js        
{
    "type": "survey",
    "validity": "2022-04-04T15:11:13.378Z"
}
```



#### I. Example Response: Create form
```js
{
    "id": 1,
    "createdAt": "2022-04-04T15:11:35.742Z",
    "updatedAt": "2022-04-04T15:11:35.743Z",
    "type": "survey",
    "validity": "2022-04-04T15:11:13.378Z",
    "rewardId": null,
    "userId": 6
}
```


***Status Code:*** 201

<br>



### 2. List all forms



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{base_url}}/api/v1/forms
```



***More example Requests/Responses:***


#### I. Example Request: List all forms



***Body: None***



#### I. Example Response: List all forms
```js
[
    {
        "id": 1,
        "createdAt": "2022-04-04T15:11:35.742Z",
        "updatedAt": "2022-04-04T15:11:35.743Z",
        "type": "survey",
        "validity": "2022-04-04T15:11:13.378Z",
        "rewardId": null,
        "userId": 6
    }
]
```


***Status Code:*** 200

<br>



### 3. Delete form



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{base_url}}/api/v1/forms/:path
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| path | 1 | Id of the form |



***More example Requests/Responses:***


#### I. Example Request: Delete form



***Body: None***



#### I. Example Response: Delete form
```js
{
    "message": "success"
}
```


***Status Code:*** 200

<br>



### 4. Associate a reward with form



***Endpoint:***

```bash
Method: PATCH
Type: 
URL: {{base_url}}/api/v1/forms/:formId/:rewardId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| formId | 3 |  |
| rewardId | 2 |  |



***More example Requests/Responses:***


#### I. Example Request: Associate a reward with form



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| formId | 3 |  |
| rewardId | 2 |  |



***Body: None***



#### I. Example Response: Associate a reward with form
```js
{
    "id": 3,
    "createdAt": "2022-04-12T14:10:29.388Z",
    "updatedAt": "2022-04-12T14:16:54.952Z",
    "type": "survey",
    "validity": "2022-04-04T15:11:13.378Z",
    "rewardId": 2,
    "userId": 7
}
```


***Status Code:*** 200

<br>



## Questions



### 1. Create question



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{base_url}}/api/v1/questions
```



***Body:***

```js        
{
    "question": "Which is your favourate colour?",
    "type": "MCQ",
    "content": {
        "MCQ": ["Green", "Yellow", "Blue", "Black"]
    },
    "formId": 2
}
```



***More example Requests/Responses:***


#### I. Example Request: Create question



***Body:***

```js        
{
    "question": "Which is your favourate colour?",
    "type": "MCQ",
    "content": {
        "MCQ": ["Green", "Yellow", "Blue", "Black"]
    },
    "formId": 2
}
```



#### I. Example Response: Create question
```js
{
    "id": 1,
    "createdAt": "2022-04-04T17:00:40.291Z",
    "updatedAt": "2022-04-04T17:00:40.292Z",
    "question": "Which is your favourate colour?",
    "type": "MCQ",
    "content": {
        "MCQ": [
            "Green",
            "Yellow",
            "Blue",
            "Black"
        ]
    },
    "formId": 2
}
```


***Status Code:*** 201

<br>



### 2. Delete Question



***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: {{base_url}}/api/v1/questions/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 1 | Id of the question |



***Body:***

```js        
{
    "question": "Which is your favourate colour?",
    "type": "MCQ",
    "content": {
        "MCQ": ["Green", "Yellow", "Blue", "Black"]
    },
    "formId": 2
}
```



***More example Requests/Responses:***


#### I. Example Request: Delete Question



***Body:***

```js        
{
    "question": "Which is your favourate colour?",
    "type": "MCQ",
    "content": {
        "MCQ": ["Green", "Yellow", "Blue", "Black"]
    },
    "formId": 2
}
```



#### I. Example Response: Delete Question
```js
{
    "message": "success"
}
```


***Status Code:*** 200

<br>



## Rewards



### 1. Get all rewards



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{base_url}}/api/v1/rewards
```



***More example Requests/Responses:***


#### I. Example Request: Get all rewards



***Body: None***



#### I. Example Response: Get all rewards
```js
[
    {
        "id": 1,
        "createdAt": "2022-04-04T17:55:42.840Z",
        "updatedAt": "2022-04-04T17:55:42.843Z",
        "name": "reward-name",
        "type": "voucher",
        "content": {
            "key": "value"
        },
        "validity": "2022-04-04T15:11:13.378Z",
        "style": {
            "key": "value"
        },
        "userId": 6
    }
]
```


***Status Code:*** 200

<br>



### 2. Create reward



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{base_url}}/api/v1/rewards
```



***Body:***

```js        
{
    "name": "reward-name",
    "type": "voucher",
    "content": {
        "key": "value"
    },
    "validity": "2022-04-04T15:11:13.378Z",
    "style": {
        "key": "value"
    }
}
```



***More example Requests/Responses:***


#### I. Example Request: Create reward



***Body:***

```js        
{
    "name": "reward-name",
    "type": "voucher",
    "content": {
        "key": "value"
    },
    "validity": "2022-04-04T15:11:13.378Z",
    "style": {
        "key": "value"
    }
}
```



#### I. Example Response: Create reward
```js
{
    "id": 1,
    "createdAt": "2022-04-04T17:55:42.840Z",
    "updatedAt": "2022-04-04T17:55:42.843Z",
    "name": "reward-name",
    "type": "voucher",
    "content": {
        "key": "value"
    },
    "validity": "2022-04-04T15:11:13.378Z",
    "style": {
        "key": "value"
    },
    "userId": 6
}
```


***Status Code:*** 201

<br>



---
[Back to top](#smartlink)
