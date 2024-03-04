const postClickHandler = async (event) => {
  event.preventDefault();

  // get post_id from specific "post" div data-id attribute
  const post_id = event.currentTarget.dataset.id;

  // using window.location.href (versus document.location.replace) allows for 
  // a more functional and intuitive back button experience
  if (post_id) {
    window.location.href = `/post/${post_id}`;
  }
};

document.querySelectorAll(".post-card").forEach(e => e.addEventListener("click", postClickHandler));