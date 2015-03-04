// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var Book = function () {
  $('.export-pdf-btn').on('click', this.makeArticlePdf);
  $('.export-pdf-btn').on('click', this.getPdfStatus);
  $('.export-book-btn').on('click', this.makeBookPdf);
  $('.export-book-btn').on('click', this.getPdfStatus);
};

Book.prototype.showWikiExtract = function() {
  $('.btn-show-article').on('click', function(event) {
    console.log("yo");
    $(this).parent().find(".article-intro").slideToggle();
    $(this).hide();
    $(this).parent().find(".btn-hide-article").show();
  });
}

Book.prototype.closeWikiExtract = function () {
  $(".btn-hide-article").on('click', function(event) {
    $(this).parent().find(".article-intro").slideToggle();
    $(this).parent().find(".btn-show-article").show();
    $(this).hide();
  });
};

Book.prototype.deleteBook = function () {
  $(".glyphicon-remove").on('click', function () {
    var self = $(this)

    var bookId = $(this).parent().find('a').attr('class');
    var url = '/users/' + window.UserId + '/books/' + bookId  + '/';

    $.ajax( {
    url: url,
    data: {
      user_id: window.UserId,
      id: bookId
    },
    type: 'DELETE',
    success: function() {
      self.parent().parent().remove();
      console.log("deleted!!");
    },
    error: function() {
      alert("Your personal wiki was not deleted. Please refresh the page and try again.");
    }
  } );
  });
}

Book.prototype.makeArticlePdf = function(event) {

  var exportButton = event.currentTarget
  var pageid = event.currentTarget.classList[1];

  $(exportButton).hide();
  $(exportButton).parent().find('.generating-pdf').removeClass('hidden');
  $.ajax( {
    url: '/exportpdf', 
    data: { 'pageid' : pageid },
    type: 'GET', 
    success: function() {
      console.log("request sent!");
    },
    error: function() {
      console.log("error, sucker!")
    }
  } );
}


Book.prototype.getPdfStatus = function(event) {

  var filename = event.currentTarget.classList[1];
  debugger;

  poll = setInterval(function() {
    $.get('/pdfstatus', { 'filename' : filename }, function (data) {
      if (data.id) {
        console.log("data received!")
        var exportButton = event.currentTarget;
        $(exportButton).parent().find('.open-pdf-btn').removeClass('hidden');
        $(exportButton).parent().find('.generating-pdf').addClass('hidden');
        clearInterval(poll);
      } else {
        poll;
        console.log("polling again")
      }
    });
  }, 2000);
}

Book.prototype.makeBookPdf = function(event) {
  var book_id = event.currentTarget.classList[1]
  var url = '/users/' + window.UserId + '/books/' + book_id + '/export'
  
  $.ajax( {
    url: url, 
    data: "",
    type: 'GET', 
    success: function() {
      console.log("making book!");
    },
    error: function() {
      console.log("error, sucker!")
    }
  } );
}


bookready = function() {
  var book1 = new Book();
  book1.showWikiExtract();
  book1.closeWikiExtract();
  book1.deleteBook();
};

$(document).ready(bookready);
$(document).on('page:load', bookready);
