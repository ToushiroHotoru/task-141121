$(document).ready(function () {
  //твой код, у меня не работает, из за ssh
  // let isUserAdmin = () => {
  //   return BX24.isAdmin();
  // };

  var isUserAdmin = true; // Пусть возрощает ответ в эту переменную, обязательно

  $.ajax({
    url: "/isAdmin",
    type: "POST",
    data: {
      isAdmin: isUserAdmin,
    },
    success: function (data) {
      console.log(isUserAdmin);
      if (data.admin) {
        $(".panel-top").append(data.button);
      }
      console.log(data.admin);
    },
  });

  $.ajax({
    url: "/get-data",
    type: "GET",
    success: function (data) {
      $(".checkboxLoader").remove();
      $(".btnCheck").removeAttr("disabled");
      $(".search").val("");
      for (key in data) {
        $(".city").append(
          `<option class="cityName">${getCityName(data[key])}</option>`
        );
      }

      $(".city").change(function () {
        const form = $(this);
        let output = form.val();
        for (key in data) {
          if (data[key]["cityName"] == output) {
            $(".main-select-group__selected").remove();
            $(".company").append(`${getCompanyName(data[key]["company"])}`);
            $(".company").removeAttr("disabled");
          }
        }
      });

      $(".company").change(function () {
        const form = $(this);
        let output = form.val();
        if (output !== "Выберите салон") {
          $(".search").removeAttr("readonly");
        }
      });

      $("body").on("click", ".search", function () {
        $.ajax({
          url: "/quiz/get-quiz",
          type: "GET",
          cache: false,
          success: function (data) {
            const workNames = getWorkersNames();
            $(".search").autocomplete({
              source: getWorkersNames(),
              select: function (event, ui) {
                $(".main-form").empty();
                if (workNames.includes(ui.item.value)) {
                  $(".main-form").append(
                    `<div>Сотрудник: <span class="nameTo">${ui.item.value}</span></div>`
                  );

                  let i = 1;
                  for (key in data) {
                    $(".main-form").append(`
                      <div>${i}. <span class="quizMainValue">${data[key]["note"]}</span>
                      <div class="d-flex align-items-center form-check form-switch formatVoprosovChek">
                        <input class="form-check-input quiz " swich_id="${i}" type="checkbox" id="flexSwitchCheckChecked">
                        <label class="form-check-label mx-1 pala${i}" for="flexSwitchCheckChecked" id="flexSwitchCheckChecked">no</label>
                        <input type="text" placeholder="Пожалуйста напишите почему" data-reason="${i}" class="reason reasonForNo${i}">
                      </div>
                      <hr class="quiz-hr"/></div>
                    `);
                    i++;
                  }
                  $(".main-form").append(
                    `<button class="btn btn-primary mx-1 my-2 send-form">Отправить</button>`
                  );
                  $(".form-check-input").click(function () {
                    let switchId = $(this).attr("swich_id");
                    if (this.checked) {
                      $(".pala" + switchId).text("yes");
                      $(".reasonForNo" + switchId).val("");
                      $(".reasonForNo" + switchId).css("display", "none");
                    } else {
                      $(".pala" + switchId).text("no");
                      $(".reasonForNo" + switchId).css("display", "block");
                    }
                  });
                }
              },
            });
          },
        });
      });

      // START GET all data for admin panel
      $("#btnradio3").click(function () {
        if ($("#btnradio3").is(":checked")) {
          $(".quizNewDataParent").remove();
          $("hr").css("display", "none");
          $(".main-form").empty();
          $(".ui-widget").remove();
          $(".second-form").empty();
          $(".second").empty();
          $(".city").prop("selectedIndex", 0);
          $(".company").prop("selectedIndex", 0);
          $(".showBtnShow").remove();
          $(".company").removeAttr("disabled");
          $(".main-form").empty();
          $(".main-select-group").css("display", "none");

          $.ajax({
            url: "/get-data",
            type: "GET",
            beforeSend: function () {
              $(".main-form").append(`
        <div class="text-center my-5 loadSpinner">
          <div class="spinner-grow" style="width: 5rem; height: 5rem;" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        `);
            },
            success: function (data) {
              $(".loadSpinner").remove();
              let i = 1;
              $(".main-form").append(`
        <div class="main-form-city">
          <hr />
            <h3>Города</h3>
          <hr />
        </div>
        <div class="main-form-company">
          <hr />
            <div class="pb-2">
              <h3>Салоны</h3>
              <select name="select" class="cityAdmin form-select main-select-group__item">
                  <option selected>Выберите город</option>
              </select>
            </div>
        </div>
        <div class="main-form-worker">
          <hr />
            <div>
              <h3>Сотрудники</h3>
              <div class="d-flex pb-2">
                <select name="select" class="cityAdminWorker form-select main-select-group__item">
                    <option selected>Выберите город</option>
                </select>
                <select name="select" class="companyAdmin form-select main-select-group__item">
                    <option selected>Выберите салон</option>
                </select>
                <input class="workerAdmin  main-select-group__item" placeholder="ФИО">
              </div>
            </div>
        </div>
          <div class="main-form-quiz">
          <hr />
              <h3>Вопросы</h3>
          </div>
        `);
              for (key in data) {
                $(".main-form-city").append(`
          <div class="d-flex align-items-center cityItem">
                <div><div class="widthpx20"><span class="cityId">${i}.</span></div> <input type="text" data-id="${data[key]["_id"]}" value="${data[key]["cityName"]}" class="cityValue"></div>
                <div class="btn-city-group">
                    <button class="btn btn-dark my-1 btn-sm btn-city-edit">edit</button>
                    <button class="btn btn-dark my-1 btn-sm btn-city-delete">delete</button>
                </btn>
          </div>
        `);
                i++;
              }
              $(".main-form-city").append(`
            <div class="d-flex align-items-center ms-3">
                <div class="width102 marginpx9"><input type="text" placeholder="Напишите название нового города..."  class="cityNewData width101"></div>
                <div>
                    <button class="btn btn-dark my-1 btn-sm add-data-city">Добавить</button>
                </btn>
          </div>
        `);

              for (key in data) {
                $(".cityAdmin, .cityAdminWorker").append(
                  `<option data-id="${data[key]["_id"]}">${data[key]["cityName"]}</option>`
                );
              }

              $(".cityAdmin").change(function () {
                $(".companyItem").remove();
                $(".addNewCompany").remove();
                let cityName = $(this).val();
                let dataId = $(this).find("option:selected").attr("data-id");
                let dataCompanyId = $(this)
                  .find("option:selected")
                  .attr("data-id-company");
                for (key in data) {
                  if (data[key]["cityName"] == cityName) {
                    data[key]["company"].forEach((item, i, arr) => {
                      $(".main-form-company").append(`
                    <div class="d-flex align-items-center companyItem" data-id="${
                      data[key]["_id"]
                    }">
                      <div class="width102"><div class="widthpx20"><span class="companyId">${
                        i + 1
                      }</span>.</div> <input type="text" data-name="${
                        item["companyName"]
                      }" data-id="${item["_id"]}" value="${
                        item["companyName"]
                      }" class="companyValue width103"></div>
                      <div class="btn-company-group">
                          <button class="btn btn-dark my-1 btn-sm btn-company-edit">edit</button>
                          <button class="btn btn-dark my-1 btn-sm btn-company-delete">delete</button>
                      </btn>
                    </div>
              `);
                    });
                  }
                }
                if (cityName != "Выберите город") {
                  $(".main-form-company").append(`
           <div class="d-flex align-items-center addNewCompany ms-3">
                <div class="marginpx9 width102"><input type="text" placeholder="Напишите название нового салона..." data-id="${dataId}" data-id-company="${dataCompanyId}" class="companyNewData width101"></div>
                <div>
                    <button class="btn btn-dark my-1 btn-sm add-data-company">Добавить</button>
                </btn>
          </div>
          `);
                } else {
                  $(".addNewCompany").remove();
                }
              });

              $(".cityAdminWorker").change(function () {
                $(".companyAdmin__selected").remove();
                $(".addNewWorker").remove();
                let cityName = $(this).val();
                for (key in data) {
                  if (data[key]["cityName"] == cityName) {
                    data[key]["company"].forEach((item, i) => {
                      $(".companyAdmin").append(
                        `<option class="companyAdmin__selected" data-id="${data[key]["_id"]}" data-id-array="${item["_id"]}">${item.companyName}</option>`
                      );
                    });
                  }
                }
              });

              $(".companyAdmin").change(function () {
                $(".workerItem").remove();
                $(".addNewWorker").remove();
              });

              $("body").on("click", ".workerAdmin", function () {
                const workNamesAdmin = getWorkersNames();

                $(".workerAdmin").autocomplete({
                  source: workNamesAdmin[2],
                  select: function (event, ui) {
                    if (workNamesAdmin[2].includes(ui.item.value)) {
                      let companyName = $(this).val();
                      let dataIdArray = $(this)
                        .find("option:selected")
                        .attr("data-id-array");
                      let dataId = $(this)
                        .find("option:selected")
                        .attr("data-id");

                      if (companyName != "Выберите салон") {
                        $(".main-form-worker").append(`
                <div class="d-flex align-items-center addNewWorker ms-3">
                      <div class="marginpx9 width102"><input type="text" placeholder="Напишите имя нового сотрудника..." data-id="${dataId}" data-id-array="${dataIdArray}"  class="workerNewData width101"></div>
                      <div>
                          <button class="btn btn-dark my-1 btn-sm add-data-worker">Добавить</button>
                      </btn>
                </div>
                `);
                      } else {
                        $(".addNewWorker").remove();
                      }

                      $(".main-form-worker").append(`
                                    <div class="d-flex align-items-center ms-4 workerItem" data-id="${workNamesAdmin[0]}">
                                      <div class="width102"><input type="text" data-name="${ui.item.value}" data-id="${workNamesAdmin[1]}" value="${ui.item.value}" class="workerValue width103"></div>
                                      <div class="btn-worker-group">
                                          <button class="btn btn-dark my-1 btn-sm btn-worker-edit">edit</button>
                                          <button class="btn btn-dark my-1 btn-sm btn-worker-delete">delete</button>
                                      </btn>
                                    </div>
                              `);
                    }
                  },
                });

                function getWorkersNames() {
                  let companyName = $(".companyAdmin").val();
                  for (key in data) {
                    for (let i = 0; i < data[key]["company"].length; i++) {
                      if (
                        companyName == data[key]["company"][i]["companyName"]
                      ) {
                        return [
                          data[key]["_id"],
                          data[key]["company"][i]["_id"],
                          data[key]["company"][i]["workers"],
                        ];
                      }
                    }
                  }
                }
              });
            },
          });
        }
      });
      // END GET all data for admin panel

      $("#btnradio1").click(function () {
        if ($("#btnradio1").is(":checked")) {
          $("hr").css("display", "block");
          $(".main-select-group").css("display", "flex");
          $(".quizNewDataParent").remove();
          $(".col-ui-widget").remove();
          $(".showBtnShow").remove();
          $(".city").prop("selectedIndex", 0);
          $(".companyDiv").removeClass("col-md-3").addClass("col-md-4");
          $(".cityDiv").removeClass("col-md-3").addClass("col-md-4");
          $(".second-form").empty();
          $(".second").empty();
          $(".company").prop("selectedIndex", 0);
          $(".main-form").empty();
          $(".company").prop("disabled", true);
          $(".main-select-group, hr").show();
          $(".main-select-group-row").append(`
                <div class="col-md-4 col-12 my-1 col-ui-widget">
                    <div class="main-autocomplete ui-widget">
                        <input type="text" class="form-control search" placeholder="Введите ФИО менеджера"
                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" readonly>
                    </div>
                </div>`);
        }
      });

      $("#btnradio2").click(function () {
        if ($("#btnradio2").is(":checked")) {
          $("hr").css("display", "block");
          $(".main-select-group").css("display", "flex");
          $(".quizNewDataParent").remove();
          $(".col-ui-widget").remove();
          $(".city").prop("selectedIndex", 0);
          $(".company").prop("selectedIndex", 0);
          $(".companyDiv").removeClass("col-md-4").addClass("col-md-3");
          $(".cityDiv").removeClass("col-md-4").addClass("col-md-3");
          $(".showBtnShow").remove();
          $(".company").removeAttr("disabled");
          $(".main-form").empty();
          $(".second-form").empty();
          $(".second").empty();
          $(".main-select-group, hr").show();

          $(".main-select-group-row").prepend(`
            <div class="col-md-3 col-12 my-1 col-ui-widget">
              <div class="ui-widget">
                <input type="text" class="form-control" id="datepicker" placeholder="Дата">
              </div>
            </div>`);
          $(".main-select-group-row").append(`
            <div class="col-md-3 col-12 my-1 d-grid gap-2 showBtnShow">
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

      $(".showBtn").click(function () {
        let dateForSend = $("#datepicker").val();
        let departmentForSend = $(".city").val();
        let salonForSend = $(".company").val();
        if (
          dateForSend == "" ||
          salonForSend == "Выберите салон" ||
          departmentForSend == "Выберите подразделение"
        ) {
          const sendAlert =
            $(`<div class="alert fixed-top alert-warning alert-dismissible fade show my-3" role="alert">
                  <strong>Не все поля заполнены!</strong> Пожалуйста заполните все поля.
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`).hide();

          sendAlert.appendTo(".main").fadeIn();
          deleteAlert();
        }
      });

      function getCompanyName(data) {
        let leak = [];
        for (let i = 0; i < data.length; i++) {
          leak.push(
            '<option class="companyName main-select-group__selected">' +
              data[i]["companyName"] +
              "</option>"
          );
        }
        return leak;
      }

      function getCityName(object) {
        let data = "";
        data += object["cityName"];
        return data;
      }

      function getWorkersNames() {
        let companyName = $(".company").val();
        for (key in data) {
          for (let i = 0; i < data[key]["company"].length; i++) {
            if (companyName == data[key]["company"][i]["companyName"]) {
              return data[key]["company"][i]["workers"];
            }
          }
        }
      }
    },
  });

  // START POST send user answer
  $("body").on("click", ".send-form", async function (e) {
    e.preventDefault();
    let name = $(".nameTo").text();
    let companyName = $(".company").val();
    let cityName = $(".city").val();
    $(".search").val("");
    let reasons = [];
    let answers = [];
    let quizzes = [];
    $(".quizMainValue").each(function (i) {
      let something = i + 1 + ". " + $(this).text() + "/";
      quizzes.push(something);
    });

    $(".reason").each(function (i) {
      let something = $(this).val() + "/";
      reasons.push(something);
    });

    reasons = reasons.splice("/");
    reasons.forEach((item, i, arr) => {
      item = item.slice(0, -1);
      arr.splice(i, 1, item);
    });

    quizzes = quizzes.splice("/");
    quizzes.forEach((item, i, arr) => {
      item = item.slice(0, -1);
      arr.splice(i, 1, item);
    });

    $(".quiz:checkbox").each(function () {
      if ($(this).is(":checked")) {
        answers.push("yes");
      } else {
        answers.push("no");
      }
    });

    console.log(reasons);

    $.ajax({
      url: "/answer/save-answer",
      type: "POST",
      data: {
        cityName: cityName,
        companyName: companyName,
        name: name,
        answers: answers,
        quizzes: quizzes,
        reasons: reasons,
      },
      success: function () {
        $(".main-form").empty();

        const sendAlert =
          $(`<div class="alert fixed-top alert-success alert-dismissible fade show my-3" role="alert">
            <strong>Форма отправлена!</strong> Благодарим вас, за обратную связь!.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`).hide();

        sendAlert.appendTo(".main").fadeIn();
        deleteAlert();
      },
    });
  });

  // END POST send user answer

  // START delete alert notification
  function deleteAlert() {
    setTimeout(() => {
      $(".alert").remove();
    }, 9000);
  }
  // END delete alert notification

  // START GET all users answers
  $("body").on("click", ".timepickerReset, .showBtn", function () {
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
        $(`<div class="alert fixed-top alert-warning alert-dismissible fade show my-3" role="alert">
                  <strong>Не все поля заполнены!</strong> Пожалуйста заполните все поля.
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`).hide();

      sendAlert.appendTo(".main").fadeIn();
      deleteAlert();
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
            $(`<div class="alert fixed-top alert-warning alert-dismissible fade show my-3" role="alert">
                  <strong>Ничего не найдено!</strong> В этот день, в данной компании, отправок форм не было.
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`).hide();

          sendAlert.appendTo(".main").fadeIn();
          deleteAlert();
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

          $(".main-form").append(`
          <div class="d-flex align-items-center timepicker pb-3">
            от<input type="time" class="datepickerStart">
            : до<input type="time" class="datepickerEnd">
            <button type="button" class="btn btn-dark ms-2 timepickerBtn">Сортировать</button>
          </div>
          `);

          $("body").on("click", ".timepickerBtn", function () {
            let startDate = $(".datepickerStart").val();
            let endDate = $(".datepickerEnd").val();
            let day = $(".hasDatepicker").val();

            if (startDate && endDate) {
              $(".timepickerReset").remove();
              $(".timepickerBtn").remove();
              $(".timepicker").append(`
              <button type="button" class="btn btn-dark ms-2 timepickerReset">Сбросить</button>
            `);

              let dateOne = new Date(`${day} ${startDate}`);
              let dateTwo = new Date(`${day} ${endDate}`);

              $(".createdAt").each(function () {
                let dateRecord = new Date(`${day} ${$(this).text()}`);
                if (
                  dateOne.getTime() < dateRecord.getTime() &&
                  dateRecord.getTime() < dateTwo.getTime()
                ) {
                } else {
                  $(this).parent().remove();
                  console.log("запись удалена");
                }
              });

              $(".accordion-body").each(function () {
                console.log($(this).children().length == 0);
                if ($(this).children().length == 0) {
                  $(this).parent().parent().remove();
                }
              });
            } else {
              const sendAlert =
                $(`<div class="alert fixed-top alert-warning alert-dismissible fade show my-3" role="alert">
                  <strong>Заполните все поля!</strong> Для сортировки данных заполните все поля.
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`).hide();

              sendAlert.appendTo(".main").fadeIn();
              deleteAlert();
            }
          });

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
          function getAnswerData(date) {
            let answerDate = new Date(date);
            return (
              answerDate.getHours() +
              ":" +
              answerDate.getMinutes() +
              ":" +
              answerDate.getSeconds()
            );
          }

          function outputAnswers(arrQuiz, arrAnswer, arrReason) {
            let result = "";
            for (let j = 0; j < arrAnswer.length; j++) {
              result += `<tr><td>${arrQuiz[j]}</td> <td>${arrAnswer[j]}</td> <td>${arrReason[j]}</td></tr>`;
            }
            return result;
          }

          function outputTables(name) {
            let table = "";
            for (key in data) {
              if (data[key]["name"] == name) {
                table += `<div class="table-responsive"><table class="table table-striped mt-0 mb-4">
                   <thead>
                      <tr>
                        <th scope="col">Вопрос</th>
                        <th scope="col">Ответ</th>
                        <th scope="col">Причина</th>
                      </tr>
                    </thead>
                    <tbody>
                     ${outputAnswers(
                       data[key]["quizzes"],
                       data[key]["answers"],
                       data[key]["reasons"]
                     )}
                    </tbody>
                      <div class="createdAt">${getAnswerData(
                        data[key]["createdAt"]
                      )}</div>
                  </table><hr class="seperateHr"/></div>`;
              }
            }
            return table;
          }
        }
      },
    });
  });
  // END GET all users answers

  // START add, update, delete cities
  $("body").on("click", ".add-data-city", function () {
    let cityNewData = $(".cityNewData").val();
    let company = [
      { companyName: "компания1" },
      { companyName: "компания2" },
      { companyName: "компания3" },
    ];

    $.ajax({
      url: "/add-data-city",
      type: "POST",
      data: {
        cityName: cityNewData,
        company: company,
        isAdmin: isUserAdmin,
      },
      success: function () {},
    });
  });

  $("body").on("click", ".btn-city-edit", function () {
    const city = $(this).parent().parent();
    let cityNewData = city.find(".cityValue").val();
    let cityId = city.find(".cityValue").attr("data-id");
    $.ajax({
      url: "/edit-data-city",
      type: "POST",
      data: {
        cityNewData: cityNewData,
        cityId: cityId,
        isAdmin: isUserAdmin,
      },
      success: function () {
        console.log(isUserAdmin);
      },
    });
  });

  $("body").on("click", ".btn-city-delete", function () {
    const city = $(this).parent().parent();
    let cityId = city.find(".cityValue").attr("data-id");

    $.ajax({
      url: "/delete-data-city",
      type: "DELETE",
      data: {
        cityId: cityId,
        isAdmin: isUserAdmin,
      },
      success: function () {
        city.remove();
      },
    });
  });
  // END add, update, delete cities

  // START add, update, delete company
  $("body").on("click", ".add-data-company", function () {
    let id = $(".companyNewData").attr("data-id");
    let companyNewData = $(".companyNewData").val();
    // let companyId = $(".companyNewData").attr("data-id-company");

    $.ajax({
      url: "/add-data-company",
      type: "POST",
      data: {
        companyNewData: companyNewData,
        id: id,
        isAdmin: isUserAdmin,
      },
      success: function () {},
    });
  });

  $("body").on("click", ".btn-company-edit", function () {
    const company = $(this).parent().parent();
    let companyNewName = company.find(".companyValue").val();
    let companyOldName = company.find(".companyValue").attr("data-name");
    let id = company.attr("data-id");
    $.ajax({
      url: "/edit-data-company",
      type: "POST",
      data: {
        id: id,
        companyNewName: companyNewName,
        companyOldName: companyOldName,
        isAdmin: isUserAdmin,
      },
      success: function () {},
    });
  });

  $("body").on("click", ".btn-company-delete", function () {
    const company = $(this).parent().parent();
    let companyId = company.find(".companyValue").attr("data-id");
    let companyOldName = company.find(".companyValue").val();
    $.ajax({
      url: "/delete-data-company",
      type: "DELETE",
      data: {
        companyId: companyId,
        companyOldName: companyOldName,
        isAdmin: isUserAdmin,
      },
      success: function () {
        company.remove();
      },
    });
  });
  // END add, update, delete company

  // START add, update, delete worker
  $("body").on("click", ".add-data-worker", function () {
    let workerArrayId = $(".workerNewData").attr("data-id-array");
    let workerNewName = $(".workerNewData").val();
    let id = $(".workerNewData").attr("data-id");
    $.ajax({
      url: "/add-data-worker",
      type: "POST",
      data: {
        id: id,
        workerNewName: workerNewName,
        workerArrayId: workerArrayId,
        isAdmin: isUserAdmin,
      },
      success: function () {},
    });
  });

  $("body").on("click", ".btn-worker-edit", function () {
    const worker = $(this).parent().parent();
    let workerNewName = worker.find(".workerValue").val();
    let workerOldName = worker.find(".workerValue").attr("data-name");
    let workerArrayId = worker.find(".workerValue").attr("data-id");
    let id = $(".workerItem").attr("data-id");
    $.ajax({
      url: "/edit-data-worker",
      type: "POST",
      data: {
        id: id,
        workerNewName: workerNewName,
        workerOldName: workerOldName,
        workerArrayId: workerArrayId,
        isAdmin: isUserAdmin,
      },
      success: function () {},
    });
  });

  $("body").on("click", ".btn-worker-delete", function () {
    const worker = $(this).parent().parent();
    let workerArrayId = worker.find(".workerValue").attr("data-id");
    let workerOldName = worker.find(".workerValue").val();
    let id = $(".workerItem").attr("data-id");
    $.ajax({
      url: "/delete-data-worker",
      type: "DELETE",
      data: {
        id: id,
        workerArrayId: workerArrayId,
        workerOldName: workerOldName,
        isAdmin: isUserAdmin,
      },
      success: function () {
        worker.remove();
      },
    });
  });

  // END add, update, delete worker

  // START add, update, delete quizzes
  $("body").on("click", "#btnradio3, .checkAlert", function () {
    setTimeout(function () {
      $(".quizItem").remove();
      $(".quizNewData").remove();
      $(".create-quiz").remove();
      $.ajax({
        url: "/quiz/get-quiz",
        type: "GET",
        success: function (data) {
          let i = 1;
          for (key in data) {
            $(".main-form-quiz").append(`
          <div class="d-flex align-items-center quizItem">
                <div><div class="widthpx20"><span class="quizId">${i}</span>.</div> <input type="text" data-value="${data[key]["note"]}" value="${data[key]["note"]}" class="quizValue"></div>
                <div class="btn-quiz-group">
                    <button class="btn btn-dark my-1 btn-sm btn-group-edit">edit</button>
                    <button class="btn btn-dark my-1 btn-sm btn-group-delete">delete</button>
                </btn>
          </div>
                `);
            i++;
          }
          $(".main-form-quiz").append(`
        <div class="d-flex align-items-center quizNewDataParent ms-3">
                <div class="marginpx9"><input type="text" placeholder="Напишите новый вопрос..."  class="quizNewData"></div>
                <div>
                    <button class="btn btn-dark my-1 btn-sm create-quiz">Добавить</button>
                </btn>
          </div>
       
        `);
        },
      });
    }, 500);
  });

  $("body").on("click", ".create-quiz", function (e) {
    e.preventDefault();
    let quizNewData = $(".quizNewData").val();
    if (!quizNewData) {
      const sendAlert =
        $(`<div class="alert fixed-top alert-warning alert-dismissible fade show my-3" role="alert">
            <strong>Поле вопроса не заполнено!</strong> Пожалуйста заполните поле запроса.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
         </div>`).hide();

      sendAlert.prependTo(".main-form-quiz").fadeIn();
      deleteAlert();
    } else {
      $.ajax({
        url: "/quiz/create-quiz",
        type: "POST",
        data: {
          note: quizNewData,
          isAdmin: isUserAdmin,
        },
        success: function () {
          const sendAlert =
            $(`<div class="alert fixed-top alert-success alert-dismissible fade show my-3" role="alert">
            <strong>Вопрос добавлен!</strong> Нажмите на <strong><span class="checkAlert">сюда</span></strong>, чтобы обновить днные.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
         </div>`).hide();

          sendAlert.prependTo(".main-form-quiz").fadeIn();
          deleteAlert();
        },
      });
    }
  });

  $("body").on("click", ".btn-group-delete", function (e) {
    const quiz = $(this).parent().parent();
    let quizOldData = quiz.find(".quizValue").val();
    $.ajax({
      url: "/quiz/delete-quiz",
      type: "DELETE",
      data: {
        quizOldData: quizOldData,
        isAdmin: isUserAdmin,
      },
      success: function () {
        quiz.remove();
      },
    });
  });

  $("body").on("click", ".btn-group-edit", function (e) {
    const quiz = $(this).parent().parent();
    let quizOldData = quiz.find(".quizValue").attr("data-value");
    let quizNewData = quiz.find(".quizValue").val();

    $.ajax({
      url: "/quiz/edit-quiz",
      type: "POST",
      data: {
        quizOldData: quizOldData,
        quizNewData: quizNewData,
        isAdmin: isUserAdmin,
      },
      success: function () {
        const sendAlert =
          $(`<div class="alert fixed-top alert-success alert-dismissible fade show my-3" role="alert">
            <strong>Вопрос изменен!</strong> Вопрос был изменен и добавлен.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
         </div>`).hide();

        sendAlert.prependTo(".main").fadeIn();
        deleteAlert();
      },
    });
  });
  // END add, update, delete quizzes
});
