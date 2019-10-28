# better-server-side

> Better server side chat room application

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

### Architecture

> I chose to use Vue and Nuxt because I was already familiar with Vue and enjoyed using it but have never created a server side rendered app. Nuxt provided an enjoyable framework to work with on top of Vue. It was like wearing a nice utility backpack. My only criticism would be the strict default eslint options.

### Todo

> Add tests
>
> Implement some sort of receipt / persistance on new message POST
>
> Brittle ID data in vuex store - use uuid
>
> Repetitive code to get the current user in `Message.vue` should be refactored
>
> Move express logic into own `/api` directory and add express router
>
> Add error styling for `ChatInput.vue` and change `<input>` to `<textarea>` maybe
>
> Add authentication
>
