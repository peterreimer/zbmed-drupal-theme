(function($) {

    Drupal.behaviors.edoweb_drupal_image_viewer = {
    attach: function (context, settings) {
      var serviceUrl = settings.edoweb.deepzoomServiceUrl + '?imageUrl=';

      if ( serviceUrl ) {
        // Prepare Service
        var callbackString = "&callback=?";
        var imageUrl = null;
        var thumdreference = null;
        var tileSourcesFn = null;

        // find appropriate elements and info and append some stuff 
        $('.download:first', context).ajaxComplete(function() {
          var mimetype = $(this).attr('title').replace(/Download /,'').toLowerCase().replace(/-/, '/');;
          $('.field-name-field-edoweb-preview', context).once().append('<div class="field-item" property="dc:format">' +  mimetype + '</div>');

          $('.field-name-field-edoweb-preview', context).find('.thumb').once().append('<p>Inhalt von Mimetype: ' + $('.field-item[property:dc-format]:contains("image")').html() + '</p>');

          //alert('deepzoomServiceUrl: ' + settings.edoweb.deepzoomServiceUrl + ', Basepath: ' + settings.basePath);
          var imagethumb = $('.field-item[property:dc-format]:contains("image")', context);
          thumbreference = imagethumb.parent().parent().parent().find('.thumb a');
          imageUrl = thumbreference.attr('href');
          //alert(imagethumb.html() + "\n" + thumbreference.html() + "\n"  + imageUrl);
          var thumb = imagethumb.parent().parent().parent().find('.thumb a');
          imagethumb.parent().parent().once('viewerDiv', function(){ 
            $(this).append('<div class="viewer" id="osd_view" style="width: 800px; height: 600px; background:#ccc;"></div>');
          });

        //$('.field-name-field-edoweb-preview .field-item').attr('property','dc:format').once().append(mimetype);
        //$(this).parent().parent().parent().addClass('thumb');
      
        //Drupal.edoweb_drupal_theme_child.attachBehaviors(context);

      }); 


        //alert(thumbreference.html());

        // initialize and hide dialog-window for OpenSeaDragon viewer
        $('#osd_view', context).once('dialogDiv', function() {
          $(this).dialog({
            modal: true,
            autoOpen: false,
            height: ($(window).height() -20),
            width: ($(window).width() -20),
            buttons: {
              Ok: function() {
                $( this ).dialog( "close" );
                }
              },
              close: function() {
                //if(viewer){
                //viewer.destroy();
                //alert('viewer zertört');
                //}
            }

          });
        });

        thumbreference.click(function(){
        //alert('added click');
        if(typeof viewer != "undefined"){
          //alert(viewer);
          viewer.destroy();
          }
        deepZoomService();
        $("#osd_view").dialog("open");
        return false;
        });

        function deepZoomService (){
          var url = serviceUrl + imageUrl + callbackString;

          $.getJSON(url, function(json){
          tileSourcesFn = json;
          viewer = OpenSeadragon({
            id: "osd_view",
            prefixUrl: "../sites/all/themes/zbmed-drupal-theme/OSimages/",
            tileSources: {
              Image: {
                xmlns:    "http://schemas.microsoft.com/deepzoom/2008",
                Url: tileSourcesFn.Url + "/",
                Format:   tileSourcesFn.Format, 
                Overlap:  tileSourcesFn.Overlap, 
                TileSize: tileSourcesFn.TileSize,
                Size: {
                  Height: tileSourcesFn.Size.Height,
                  Width:  tileSourcesFn.Size.Width
                  }
                }
              },
            showNavigator: "true",
            });
          });
        }; 
      }
    }
  };


  Drupal.behaviors.edoweb_drupal_video_html5_viewer = {
    attach: function (context, settings) {

      var videoUrl = null;
      var videothumb = $('.field-item[property:dc-format]:contains("video/mp4")', context);
      var mime = videothumb.html();
      var thumbreference = videothumb.parent().parent().parent().find('.thumb a');
      videoUrl = thumbreference.attr('href');
      thumbreference.parent().html('<div><video width="500" controls><source src="' 
        + videoUrl + '" type="' + mime + '"></video></div>');
      
      var videoUrl = null;
      var videothumb = $('.field-item[property:dc-format]:contains("video/webm")', context);
      var mime = videothumb.html();
      var thumbreference = videothumb.parent().parent().parent().find('.thumb a');
      videoUrl = thumbreference.attr('href');
      thumbreference.parent().html('<div><video width="500" controls><source src="' 
        + videoUrl + '" type="' + mime + '"></video></div>');

      
    }
  };

  Drupal.behaviors.edoweb_drupal_audio_html5_player = {
    attach: function (context, settings) {

      var audioUrl = null;
      var audiothumb = $('.field-item[property:dc-format]:contains("audio/mpeg")', context);
      var mime = audiothumb.html();
      var thumbreference = audiothumb.parent().parent().parent().find('.thumb a');
      audioUrl = thumbreference.attr('href');
      thumbreference.parent().html('<div><audio width="500" controls><source src="' 
        + audioUrl + '" type="' + mime + '"></audio></div>');
      
      var audioUrl = null;
      var audiothumb = $('.field-item[property:dc-format]:contains("audio/ogg")', context);
      var mime = audiothumb.html();
      var thumbreference = audiothumb.parent().parent().parent().find('.thumb a');
      audioUrl = thumbreference.attr('href');
      thumbreference.parent().html('<div><audio width="500" controls><source src="' 
        + audioUrl + '" type="' + mime + '"></audio></div>');
      
    }
  };
  
  
})(jQuery);
