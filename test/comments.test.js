const { getAgent, getUsers, getPosts } = require('./data-helpers');

describe('it is a test for comments', () => {
  it('creates a comment', async() => {
    const user = getUsers()[0];
    const post = getPosts()[0];
    console.log(user);
    return getAgent()
      .post('/api/v1/comments')
      .send({
        comment: 'iojdsoigjdg',
        commentBy: user._id,
        post: post._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          comment: 'iojdsoigjdg',
          commentBy: expect.any(String),
          post: expect.any(String),
          __v: 0
        });
      });
  });
});
