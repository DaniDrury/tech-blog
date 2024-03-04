const postClickHandler = async (event) => {
  event.preventDefault();

  const post_id = event.target.dataset.id;

  console.log('\n -------------------- \n');
  console.log(post_id);
  console.log('\n -------------------- \n');

  if (post_id) {
    document.location.replace(`/post/${post_id}`);
  }
};

document.querySelectorAll(".post-card").addEventListener("click", postClickHandler);