/**
 * @file
 *  Add default behaviors for the Flickr API
 *
 * @author Raymond Jelierse
 */

Drupal.behaviors.potwBlock = function() {
    if (Drupal.settings.flickr.apikey != null && Drupal.settings.flickr.blockPhotoSet != null && $('#flickr-block-placeholder').length > 0) {
        $.getJSON('http://api.flickr.com/services/rest/?format=json&jsoncallback=?',
        {
            method:      'flickr.photosets.getPhotos',
            api_key:     Drupal.settings.flickr.apikey,
            photoset_id: Drupal.settings.flickr.blockPhotoSet,
            extras:      'last_update',
            per_page:    1,
            page:        1
        },
        function(data) {
            $.each(data.photoset.photo, function(index, photo) {
                path = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/';
                image_thumb = path + photo.id + '_' + photo.secret + '_m.jpg';
                image_full = path + photo.id + '_' + photo.secret + '_b.jpg';

                container = $('#flickr-block-placeholder').parent();
                container.empty();
                container.append('<a class="photo-thumbnail flickr-potw-fancybox" rel="flickr-potw" id="flickr-photo-'+ photo.id +'" href="' + image_full + '"><img src="' + image_thumb + '" alt="' + photo.title + '" /></a>');
                container.append('<p class="photo-caption">' + photo.title + '</p>');

                $('.flickr-potw-fancybox').fancybox();
            });
        });
    }
}