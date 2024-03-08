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

const postClickHandler = (event) => {
  event.preventDefault();

  const post_id = event.currentTarget.dataset.id;

  return window.location.href = `/dashboard/${post_id}`;
};

const editPostFormHandler = async (event) => {
  event.preventDefault();

  const id = document.querySelector("#edit-post-form").dataset.id;
  const name = document.querySelector("#post-name").value.trim();
  const body = document.querySelector("#post-body").value.trim();

  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ name, body }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    if (response.redirected) {
      return document.location.replace(response.url);
    }
    window.location.href = '/dashboard';
  } else {
    alert(response.statusText);
  };
};

const deletePostHandler = async (event) => {
  event.preventDefault();

  const id = event.currentTarget.dataset.id;

  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    if (response.redirected) {
      return document.location.replace(response.url);
    }
    window.location.href = '/dashboard';
  } else {
    alert(response.statusText);
  };
};

// use ?. chain operator to check if element exists before trying to addEventListiner
// if element does not exist, action is skipped
document.querySelectorAll('.post-card')?.forEach(e => e.addEventListener("click", postClickHandler));
document.querySelector('#newPostBtn')?.addEventListener("click", newPostBtnHandler);
document.querySelector('#new-post-form')?.addEventListener("submit", newPostFormHandler);
document.querySelector('#deleteBtn')?.addEventListener('click', deletePostHandler);
document.querySelector('#edit-post-form')?.addEventListener('submit', editPostFormHandler);