import redditapi from './redditapi';
const form = document.getElementById('search-form');
const searchterm = document.getElementById('searchterm');

form.addEventListener('submit', e => {
    const search_term = searchterm.value;
    const sortby = document.querySelector("input[name='sortby']:checked").value;
    const limit = document.getElementById('limit').value;
    if (search_term === '') {
        showmessage('Please enter a serach term', 'alert-danger');
    }
    redditapi.search(search_term, sortby, limit)
        .then(results => {            
            console.log(results);
            var output = '<div class="card-columns">';
            results.forEach(result => {
                let image = result.preview ? result.preview.images[0].source.url : 'https://www.affiliatemarketertraining.com/wp-content/uploads/2015/01/Reddit.jpg'
                output += `
            <div class="card">
            <img class="card-img-top" src="${image}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${result.title}</h5>
              <p class="card-text">${truncate(result.selftext, 70)}</p>
              <a href="${result.url}" target="_blank" class="btn btn-primary">Read More</a>
              <hr>
               <span class="badge badge-secondary">subreddit : ${result.subreddit}</span><br>
              <span class="badge badge-dark">score : ${result.score}</span>
            </div>
          </div>
            `;
            });
            output += '</div>';
            document.getElementById('results').innerHTML = output;
        });
    searchterm.value = '';
    e.preventDefault();
});

function showmessage(msg, cls) {
    var div = document.createElement('div');
    div.className = `alert ${cls}`;
    div.innerHTML = msg;
    const parent = document.getElementById('search-container');
    const child = document.getElementById('search');
    parent.insertBefore(div, child);

    setTimeout(() => {
        document.querySelector(".alert").remove();
    }, 3000);
}
function truncate(str, no_of_words) {
    return str.split(" ").splice(0,no_of_words).join(" ");
}