const newPostBtnHandler = (event) => {
  event.preventDefault();

  window.location.href = '/post/new';
};

const newPostFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#post-name").value.trim();
  const body = document.querySelector("#post-body").value.trim();

  const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({ name, body }),
    headers: { 'Content-Type': 'application/json' }
  });

  // if withAuth tries to redirect, manually implement that here
  // otherwise, 200 response reloads page, else show error
  if (response.ok) {
    if (response.redirected) {
      return document.location.replace(response.url);
    }
    window.location.href = '/dashboard';
  } else {
    alert(response.statusText);
  };
};

document.querySelector('#newPostBtn')?.addEventListener("click", newPostBtnHandler);
document.querySelector('#new-post-form')?.addEventListener("submit", newPostFormHandler);