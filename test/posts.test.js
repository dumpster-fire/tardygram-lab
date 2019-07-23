const { getAgent, getPosts } = require('../test/data-helpers');

describe('it is a test for posts', () => {
  it('creates a post', async() => {
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

  it('gets all posts', () => {
    const posts = getPosts();

    return getAgent()
      .get('/api/v1/posts')
      .then(res => {
        posts.forEach(post => {
          expect(res.body).toContainEqual(post);
        });
      });
  });

  it('can get 1 post by id', () => {
    const posts = getPosts();
    const post = posts[0];
    return getAgent()
      .get(`/api/v1/posts/${post._id}`)
      .then(res => {
        expect(res.body).toEqual(post);
      });
  });
});
