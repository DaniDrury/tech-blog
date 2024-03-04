const commentBtnHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#commentInput').value.trim();
  
  const response = await fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify({ comment }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/post/:id');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#comment-form').addEventListener('submit', commentBtnHandler);