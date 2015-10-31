window.copyToClipboard = function(text){
  var copyDiv = document.createElement('div');
  copyDiv.contentEditable = true;
  document.body.appendChild(copyDiv);
  copyDiv.innerHTML = text;
  copyDiv.unselectable = "off";
  copyDiv.focus();
  document.execCommand('SelectAll');
  document.execCommand("Copy", false, null);
  document.body.removeChild(copyDiv);
}

document.addEventListener('DOMContentLoaded', function() {
  $('#smurled').hide();
  $(document).ready(function() {
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
            copyToClipboard(xhr.token_url);
            $('#smurled').show();
          }
        }
      });
    });
  });
}, false);
