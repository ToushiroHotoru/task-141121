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
      $(".second-form").empty();
      $(".second").empty();
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
        minDate: new Date($("#hiddendelivdate").val()),
        monthNames: [
          "Январь",
          "Февраль",
          "Март",
          "Апрель",
          "Май",
          "Июнь",
          "Июль",
          "Август",
          "Сентябрь",
          "Октябрь",
          "Ноябрь",
          "Декабрь",
        ],
        dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      });
    }
  });

  $("#btnradio1").click(function () {
    if ($("#btnradio1").is(":checked")) {
      $(".quizNewDataParent").remove();
      $(".col-ui-widget").remove();
      $(".showBtn").remove();
      $(".city").prop("selectedIndex", 0);
      $(".second-form").empty();
      $(".second").empty();
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
    $(".main-form").empty();
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
          names.push(data[0]["name"]);

          for (key in data) {
            names.forEach(() => {
              if (!names.includes(data[key]["name"])) {
                names.push(data[key]["name"]);
              }
            });
          }

          console.log(names);

          $(".main-form").append(`
          <div class="accordion" id="accordionExample"></div>
        `);

          names.forEach((item, i) => {
            $(".accordion").append(`
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-heading${i}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}" aria-controls="flush-collapse${i}">
                  ${item}
                </button>
              </h2>
              <div id="flush-collapse${i}" class="accordion-collapse collapse" aria-labelledby="flush-heading${i}">
                <div class="accordion-body">
                     ${outputTables(item)}
                </div>
              </div>
            </div>
          `);
            i++;
          });

          function outputAnswers(arrQuiz, arrAnswer) {
            console.log(arrQuiz);
            console.log(arrAnswer);
            let result = "";
            for (let j = 0; j < arrAnswer.length; j++) {
              console.log("quizzes");
              result += `<tr><th scope="row">${j + 1}</th><td>${
                arrQuiz[j]
              }</td> <td>${arrAnswer[j]}</td></tr>`;
            }
            console.log(result);
            return result;
          }

          function outputTables(name) {
            let table = "";
            console.log(data);
            for (key in data) {
              console.log(data[key]["name"]);
              console.log(name);
              if (data[key]["name"] == name) {
                table += `<table class="table table-striped my-4">
                   <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Вопрос</th>
                        <th scope="col">Ответ</th>
                      </tr>
                    </thead>
                    <tbody>
                     ${outputAnswers(
                       data[key]["quizzes"],
                       data[key]["answers"]
                     )}
                    </tbody>
                        
                  </table><hr style="height: 12px; color: red;" />`;
                console.log(table);
              }
            }
            return table;
          }
        }
      },
    });
  });
}
