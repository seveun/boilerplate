import bluebird from 'bluebird';

declare global {
    interface PromiseConstructor {
      each: typeof bluebird.each;
      map: typeof bluebird.map;
      delay: typeof bluebird.delay;
    }
}
