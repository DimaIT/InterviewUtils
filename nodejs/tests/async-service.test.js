const { assert } = require('chai');
const {
  asyncHandler,
  asyncHandlerCatch,
  asyncHandlerThrow,
  asyncHandlerResolve,
} = require('../src/tasks/async-service');


describe('Async service catch tests', () => {
  it('Should work', async () => {
    const actual = await asyncHandlerCatch('');
    assert.equal(actual, 'async ');
  });

  it('Should work with message', async () => {
    const actual = await asyncHandlerCatch('message');
    assert.equal(actual, 'async message');
  });

  it('Should handle "error"', async () => {
    const actual = await asyncHandlerCatch('error');
    assert.equal(actual, 'catch ');
  });

  it('Should handle "error" with text', async () => {
    const actual = await asyncHandlerCatch('some error text');
    assert.equal(actual, 'catch some  text');
  })
});

describe('Async service throw tests', () => {
  it('Should work', async () => {
    const actual = await asyncHandlerThrow('');
    assert.equal(actual, 'async async ');
  });

  it('Should work with message', async () => {
    const actual = await asyncHandlerThrow('message');
    assert.equal(actual, 'async async message');
  });

  it('Should throw on "throw"', async () => {
    try {
      await asyncHandlerThrow('throw');
    } catch (e) {
      assert.equal(e.message, 'async throw error');
    }
  });
});

describe('Async service resolve tests', () => {
  it('Should work', async () => {
    const actual = await asyncHandlerResolve('');
    assert.equal(actual, 'async async ');
  });

  it('Should work with message', async () => {
    const actual = await asyncHandlerResolve('message');
    assert.equal(actual, 'async async message');
  });

  it('Should handle "error"', async () => {
    const actual = await asyncHandlerResolve('error');
    assert.equal(actual, 'async catch ');
  });

  it('Should handle "error" with text', async () => {
    const actual = await asyncHandlerResolve('some error text');
    assert.equal(actual, 'async catch some  text');
  });
});

describe('Async service tests', () => {
  it('Should work', async () => {
    const actual = await asyncHandler('');
    assert.equal(actual, 'async async async ');
  });

  it('Should work with message', async () => {
    const actual = await asyncHandler('message');
    assert.equal(actual, 'async async async message');
  });

  it('Should handle "error"', async () => {
    const actual = await asyncHandler('error');
    assert.equal(actual, 'async catch ');
  });

  it('Should handle "error" with text', async () => {
    const actual = await asyncHandler('some error text');
    assert.equal(actual, 'async catch some  text');
  });

  it('Should throw on "throw"', async () => {
    try {
      await asyncHandler('throw');
    } catch (e) {
      assert.equal(e.message, 'async async throw error');
    }
  });

  it('Should throw on "throw" after "error"', async () => {
    try {
      await asyncHandler('throw message error');
    } catch (e) {
      assert.equal(e.message, 'catch throw message  error');
    }
  });
});
