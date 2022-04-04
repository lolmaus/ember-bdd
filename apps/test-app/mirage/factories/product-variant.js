import { Factory, trait } from 'miragejs';

export default Factory.extend({
  name: null,
  age: null,

  nameJohnDoe: trait({
    name: 'John Doe',
  }),

  age30: trait({
    age: 30,
  }),
});
