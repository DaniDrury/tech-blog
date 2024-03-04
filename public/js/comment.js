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

  // refreshes the page, showing newly added comment, if response OK
  if (response.ok) {
    document.location.replace(`/post/${post_id}`);
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#comment-form').addEventListener('submit', commentFormHandler);