This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.






# TESTING

# Testing your code with JEST

tuto :
https://www.youtube.com/watch?v=NHMIn723hQY
https://www.youtube.com/watch?v=D9DdY2WmM-s

tuto : TDD
https://www.youtube.com/watch?v=-bmdf1oATQo
https://www.leighhalliday.com/mock-fetch-jest

1. create a data.json in /src
```
[
  {
    "id": 1,
    "name": "Chicago Pizza",
    "image": "/images/chicago-pizza.jpg",
    "desc": "The pan in which it is baked gives the pizza its characteristically high edge which provides ample space for large amounts of cheese and a chunky tomato sauce.",
    "price": 9
  },
  {
    "id": 2,
    "name": "Neapolitan Pizza",
    "image": "/images/neapolitan-pizza.jpg",
    "desc": "This style of pizza is prepared with simple and fresh ingredients: a basic dough, raw tomatoes, fresh mozzarella cheese, fresh basil, and olive oil. A fantastic original pizza.",
    "price": 7
  },
  {
    "id": 3,
    "name": "New York Pizza",
    "image": "/images/ny-pizza.jpg",
    "desc": "New York-style pizza has slices that are large and wide with a thin crust that is foldable yet crispy. It is traditionally topped with tomato sauce and mozzarella cheese.",
    "price": 8
  },
  {
    "id": 4,
    "name": "Sicilian Pizza",
    "image": "/images/sicilian-pizza.jpg",
    "desc": "Sicilian pizza is pizza prepared in a manner that originated in Sicily, Italy. Sicilian pizza is also known as sfincione or focaccia with toppings. A great tasteful pizza all around.",
    "price": 9
  }
]
```

1.1. Modify tsconfig.json
add :
```
{
  "compilerOptions": {
    "target": "es2015",
    "module": "commonjs",
    "strict": true,
    "moduleResolution": "node",
    "resolveJsonModule": true ///
  }
}

```


https://mariusschulz.com/articles/importing-json-modules-in-typescript


2. Folder __test__

create a folder :
/src/__test__

create a file :


```
import * as pizzas from '../data.json';
interface IPizza {
  id: number;
  name: string;
  image: string;
  desc: string;
}
// snapshot for UI testing
test('the pizza data is correct', () => {
  expect(pizzas).toMatchSnapshot();
  expect(pizzas).toHaveLength(4);
  expect(pizzas.map((pizza: IPizza) => pizza.name)).toEqual([
    'Chicago Pizza',
    'Neapolitan Pizza',
    'New York Pizza',
    'Sicilian Pizza',
  ])
});
```

```
yarn test
```

2.1. another test

same file  test.js
```
for (let index = 0; index < pizzas.length; index++) {
  test(`pizzas[${index}] should have properties (id, name, image, desc, price)`, () => {
    expect(pizzas[index]).toHaveProperty('id');
    expect(pizzas[index]).toHaveProperty('name');
    expect(pizzas[index]).toHaveProperty('desc');
    expect(pizzas[index]).toHaveProperty('price');
    // expect(pizzas[index]).toHaveProperty('crazy price'); // TO REMOVE : my failed cause doesn't exist
  })
}
```
run the test
```
yarn test

yarn run v1.22.1
$ jest
 PASS  src/__tests__/my_test.spec.tsx (9.949s)
  ✓ the pizza data is correct (12ms)
  ✓ pizzas[0] should have properties (id, name, image, desc, price) (2ms)
  ✓ pizzas[1] should have properties (id, name, image, desc, price) (1ms)
  ✓ pizzas[2] should have properties (id, name, image, desc, price) (1ms)
  ✓ pizzas[3] should have properties (id, name, image, desc, price) (1ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   1 passed, 1 total
Time:        11.744s
Ran all test suites.
```


2.2 Mocking

```
// MOCKING : mimic a get from a server
test('mock return value of a fucntion one time', () => {
  const mock = jest.fn();

  mock.mockReturnValueOnce('Hello').mockReturnValueOnce('Two');

  mock();
  mock();

  expect(mock).toHaveBeenCalledTimes(2);

  mock('Hello', 'Two', 'Yo');
  expect(mock).toHaveBeenCalledWith('Hello', 'Two', 'Yo');
})
```


2.2.1. toHaveBeenCalledTimes

```
  mock.mockReturnValueOnce('Hello').mockReturnValueOnce('Two');

  mock();
  mock();
  expect(mock).toHaveBeenCalledTimes(2);
```

your function have really be called 2 times


```
  mock('Hello', 'Two', 'Yo');
  expect(mock).toHaveBeenCalledWith('Hello', 'Two', 'Yo');
})
```

- toHaveBennCalled :
called  by these 3 arg : 

```
  mock('Moi');
  expect(mock).toHaveBeenLastCalledWith('Moi');
```

- toHaveBeenLastCalledWith
same  : just check who called last time



fetch : mock
```
// my test
// creating a fake mock function :  const globalAny: any = global; replacing the global fetch
globalAny.fetch = jest.fn(() => {
  Promise.resolve({
    json: () => Promise.resolve(3.14)
  })
})

// reset the number of call function
beforeEach(() => {
  globalAny.fetch.mockClear();
})

it('my convert function', async () => {
  // console.log("===>", Promise.resolve(convert('USD', 'CAD')));
  const rate = await convert('USD', 'CAD');

  // expect(rate).toEqual(1.32);
  expect(fetch).toHaveBeenCalledTimes(1);
})

it("handle rejection will null", async () => {
  globalAny.fetch.mockImplementationOnce(() => Promise.reject("API Failure"))
  const rate = await convert('USD', 'CAD');
  expect(rate).toEqual(null);
  expect(fetch).toHaveBeenCalledWith(
    `https://api.exchangeratesapi.io/latest?base=USD`
  )
})
```



3. Jest-fetch-mock

```
  yarn add jest-fetch-mock --dev @types/jest-fetch-mock
```

addin setupTest.ts
```
// import fetchMock from 'jest-fetch-mock/types';
// import fetchMock from "fetch-jest-mock";
import fetchMock from "jest-fetch-mock"

fetchMock.enableMocks();
OR

global.fetch = require('jest-fetch-mock');
```










### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).