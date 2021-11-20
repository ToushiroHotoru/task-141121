function outputResults(data) {
  console.log(data);
  $("#datepicker").change(function () {
    for (key in data) {
      let serverDate = data[key]["createdAt"].split("T");
      console.log(serverDate);
      console.log($("#datepicker").val());
      if ($("#datepicker").val() == serverDate) {
        console.log("Есть такая дата");
      }
    }
  });

  $("#btnradio2").click(function () {
    if ($("#btnradio2").is(":checked")) {
      $(".ui-widget").remove();
      $(".showBtn").remove();
      $(".company").removeAttr("disabled");
      $(".main-select-group").prepend(`
    <div class="ui-widget">
      <input type="text" class="form-control" id="datepicker" placeholder="Выберите дату">
    </div>`);
      $(".main-select-group").append(`
        <button class="btn btn-primary showBtn" disabled>Показать</button>
      `);
      $("#datepicker").datepicker({
        dateFormat: "yy-mm-dd",
        regional: "ru",
      });
    }
  });

  $("#btnradio1").click(function () {
    if ($("#btnradio1").is(":checked")) {
      $(".ui-widget").remove();
      $(".showBtn").remove();
      $(".company").prop("disabled", true);
      $(".main-select-group").append(`
    <div class="ui-widget">
      <input type="text" class="form-control search" placeholder="Введите ФИО менеджера"
      aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" readonly>
    </div>`);
    }
  });

  $("#datepicker, .city, .company").change(function () {
    let dateForSend = $("#datepicker").val();
    let departmentForSend = $(".city").val();
    let salonForSend = $(".company").val();
    if (dateForSend !== "" && departmentForSend !== "" && salonForSend !== "") {
      console.log("данные взяты");
      $(".showBtn").removeAttr("disabled");
    }
  });

  $("body").on("click", ".showBtn", function () {
    let dateTime = $("#datepicker").val().split("-");
    console.log(dateTime);
    let gte = new Date(dateTime[0], parseInt(dateTime[1]) - 1, dateTime[2]);
    let lt = new Date(
      dateTime[0],
      parseInt(dateTime[1]) - 1,
      parseInt(dateTime[2]) + 1
    );
    console.log(gte, lt);
    let departmentForSend = $(".city").val();
    let salonForSend = $(".company").val();
    console.log(gte);

    $.ajax({
      url: "/search-answer",
      type: "POST",
      data: {
        gte: gte,
        lt: lt,
        cityName: departmentForSend,
        companyName: salonForSend,
      },
      success: function (data) {
        $(".main-form").append(`
          <div class="accordion" id="accordionExample"></div>
        `);

        for (key in data) {
          $(".accordion").append(`
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  ${data[key]["name"]}
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    hui
                </div>
              </div>
            </div>
          `);
        }
      },
    });
  });
}
