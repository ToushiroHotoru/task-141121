function outputResults(data) {
  $("#datepicker").change(function () {
    for (key in data) {
      let serverDate = data[key]["createdAt"].split("T");
      if ($("#datepicker").val() == serverDate) {
        console.log("Есть такая дата");
      }
    }
  });

  $("#btnradio2").click(function () {
    if ($("#btnradio2").is(":checked")) {
      $(".quizNewDataParent").remove();
      $(".col-ui-widget").remove();
      $(".city").prop("selectedIndex", 0);
      $(".company").prop("selectedIndex", 0);
      $(".showBtn").remove();
      $(".company").removeAttr("disabled");
      $(".main-form").empty();
      $(".main-select-group, hr").show();
      $(".main-select-group-row").prepend(`
      <div class="col col-ui-widget">
        <div class="ui-widget">
          <input type="text" class="form-control" id="datepicker" placeholder="Выберите дату">
        </div>
      </div>`);
      $(".main-select-group").append(`
        <div class="col">
          <button class="btn btn-dark showBtn">Показать</button>
        </div>
      `);
      $("#datepicker").datepicker({
        dateFormat: "yy-mm-dd",
        regional: "ru",
      });
    }
  });

  $("#btnradio1").click(function () {
    if ($("#btnradio1").is(":checked")) {
      $(".quizNewDataParent").remove();
      $(".col-ui-widget").remove();
      $(".showBtn").remove();
      $(".city").prop("selectedIndex", 0);
      $(".company").prop("selectedIndex", 0);
      $(".main-form").empty();
      $(".company").prop("disabled", true);
      $(".main-select-group, hr").show();
      $(".main-select-group-row").append(`
    <div class="col col-ui-widget">
      <div class="ui-widget">
        <input type="text" class="form-control search" placeholder="Введите ФИО менеджера"
        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" readonly>
      </div>
    </div>`);
    }
  });

  $(".showBtn").click(function () {
    let dateForSend = $("#datepicker").val();
    let departmentForSend = $(".city").val();
    let salonForSend = $(".company").val();
    console.log(dateForSend, departmentForSend, salonForSend);
    if (
      dateForSend == "" ||
      salonForSend == "Выберите салон" ||
      departmentForSend == "Выберите подразделение"
    ) {
      const sendAlert =
        $(`<div class="alert alert-warning alert-dismissible fade show my-3" role="alert">
                  <strong>Не все поля заполнены!</strong> Пожалуйста заполните все поля.
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`).hide();

      sendAlert.appendTo(".main").fadeIn();
    }
  });

  $("body").on("click", ".showBtn", function () {
    let departmentForSend = $(".city").val();
    let salonForSend = $(".company").val();
    let dateTime = $("#datepicker").val().split("-");
    let gte = new Date(dateTime[0], parseInt(dateTime[1]) - 1, dateTime[2]);
    let lt = new Date(
      dateTime[0],
      parseInt(dateTime[1]) - 1,
      parseInt(dateTime[2]) + 1
    );
    let alertFlag = true;
    if (
      dateTime == "" ||
      salonForSend == "Выберите салон" ||
      departmentForSend == "Выберите подразделение"
    ) {
      const sendAlert =
        $(`<div class="alert alert-warning alert-dismissible fade show my-3" role="alert">
                  <strong>Не все поля заполнены!</strong> Пожалуйста заполните все поля.
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`).hide();

      sendAlert.appendTo(".main").fadeIn();
      alertFlag = false;
    }

    $.ajax({
      url: "/answer/get-answer",
      type: "POST",
      data: {
        gte: gte,
        lt: lt,
        cityName: departmentForSend,
        companyName: salonForSend,
      },
      success: function (data) {
        let i = 1;
        if (data.length === 0 && alertFlag) {
          $(".main-form").empty();

          const sendAlert =
            $(`<div class="alert alert-warning alert-dismissible fade show my-3" role="alert">
                  <strong>Ничего не найдено!</strong> В этот день, в данной компании, отправок форм не было.
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`).hide();

          sendAlert.appendTo(".main").fadeIn();
        } else {
          let names = [];

          for (key in data) {
            names.foreach((item, i, arr) => {
              if (!names.includes(item)) {
                names.push(item);
              }
            });
          }

          console.log(names);

          $(".main-form").append(`
          <div class="accordion" id="accordionExample"></div>
        `);
          for (key in data) {
            $(".accordion").append(`
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-heading${i}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}" aria-expanded="false" aria-controls="flush-collapse${i}">
                  ${data[key]["name"]}
                </button>
              </h2>
              <div id="flush-collapse${i}" class="accordion-collapse collapse" aria-labelledby="flush-heading${i}" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">hui</div>
              </div>
            </div>
          `);
            i++;
          }
        }
      },
    });
  });
}
