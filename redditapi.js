export default {
    search: function(term, sort, limit){
        return fetch(`https://www.reddit.com/search.json?q=${term}&sort=${sort}&limit=${limit}`)
        .then(response => response.json())
        .then(data => data.data.children.map(data => data.data))
        .catch(err => cosnole.log(err));
    }
}