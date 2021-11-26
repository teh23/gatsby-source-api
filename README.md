# GATSBY-SOURCE-API 

## Table of Contents

1. [Getting Started](#getting-started)
2. [Parameters](#parameters)
3. [How to use](#how-to-use)
   1. [Basic usage](#1-basic-usage)
   2. [Download images](#2-download-images)
   3. [Add or edit](#3-add-or-edit)
   
   
## Getting Started  

1. install package with yarn or npm:
- npm:
```shell
npm install @teh23/gatsby-source-api
```
- yarn:
```shell
yarn add @teh23/gatsby-source-api
```



## Parameters 

| **Name**  | **Type**         | **Description**                                                                                                                                                                                         |
| :-------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| url       | string | `Required.` Url of your API.                          |
| schema       | string | `Required.` Define default-schemas for the objects of your API.  |
| baseType   | string           | `Required.` Root name of node                                                                                                                                                                       |
| auth       | object |  Define the auth for your API in the following format: `{ username: "username", password: "password" }`. Auth also authorizes image downloads |
| images | array            |  Define the keys of images. Value of images must be a `url`. Gatsby-Images are added as name of images keys with suffix `Local`. **Important** keys must be unique |
| transform | array | `[{name: "fieldName", func: (node) => ...} ]` func for argument take node

## How to use

### 1. Basic usage
`url`, `baseType`, `schema` are required values. Schema is shape of the data and to avoid unwanted errors 
is required, baseType is name of your root node name for example below is `albums` we use it in `baseType` and in 
`schema`
for more details check it out:</br>
https://graphql.org/learn/schema/ </br>
https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/
```javascript
plugins: [
   //... others plugins
    {
      resolve: `@teh23/gatsby-source-api`,
      options: {
        //Url of your API. REQUIRED
        url: "https://jsonplaceholder.typicode.com/albums/1/photos",
        //Root name of node. REQUIRED
        baseType: "albums",
        //Schema is shape of the data. REQUIRED
        schema: `
          type albums implements Node {
            albumId: Int
            id: Int
            title: String
            url: String
            thumbnailUrl: String
          }
        `
      },
  ],
```
### 2. Download images
We are putting keys of urls which we want download into arrays. Also, we have to link download images.
</br>
```${imageName}Local: File @link(by: "id", from: "${imageName}Local___NODE")```</br>
relax if u dont understand what the heck it is doing there, look below

```javascript
plugins: [
   //... others plugins
    {
      resolve: `@teh23/gatsby-source-api`,
      options: {
        url: "https://jsonplaceholder.typicode.com/albums/1/photos",
        baseType: "albums",
        //array for images is require even for one value
        images: ['url', 'thumbnailUrl']
        schema: `
          type albums implements Node {
            albumId: Int
            id: Int
            title: String
            url: String
            thumbnailUrl: String
            
            urlLocal: File @link(by: "id", from: "urlLocal___NODE")
            thumbnailUrlLocal: File @link(by: "id", from: "thumbnailUrlLocal___NODE")
          }
        `
      },
  ],
```
![](https://i.imgur.com/im22gOz.png)

### 3. Add or edit

`name` is field name if given field doesn't exist it will be added, plugin use lodash set 
https://lodash.com/docs/4.17.15#set </br> 
You can add or edit easily deep object for example:
```javascript
const object = {
  id: 1,
  address: {
    info: {
      sth: 'hi'
    }
  }
}
//... some code
transform: [
  { 
    name: 'address.info.sth',
    func: ({address: {info: { sth }}}) => `${sth} world`
  },
  //this will add new data to object
  {
    name: 'address.info.sth.newbranch[0].exist',
    func: ({address: {info: { sth }}}) => `world ${sth}`
  }
]
```
`func` is callback function for args it take row of your data
```javascript
plugins: [
  //... other plugins
  {
    resolve: `@teh23/gatsby-source-api`,
    options: {
      url: 'https://jsonplaceholder.typicode.com/albums/1/photos',
      baseType: 'albums',
      //array for images is require even for one value
      images: ['url', 'thumbnailUrl', 'test'],
      transform: [
        {
          name: 'test',
          func: ({ id }) => `https://via.placeholder.com/${id * 10}`

        },
        {
          name: 'title',
          func: (row) => {
            const { title, albumId } = row
            return `${albumId}-${title}`
          }
        }

      ],
      schema: `
          type albums implements Node {
            albumId: Int
            id: Int
            title: String
            url: String
            thumbnailUrl: String
            test: String
            
            testLocal: File @link(by: "id", from: "testLocal___NODE")
            urlLocal: File @link(by: "id", from: "urlLocal___NODE")
            thumbnailUrlLocal: File @link(by: "id", from: "thumbnailUrlLocal___NODE")
          }
        `
    },
  }
]
```
![](https://i.imgur.com/QkE2dCr.png)



