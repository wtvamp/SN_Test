define([
  'jquery',
  'lodash'
], function( $, _ ) {
  'use strict';

  return {
    handle: function( $form ) {
      // jscs:disable
      return function( type, messages ) {
      // jscs:enable
        if ( !_.isArray(messages) ) {
          messages = messages.ValidationResults;
        }

        if ( type === 'Validation' ) {
          _.each(messages, function( message ) {
            var prop = message.PropertyName,
                $el = $form.find('[name*="' + prop + '"], [data-validation="' + prop + '"]'),
                $parent = $el.parent(),
                $prev = $el.prev(),
                $wrap = $el.closest('.form-group'),
                $label = $wrap.find('label'),
                $container = $wrap.find('.error-container'),
                $popover = $('<div>', { 'class': 'popover bottom' });

            if ( !$container.length ) {
              $container = $wrap;
            }

            if ( /null/.test(message.ErrorMessage) ) {
              message.ErrorMessage = prop + ' is required.';
            }

            if ( $wrap.is('.has-error') &&
                $wrap.data('props') && _.contains($wrap.data('props'), prop)
            ) {
              return;
            }

            $wrap
                .addClass('has-error')
                .data('props', ($wrap.data('props') || []).concat([prop]));

            $popover
              .append($('<div>', { 'class': 'arrow' }))
              .append(
                $('<div>', { 'class': 'popover-content' })
                  .append('<p>').text(message.ErrorMessage)
              );

            $label.after($popover.show());

            if ( $parent.is('.k-state-default') ) {
              $parent.toggleClass('k-state-default k-state-error');
            }

            if ( $prev.is('.k-state-default') ) {
              $prev.toggleClass('k-state-default k-state-error');
            }
          });
        }
      };
    },
    set: function( $wrap, error ) {
      var $el = $wrap.find('[data-validation="' + error.prop + '"]'),
          $popover = $('<div>', { 'class': 'popover'});

      if ( $wrap.context.offsetParent.offsetTop > 100 ) {
        $popover.addClass('above top');
      } else {
        $popover.addClass('below bottom');
      }

      if ( $wrap.is('.has-error') ) {
        return;
      }

      if ( !$el.length ) {
        $el = $wrap.children('input, select, textarea, .input-group');
      }

      $wrap.addClass('has-error');

      $popover
        .append($('<div>', { 'class': 'arrow' }))
        .append(
          $('<div>', { 'class': 'popover-content' })
            .append('<p>').text(error.message)
        );

      if ( !$el.length ) {
        $wrap.append($popover.show());
        $wrap.addClass('editable');
      } else {
        $el.after($popover.show());
      }
    },
    clear: function( $form, $el ) {
      if ( $el ) {
        return $el.removeClass('has-error')
          .find('.popover').remove().end()
          .find('.k-state-error').toggleClass('k-state-error k-state-default');
      }

      $form.find('.has-error').removeData('props').removeClass('has-error');
      $form.find('.popover').remove();

      // kendo styles
      $form.find('.k-state-error').toggleClass('k-state-error k-state-default');
    }
  };
});
