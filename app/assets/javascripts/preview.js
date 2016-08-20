$(".site.index").ready(function() {

  var WikiPreview = function() {};

  WikiPreview.prototype.getWikiPreview = function(marker) {

    $("#info-preview").empty();
    var $loader = $("<div>", { class: "circles-loader", html: "Loading..." });
    $("#info-preview").append($loader);

    var url = /preview/
    var markerData = {
      article_id: marker.metadata.id
    }
    var self = this

    $.ajax( {
      url: url,
      data: markerData,
      type: 'GET',
      success: function(response){
        if (response.status == "success") {
          self.renderWikiInfowindow(response.preview, marker);
        } else {
          self.renderNoResults(marker)
        }
      },
      error: function(){
        self.renderNoResults(marker);
      },
      dataType: "json"
    } );
  };

  WikiPreview.prototype.renderWikiInfowindow = function(preview, marker) {
    $("#info-preview").removeClass("intro-text");
    var $imgContainer = $("<div>", { class: "img-preview" });
    var $img = $("<img>", { src: preview.image });
    var $title = $("<h4>", { html: marker.title });
    var $preview = $("<p>", { html: wordCount(preview.text) });
    var $readMore = $("<a>", { href: "https://en.wikipedia.org/?curid=" + marker.metadata.id, html: "Read more" })
    var $saveButton = $("<input>", { 
      class: "save-article btn highlight-btn", 
      id: marker.metadata.id, 
      value: "Save article",
      type: "button"
    })
    $saveButton.attr("data-lat", marker.position.lat());
    $saveButton.attr("data-lng", marker.position.lng());

    $("#info-preview").empty();
    $imgContainer.append($img);
    $("#info-preview").append($imgContainer)
    $("#info-preview").append($title);
    $preview.append($readMore);
    $("#info-preview").append($preview);
    $("#info-preview").append($saveButton);
    
    function wordCount(text) {
      if (text.length > 330) {
        var preview = text.slice(0, 330);
      } else {
        var preview = text;
      }
      return preview + " ... " 
    }
  };

  WikiPreview.prototype.renderNoResults = function(marker) {
    var $noResults = $("<h3>", { html: "No preview available" });
    var $noResultsText = $("<p>", { html: "Guess you'll have to read the full article :(" });
    var $articleLink = $("<a>", { href: "https://en.wikipedia.org/?curid=" + marker.metadata.id, html: "Full article" })
    $("#info-preview").empty();
    $("#info-preview").append($noResults).append($noResultsText).append($articleLink);
  };

  window.previewWindow = new WikiPreview();

});
