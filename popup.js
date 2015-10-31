document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');

  checkPageButton.addEventListener('click', function() {
    chrome.tabs.query({active: true}, function(tab) {
      $.ajax({
        url: 'http://smurl.schmierkov.de/links',
        method: 'POST',
        data: {
          original_url: tab[0].url,
          format: 'json'
        },
        statusCode: {
          201: function(xhr) {
            console.log(xhr.token_url);
          },
          422: function(xhr) {
            console.log(xhr.responseJSON.error);
          }
        }
      });
    });
  }, false);
}, false);
