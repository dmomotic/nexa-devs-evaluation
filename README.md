# Nexa Devs Evaluation

### HTML and CSS

Exercises 1, 2 and 3 were solved using Bootstrap and CSS.



### Movies app

The application is able to:

- Sign up users
- Sign in users
- Search movies by name
- Manage favorites movies by user (add and remove)



##### Database

Movies app uses **Mongo Atlas** (no relational database) to store all the data. The information is distributed in two **collections** the first one called **users** it contains 3 fields **_id, email and password** and just to ensure user's privacy we store a encoded password.

```json
{    
    "_id": "60c14b2fd5f26107a01cf00b"
    "email": "test@mail.com"
    "password": "$2a$10$iFOpt8.XcDGrA5Xhf20l2uP8ZP5xWmpfVsdkbjenb1GLdnJ4n0QLe"
}
```



The second collection is called **movies** where we store the main data of a movie and the user id it belongs to.

```json
{    
	"_id": "60c14b4ed5f26107a01cf00d"
    "poster": "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3Zj..."
    "title": "Star Wars: Episode IV - A New Hope"
    "year": "1977"
    "imdbRating": "8.6"
    "imdbID": "tt0076759"
    "uid": 60c14b2fd5f26107a01cf00b
}
```



**Backend**

An API was develop with **Nodejs** splitting up the structure in **models, controllers, routes, middlewares and helpers**. To secure the API we added  **JWT authentication** 



**Frontend**

The frontend was built with the help of **Vuejs 3** and **Bootstrap 5** where the user is able to carry out all the actions.



![Login](https://i.ibb.co/CbqygkZ/1.png)

![Favorites](https://i.ibb.co/Xs0T61B/2.png)





![Searching](https://i.ibb.co/f1R54Yg/3.png)