jQuery( window ).resize(function() {
  resetAffix();
});
function resetAffix(){
  jQuery('#myAffix').affix({
    offset: {
      top: jQuery('#myHeader').height()
    }
  });
}
if (jQuery('#myAffix .navbar-brand.donttouch').length==0) {
  jQuery('#myAffix').on('affix.bs.affix', function () {
    console.log('Fired!');
    jQuery(".navbar-brand").removeClass( 'visible-xs' );
  } );
  jQuery('#myAffix').on( 'affixed-top.bs.affix', function () {
    console.log('unaff');
    jQuery(".navbar-brand").addClass( 'visible-xs' );
  } );

}
