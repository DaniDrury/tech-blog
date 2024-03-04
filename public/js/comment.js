const commentFormHandler = async (event) => {
  event.preventDefault();

  const body = document.querySelector('#commentInput').value.trim();
  // get post_id from form data-id attribute in post.hbs
  const post_id = document.querySelector('#comment-form').dataset.id;

  const response = await fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ body, post_id }),
    headers: { 'Content-Type': 'application/json' }
  });

  // if withAuth tries to redirect, manually implement that here
  // otherwise, 200 response reloads page, else show error
  if (response.ok) {
    if (response.redirected) {
      return document.location.replace(response.url);
    }
    document.location.reload();
  } else {
    alert(response.statusText);
  };
};

document.querySelector('#comment-form').addEventListener('submit', commentFormHandler);