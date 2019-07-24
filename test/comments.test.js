const { getAgent, getUsers, getPosts, getComments } = require('./data-helpers');

describe('it is a test for comments', () => {
  it('creates a comment', async() => {
    const user = getUsers()[0];
    const post = getPosts()[0];
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

  it('can delete a comment', () => {
    const comments = getComments();
    const stringifiedComments = JSON.parse(JSON.stringify(comments));
    const comment = stringifiedComments[0];

    return getAgent()
      .delete(`/api/v1/comments/${comment._id}`)
      .then(res => {
        expect(res.body).toEqual(comment);
      });
  });
});
