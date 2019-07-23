const { getAgent } = require('../test/data-helpers');

describe('it is a test for posts', () => {
  it('our Post post test', async() => {
    return getAgent()
      .post('/api/v1/posts')
      .send({
        photoURL: 'a photo here',
        caption: 'whatever',
        tags: ['#tardygram', '#ilovemycats']
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),  
          username: expect.any(String),
          photoURL: 'a photo here',
          caption: 'whatever',
          tags: ['#tardygram', '#ilovemycats'],
          __v: 0
        });
      });
  });
});
