$("#btnradio3").click(function () {
    if ($("#btnradio3").is(":checked")) {
      $(".ui-widget").remove();
      $(".city").prop("selectedIndex", 0);
      $(".company").prop("selectedIndex", 0);
      $(".showBtn").remove();
      $(".company").removeAttr("disabled");
      $(".main-form").empty();
      $(".osnovnayaForma").addClass("osnovnayaForma2");
      $(".main-select-group").prepend(`
    <div class="ui-widget">
      
    </div>`);
    }
  });