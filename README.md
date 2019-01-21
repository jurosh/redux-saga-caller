# Redux Saga Caller - Call Sagas Once Per Params

Easy way how to prevent calling [redux sagas](https://redux-saga.js.org/docs/api/) twice with same params in paralel.

Once saga with same parameter finish, library will stop ignoring new requests.

Tiny library - **only 1KB** minified!

Note: Require `redux-saga` as peer dependency (installed in your project).

## Usage API

Install `npm i jurosh/redux-saga-caller`

```
callOncePerParams(customIdentifier, sagaFunctionWithParams)
```

...having:

- **identifier**: *string* / *array of string* to uniquely identify your action
- **sagaFunctionWithParams**: *array* with saga function name and it's params (same as official saga [call](https://redux-saga.js.org/docs/advanced/RunningTasksInParallel.html) params)

## Example

```JavaScript
import { callOncePerParams } from 'jurosh/redux-saga-caller';

// Somewhere in your redux saga...

yield callOncePerParams(
  ['FETCH_ARTICLES', 'ASC', 10],
  [fetchArticlesSaga, { order: 'ASC', limit: 10}]
);
```

See and run `src/index.test.js` to fully understand library.


**Please give project :star: if you like it!**