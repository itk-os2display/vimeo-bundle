// Register the function, if it does not already exist.
if (!window.slideFunctions['itk-vimeo']) {
  window.slideFunctions['itk-vimeo'] = {
  /**
     * Setup the slide for rendering.
     * @param scope
     *   The slide scope.
     */
    setup: function setupSlide(scope) {
      var slide = scope.ikSlide;

      if (!document.ITK_VIMEO_LOADED) {
        document.ITK_VIMEO_LOADED = true;
        $.getScript('https://player.vimeo.com/api/player.js')
        .done(function() {
          console.log("loaded");
        })
        .fail(function() {
          document.ITK_VIMEO_LOADED = false;
        });
      }
    },

    /**
     * Run the slide.
     *
     * @param slide
     *   The slide.
     * @param region
     *   The region object.
     */
    run: function runSlide(slide, region) {
      region.itkLog.info("Running itk-vimeo slide: " + slide.title);

      var page = $('.slide-' + slide.uniqueId);

      // Wait fadeTime before start to account for fade in.
      region.$timeout(function () {
        var options = {
          id: slide.options.id,
          width: page.width(),
          background: 1,
          loop: false
        };

        var element = document.querySelector('.js-itk-vimeo--player-' + slide.uniqueId);

        var player = new Vimeo.Player(element, options);

        player.off('play');
        player.off('ended');

        player.on('play', function() {
          console.log('play');
          region.progressBar.start(player.getDuration());
        });

        player.on('ended', function() {
          console.log('ended');
          region.nextSlide();
        });

        player.setLoop(false);
        player.setVolume(0);
        player.setCurrentTime(220);

        player.play();
      }, region.fadeTime);
    }
  };
}