const { getAgent, getPosts } = require('../test/data-helpers');

describe('it is a test for posts', () => {
  it('creates a post', async() => {
    const post = getPosts()[0];
    return getAgent()
      .post('/api/v1/posts')
      .send({
        photoURL: post.photoURL,
        caption: post.caption,
        tags: post.tags
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),  
          username: expect.any(String),                                  
          photoURL: post.photoURL,
          caption: post.caption,
          tags: post.tags,
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
    const stringifiedPosts = JSON.parse(JSON.stringify(posts));
    const post = stringifiedPosts[0];
    
    return getAgent()
      .get(`/api/v1/posts/${post._id}`)
      .then(res => {
        expect(res.body).toEqual({ ...post, comment: expect.any(Array), username: expect.any(String) });
      });
  });

  it('can update a post with patch', () => {
    const posts = getPosts();
    const stringifiedPosts = JSON.parse(JSON.stringify(posts));
    const post = stringifiedPosts[0];
    return getAgent()
      .patch(`/api/v1/posts/${post._id}`)
      .send({ caption: 'updated caption' })
      .then(res => {
        expect(res.body).toEqual({ ...post, caption: 'updated caption', username: expect.any(String) });
      });
  });

 
});
 // it('deletes a post by id', async() => {
  //   const posts = getPosts();
  //   const stringifiedPosts = JSON.parse(JSON.stringify(posts));
  //   const post = stringifiedPosts[0];

  //   return getAgent()
  //     .delete(`/api/v1/posts/${post._id}`)
  //     .then(res => {
  //       expect(res.body).toEqual(post);
  //     });
  // });


