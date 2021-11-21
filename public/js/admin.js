$("#btnradio3").click(function () {
    if ($("#btnradio3").is(":checked")) {
      $(".ui-widget").remove();
      $(".city").prop("selectedIndex", 0);
      $(".company").prop("selectedIndex", 0);
      $(".showBtn").remove();
      $(".company").removeAttr("disabled");
      $(".main-form").empty();
      $(".osnovnayaForma").addClass("osnovnayaForma2");
      $(".main-select-group").append(`
      <div class="ui-widget">
      
      </div>
        <button class="btn btn-primary showBtn">Показать</button>
      `);
    }
  });