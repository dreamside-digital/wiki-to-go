// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var Book = function () {
};

Book.prototype.showWikiArticle = function() {
  $('.btn-show-article').on('click', function(event) {
    var pageid = event.currentTarget.classList[1];
    var wikiIframe = document.createElement("iframe");
    var iframeSource = 'http://en.wikipedia.org/?curid=' + pageid;
    wikiIframe.setAttribute("src", iframeSource);
    wikiIframe.setAttribute("width", "100%");
    wikiIframe.setAttribute("height", "400px");
    wikiIframe.setAttribute("frameborder", "0");

    $(this).parent().find(".article-iframe").show();
    $(this).parent().find(".article-iframe").append(wikiIframe);
    console.log("did it!!");
    $(this).hide();
    $(this).parent().find(".btn-hide-article").show()
  });
};

Book.prototype.closeWikiArticle = function () {
  $(".btn-hide-article").on('click', function(event) {
    $(this).parent().find(".article-iframe").slideToggle();
    $(this).parent().find(".btn-toggle-article").show();
    $(this).hide();
  });
};

Book.prototype.toggleWikiArticle = function () {
  $(".btn-toggle-article").on('click', function(event) {
    $(this).parent().find(".article-iframe").slideToggle();
    $(this).parent().find(".btn-hide-article").show();
    $(this).hide();
  });
}

bookready = function() {
  var book1 = new Book();
  book1.showWikiArticle();
  book1.closeWikiArticle();
  book1.toggleWikiArticle();
};

$(document).ready(bookready);
$(document).on('page:load', bookready);