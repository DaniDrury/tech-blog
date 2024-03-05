const postClickHandler = (event) => {
  event.preventDefault();

  // get post_id from specific "post" div data-id attribute
  const post_id = event.currentTarget.dataset.id;

  // using window.location.href (versus document.location.replace) allows for 
  // a more functional and intuitive back button experience
  if (post_id) {
    window.location.href = `/post/${post_id}`;
  }
};

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

// use ?. chain operator in case specific element doesn't exist on a rendered page
document.querySelectorAll(".post-card")?.forEach(e => e.addEventListener("click", postClickHandler));
document.querySelector('#newPostBtn')?.addEventListener("click", newPostBtnHandler);
document.querySelector('#new-post-form')?.addEventListener("submit", newPostFormHandler);