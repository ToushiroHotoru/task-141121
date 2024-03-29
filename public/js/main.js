$(document).ready(function () {
  // BX24.init(function () {
  //   console.log(BX24.isAdmin());
  //   isUserAdmin = BX24.isAdmin();
  // });
  var isUserAdmin = true;
  $.ajax({
    url: "/isAdmin",
    type: "POST",
    data: {
      isAdmin: isUserAdmin,
    },
    success: function (data) {
      if (data.admin) {
        $(".panel-top").append(data.button);
      }
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
        $(".main-form").empty();
        const form = $(this);
        $(".companyName").remove();
        let output = form.val();
        if (output === "Выберите подразделение") {
          $(".main-form").empty();
        }
        for (key in data) {
          if (data[key]["cityName"] == output) {
            $(".main-select-group__selected").remove();
            $(".company").append(
              `${getCompanyName(data[key]["company"], data[key]["_id"])}`
            );
            $(".company").removeAttr("disabled");
          }
        }
      });

      function getCompanyName(data, id) {
        let leak = "";
        for (let i = 0; i < data.length; i++) {
          leak += `<option data-id="${id}" data-response-person="${data[i]["companyResponsePerson"]}" class="companyName main-select-group__selected">
              ${data[i]["companyName"]} 
              </option>`;
        }
        return leak;
      }

      function getCityName(object) {
        let data = "";
        data += object["cityName"];
        return data;
      }

      $(".company").change(function () {
        const form = $(this);
        let output = form.val();
        if (output !== "Выберите салон") {
          $(".search").removeAttr("readonly");
        }
      });

      $("body").on("change", ".checkListToggler", function () {
        const form = $(this);
        let output = form.val();
        let id = $(".company").find("option:selected").attr("data-id");
        if (output !== "Выберите салон") {
          $(".search").removeAttr("readonly");
          getWatcher().then((result) => {
            $(".main-form").empty();
            for (key in data) {
              if (data[key]["_id"] == id) {
                data[key]["quizzes"].forEach((quiz, i) => {
                  $(".main-form").append(`
                      <div>${
                        i + 1
                      }. <span class="quizMainValue" main-watcher-first="${
                    result["watchers"][0]["name"]
                  }" main-watcher-second="${result["watchers"][1]["name"]}">${
                    quiz["quiz"]
                  }</span>
                      <div class="d-flex align-items-center form-check form-switch formatVoprosovChek">
                        <input class="form-check-input quiz " swich_id="${i}" type="checkbox" id="flexSwitchCheckChecked">
                        <label class="form-check-label mx-1 pala${i}" for="flexSwitchCheckChecked" id="flexSwitchCheckChecked">Нет</label>
                        <input type="text" placeholder="Пожалуйста напишите почему" data-reason="${i}" class="reason reasonForNo${i}">
                      </div>
                      <input type="hidden" class="answerResponsePerson" value="${
                        quiz["responsePerson"]
                      }"></input>
                      <input type="hidden" class="answerSpectatePerson" value="${
                        quiz["spectatePerson"]
                      }"></input>
                      <hr class="quiz-hr"/></div>
                    `);
                });
              }
            }
            $(".main-form").append(``);
            $(".main-form").append(
              `<button class="btn btn-dark mx-1 my-2 send-form">Отправить</button>`
            );
            $(".form-check-input").click(function () {
              let switchId = $(this).attr("swich_id");
              if (this.checked) {
                $(".pala" + switchId).text("Да");
                $(".reasonForNo" + switchId).val("");
                $(".reasonForNo" + switchId).css("display", "none");
              } else {
                $(".pala" + switchId).text("Нет");
                $(".reasonForNo" + switchId).css("display", "block");
              }
            });
          });
        } else {
          $(".main-form").empty();
        }
      });

      // START GET all data for admin panel
      $("body").on("click", "#btnradio3, .checkAlert", function () {
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
              <div class="main-form-watcher">
          <hr />
            <h3>Главный наблюдатель</h3>
        </div>
        <div class="main-form-city">
        <hr />
            <h3>Города</h3>
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
          <div class="main-form-quiz">
          <hr />
              <h3>Вопросы</h3>
              <div class="w-100 pb-2">
                    <select name="select" class="cityAdminQuiz w-100 form-select">
                        <option selected>Выберите город</option>
                    </select>
              </div>
          </div>
        `);
              for (key in data) {
                $(".main-form-city").append(`
          <div class="d-flex align-items-center cityItem">
          <div class="widthpx20"><span class="cityId">${i}.</span></div>
                <input type="text" data-id="${data[key]["_id"]}" value="${data[key]["cityName"]}" class="cityValue w-75">
                <div class="btn-city-group">
                    <button class="btn btn-dark my-1 btn-sm btn-city-edit">изменить</button>
                    <button class="btn btn-dark my-1 btn-sm btn-city-delete">удалить</button>
                </btn>
          </div>
        `);
                i++;
              }
              $(".main-form-city").append(`
            <div class="d-flex align-items-center">
                  <div class="widthpx20"></div>
                  <input type="text" placeholder="Напишите название нового города"  class="cityNewData width101">
                <div>
                    <button class="btn btn-dark my-1 btn-sm w-100 add-data-city">Добавить</button>
                </btn>
          </div>
        `);

              for (key in data) {
                $(".cityAdmin, .cityAdminQuiz").append(
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
                    data[key]["company"].forEach((item, i) => {
                      $(".main-form-company").append(`
                    <div class="d-flex mb-3 companyItem" data-id="${
                      data[key]["_id"]
                    }">
                        <div class="widthpx20 mx-1">
                          <span class="companyId">${i + 1}</span>.
                        </div> 
                        <div class="d-flex flex-column me-3 w-100">
                        <input type="text" data-name="${
                          item["companyName"]
                        }" data-id="${item["_id"]}" value="${
                        item["companyName"]
                      }" class="companyValue w-100 ">
                        <input type="text" placeholder="Ответственный" class="companyResponsePerson w-100" value="${
                          item["companyResponsePerson"]
                        }">
                          <div class="btn-company-group d-flex w-100">
                            <button class="btn btn-dark me-1 w-100 btn-company-edit">изменить</button>
                            <button class="btn btn-dark ms-1 w-100 btn-company-delete">удалить</button>
                          </div>
                        </div>
                    </div>
              `);
                    });
                  }
                }
                if (cityName != "Выберите город") {
                  $(".main-form-company").append(`
           <div class="d-flex align-items-center addNewCompany mx-3">
                <div class="marginpx9 d-flex flex-column w-100">
                  <input type="text" placeholder="Напишите название нового салона" data-id="${dataId}" data-id-company="${dataCompanyId}" class="companyNewData w-100 width101">
                  <input type="text" placeholder="Напишите ответсвенного" class="companyNewResponsePerson w-100">
                  <div>
                    <button class="btn btn-dark my-1 w-100 add-data-company">Добавить</button>
                </div>
                </div>
                
          </div>
          `);
                } else {
                  $(".addNewCompany").remove();
                }
              });

              $(".cityAdminQuiz").change(function () {
                let cityName = $(this).val();
                for (key in data) {
                  if (data[key]["cityName"] == cityName) {
                    $(".quizItem").remove();
                    $(".quizNewDataParent").remove();
                    let cityName = $(this)
                      .parent()
                      .parent()
                      .find(".cityAdminQuiz")
                      .val();
                    for (key in data) {
                      if (data[key]["cityName"] === cityName) {
                        data[key]["quizzes"].forEach((quiz, i) => {
                          $(".main-form-quiz").append(
                            `<div class="d-flex mb-3 quizItem">
                              <div class="widthpx20 mx-1"> <span class="quizId">${
                                i + 1
                              }</span>.</div>
                                <div class="d-flex flex-column me-3 w-100">
                                  <input type="text" data-quiz-id="${
                                    quiz["_id"]
                                  }" data-value="${quiz["quiz"]}" value="${
                              quiz["quiz"]
                            }" class="quizValue w-100">
                                  <input type="text" placeholder="Соисполнитель" value="${
                                    quiz["responsePerson"]
                                  }"  class="quizResponsePerson w-100">
                                  <input type="text" placeholder="Наблюдатель" value="${
                                    quiz["spectatePerson"]
                                  }" class="quizSpectatePerson me-3 w-100">
                                  <div class="btn-quiz-group d-flex">
                                    <button class="btn btn-dark me-1 w-100 btn-group-edit">изменить</button>
                                    <button class="btn btn-dark ms-1 w-100 btn-group-delete">удалить</button>
                                  </div>
                                </div>  
                              </div>
                            </div>`
                          );
                        });
                      }
                    }
                    setTimeout(() => {
                      $(".main-form-quiz").append(`
                    <div class="d-flex align-items-center quizNewDataParent mx-3">
                      <div class="marginpx9 d-flex flex-column w-100">
                        <input type="text" placeholder="Напишите новый вопрос..."  class="quizNewData w-100">
                        <input type="text" placeholder="Соисполнитель"  class="quizNewResponsePerson w-100">
                        <input type="text" placeholder="Наблюдатель"  class="quizNewSpectatePerson w-100">
                          <div>
                            <button class="btn btn-dark my-1 w-100 create-quiz">Добавить</button>
                          </div>
                      </div>
                    </div>
                `);
                    }, 500);
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
          $(".company").addClass("checkListToggler");
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
          $(".company").removeClass("checkListToggler");
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
                <input type="text" class="form-control" id="datepickerEnd" placeholder="До">
              </div>
            </div>`);

          $(".main-select-group-row").prepend(`
            <div class="col-md-3 col-12 my-1 col-ui-widget">
              <div class="ui-widget">
                <input type="text" class="form-control" id="datepickerStart" placeholder="От">
              </div>
            </div>`);
          $(".main-select-group-row").append(`
            <div class="col-12 mt-2 d-grid gap-2 showBtnShow">
              <button class="btn btn-dark showBtn">Показать</button>
            </div>
      `);
          $("#datepickerEnd, #datepickerStart").datepicker({
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
        let dateForSendStart = $("#datepickerStart").val();
        let dateForSendEnd = $("#datepickerEnd").val();
        let departmentForSend = $(".city").val();
        if (
          dateForSend == "" ||
          dateForSendStart == "" ||
          dateForSendEnd == "" ||
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
    },
  });

  // START POST send user answer
  $("body").on("click", ".send-form", async function (e) {
    e.preventDefault();

    let name = $(".search").val();

    let companyName = $(".company").val();
    let cityName = $(".city").val();
    let mainWatcherFirst = $(".quizMainValue").attr("main-watcher-first");
    let mainWatcherSecond = $(".quizMainValue").attr("main-watcher-second");
    let companyResponsePerson = $(".company")
      .find("option:selected")
      .attr("data-response-person");
    console.log(companyResponsePerson);

    let reasons = [];
    let answers = [];
    let quizzes = [];
    let spectators = [];
    let responsible = [];
    let spectateAndResponsePersons = [];

    $(".quizMainValue").each(function (i) {
      let something = i + 1 + ". " + $(this).text() + "/";
      quizzes.push(something);
    });

    $(".reason").each(function () {
      let something = $(this).val();
      if ($(this).parent().find(".quiz").prop("checked")) {
        reasons.push("отсутствует");
      } else {
        reasons.push(something);
      }
    });

    reasons = reasons.splice("/");
    reasons.forEach((item, i, arr) => {
      arr.splice(i, 1, item);
    });

    quizzes = quizzes.splice("/");
    quizzes.forEach((item, i, arr) => {
      item = item.slice(0, -1);
      arr.splice(i, 1, item);
    });

    $(".quiz:checkbox").each(function () {
      if ($(this).is(":checked")) {
        answers.push("Да");
      } else {
        answers.push("Нет");
      }
    });

    $(".answerResponsePerson").each(function () {
      const root = $(this).parent();
      spectateAndResponsePersons.push(
        `${root.find(".answerResponsePerson").val()}, ${root
          .find(".answerSpectatePerson")
          .val()}`
      );
    });

    spectateAndResponsePersons.forEach((item, i) => {
      item = item.split(",");
      spectateAndResponsePersons.splice(i, 1, item);
      spectators.push(item[1]);
      responsible.push(item[0]);
    });

    if (name != "" && !reasons.includes("")) {
      $(".search").val("");

      var i = 0;
      var dateQuest = new Date();
      dateQuest.setDate(dateQuest.getDate() + 7);

      // переменные mainWatcherSecond == второй наблюдатель, companyResponsePerson == ответственный у города
      // for (var i = 0; i < answers.length; ++i) {
      //   if (answers[i] == "Нет") {
      //     BX24.callMethod(
      //       "tasks.task.add",
      //       {
      //         fields: {
      //           TITLE:
      //             cityName +
      //             " " +
      //             companyName +
      //             " " +
      //             name +
      //             " получил замечание!",
      //           RESPONSIBLE_ID: responsible[i],
      //           AUDITORS: Array(mainWatcherFirst, mainWatcherSecond, spectators[i]),
      //           TASK_CONTROL: "Y",
      //           DEADLINE: dateQuest,
      //           DESCRIPTION:
      //             "Сотрудник: " +
      //             name +
      //             " из " +
      //             companyName +
      //             " получил замечание при ответе на вопрос: " +
      //             quizzes[i] +
      //             ". Комментарий пользователя: " +
      //             reasons[i],
      //         },
      //       },
      //       function (res) {
      //         console.log(res.answer.result);
      //       }
      //     );
      //   }
      // }

      $.ajax({
        url: "/answer/save-answer",
        type: "POST",
        data: {
          cityName: cityName,
          companyName: companyName,
          name: name,
          spectateAndResponsePersons: spectateAndResponsePersons,
          mainWatcherFirst: mainWatcherFirst,
          mainWatcherSecond: mainWatcherSecond,
          companyResponsePerson: companyResponsePerson,
          answers: answers,
          quizzes: quizzes,
          reasons: reasons,
        },
        success: function () {
          $(".main-form").empty();
          $(".search").val("");

          const sendAlert =
            $(`<div class="alert fixed-top alert-success alert-dismissible fade show my-3" role="alert">
            <strong>Форма отправлена!</strong> Благодарим вас, за обратную связь!.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`).hide();

          sendAlert.appendTo(".main").fadeIn();
          deleteAlert();
        },
      });
      $(".company").prop("selectedIndex", 0);
    } else {
      const sendAlert =
        $(`<div class="alert fixed-top alert-danger alert-dismissible fade show my-3" role="alert">
            <strong>Форма не заполнена до конца!</strong> Пожалуйста заполните ФИО менеджера и поля, где вы поставили "НЕТ"!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`).hide();

      sendAlert.appendTo(".main").fadeIn();
      deleteAlert();
    }
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
  $("body").on("click", ".showBtn", function () {
    $(".main-form").empty();
    let departmentForSend = $(".city").val();
    let salonForSend = $(".company").val();
    let dateTimeStart = $("#datepickerStart").val();
    let dateTimeEnd = $("#datepickerEnd").val();

    let gte = new Date(dateTimeStart);
    let lt = new Date(dateTimeEnd);
    let alertFlag = true;
    if (
      dateTimeStart == "" ||
      dateTimeEnd == "" ||
      departmentForSend == "Выберите подразделение"
    ) {
      const sendAlert =
        $(`<div class="alert fixed-top alert-warning alert-dismissible fade show my-3" role="alert">
                  <strong>Не все параметры выбраны!</strong> Пожалуйста выберите все параметры.
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
          names.push({
            name: data[0]["name"],
            companyName: data[0]["companyName"],
            time: getAnswerTime(data[0]["createdAt"]),
            date: data[0]["createdAt"],
          });

          function checkSameName(name) {
            for (let i = 0; i < names.length; i++) {
              if (names[i]["name"] == name) {
                return false;
              }
            }
            return true;
          }

          for (key in data) {
            if (
              !names.includes({
                name: data[key]["name"],
                companyName: data[key]["companyName"],
                time: getAnswerTime(data[key]["createdAt"]),
                date: data[key]["createdAt"],
              }) &&
              checkSameName(data[key]["name"])
            ) {
              names.push({
                name: data[key]["name"],
                companyName: data[key]["companyName"],
                time: getAnswerTime(data[key]["createdAt"]),
                date: data[key]["createdAt"],
              });
            }
          }

          $(".main-form").append(`
          <div class="accordion" id="accordionExample"></div>
        `);

          names.forEach((item, i) => {
            $(".accordion").append(`
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-heading${i}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}" aria-controls="flush-collapse${i}">
                  ${item["name"]} - ${item["companyName"]} - ${new Date(
              item["date"]
            )
              .toLocaleString()
              .slice(0, -10)}
                </button>
              </h2>
              <div id="flush-collapse${i}" class="accordion-collapse collapse" aria-labelledby="flush-heading${i}">
                <div class="accordion-body">
                      ${outputTables(item["name"])}
                </div>
              </div>
            </div>
          `);
            i++;
          });

          function getAnswerTime(date) {
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
                    <div>Время: ${getAnswerTime(data[key]["createdAt"])}</div>
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

  // START change, get watcher

  $("body").on("click", "#btnradio3, .checkAlert", function (e) {
    $(".mainWatcherClass").empty();
    getWatcher().then((data) => {
      setTimeout(function () {
        if (data.status || data.watchers) {
          $(".main-form-watcher").append(
            `<div class="d-flex mainWatcherClass my-1">
                <div class="d-flex align-items-center pe-2">
                  <span>1.</span>
                </div>
              <input type="text" class="watcherName w-100" data-id="${data["watchers"]["0"]["_id"]}" placeholder="Введите главного наблюдателя #1" value="${data["watchers"]["0"]["name"]}">
              <button class="btn btn-dark change-watcher">Изменить</button> 
            </div>`
          );
        } else {
          $(".main-form-watcher").append(
            `<div class="d-flex mainWatcherClass my-1">
            <div class="d-flex align-items-center pe-2">
                  <span>1.</span>
                </div>
          <input type="text" class="watcherNameForCreationFirst w-100" placeholder="Введите главного наблюдателя #1">
          <button class="btn btn-dark create-watcher">Создать</button> 
          </div>`
          );
        }
      }, 600);

      setTimeout(function () {
        if (data.status || data.watchers) {
          $(".main-form-watcher").append(
            `<div class="d-flex mainWatcherClass my-1">
                <div class="d-flex align-items-center pe-2">
                  <span>2.</span>
                </div>
              <input type="text" class="watcherName w-100" data-id="${data["watchers"]["1"]["_id"]}" placeholder="Введите главного наблюдателя #2" value="${data["watchers"]["1"]["name"]}">
              <button class="btn btn-dark change-watcher">Изменить</button> 
            </div>`
          );
        } else {
          $(".main-form-watcher").append(
            `<div class="d-flex mainWatcherClass my-1">
            <div class="d-flex align-items-center pe-2">
                  <span>2.</span>
                </div>
          <input type="text" class="watcherNameForCreationSecond w-100" placeholder="Введите главного наблюдателя #2">
          <button class="btn btn-dark create-watcher">Создать</button> 
          </div>`
          );
        }
      }, 900);
    });
  });

  function getWatcher() {
    return fetch("/get-watcher")
      .then((response) => response.json())
      .then((result) => {
        return result;
      });
  }

  $("body").on("click", ".create-watcher", function (e) {
    if (
      $(".watcherNameForCreationFirst").val() != "" ||
      $(".watcherNameForCreationSecond").val() != ""
    ) {
      let firstName = $(".watcherNameForCreationFirst").val()
        ? $(".watcherNameForCreationFirst").val()
        : "отсутствует";
      let secondName = $(".watcherNameForCreationSecond").val()
        ? $(".watcherNameForCreationSecond").val()
        : "отсутствует";

      $.ajax({
        url: "/create-watcher",
        type: "POST",
        data: {
          watchers: [{ name: firstName }, { name: secondName }],
          isAdmin: isUserAdmin,
        },
        success: function () {
          const sendAlert =
            $(`<div class="alert fixed-top alert-success alert-dismissible fade show my-3" role="alert">
            <strong>Изменение успешно!</strong> Нажмите на <strong><span class="checkAlert">сюда</span></strong>, чтобы обновить данные!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
         </div>`).hide();

          sendAlert.prependTo(".main-form-quiz").fadeIn();
          deleteAlert();
        },
      });
    } else {
      const sendAlert =
        $(`<div class="alert fixed-top alert-danger alert-dismissible fade show my-3" role="alert">
            <strong>Нужные поля не заполнены!</strong> Заполните поле главного наблюдателя!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
         </div>`).hide();

      sendAlert.prependTo(".main-form-quiz").fadeIn();
      deleteAlert();
    }
  });

  $("body").on("click", ".change-watcher", function (e) {
    let name = $(this).parent().find(".watcherName").val();
    let id = $(this).parent().find(".watcherName").attr("data-id");
    if (name != "") {
      $.ajax({
        url: "/change-watcher",
        type: "POST",
        data: {
          name: name,
          id: id,
          isAdmin: isUserAdmin,
        },
        success: function () {
          const sendAlert =
            $(`<div class="alert fixed-top alert-success alert-dismissible fade show my-3" role="alert">
            <strong>Изменение успешно!</strong> Имя главного наблюдателя было изменено!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
         </div>`).hide();

          sendAlert.prependTo(".main-form-quiz").fadeIn();
          deleteAlert();
        },
      });
    } else {
      const sendAlert =
        $(`<div class="alert fixed-top alert-danger alert-dismissible fade show my-3" role="alert">
            <strong>Нужные поля не заполнены!</strong> Заполните поле главного наблюдателя!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
         </div>`).hide();

      sendAlert.prependTo(".main-form-quiz").fadeIn();
      deleteAlert();
    }
  });
  // END change, get watcher

  // START add, update, delete cities
  $("body").on("click", ".add-data-city", function () {
    let cityNewData = $(".cityNewData").val();
    let company = [
      {
        companyName: "компания",
        quizzes: [
          {
            quiz: "Вопрос",
            spectatePerson: "Наблюдатель",
            responsePerson: "Ответственный",
          },
        ],
      },
    ];

    $.ajax({
      url: "/add-data-city",
      type: "POST",
      data: {
        cityName: cityNewData,
        company: company,
        isAdmin: isUserAdmin,
      },
      success: function () {
        const sendAlert =
          $(`<div class="alert fixed-top alert-success alert-dismissible fade show my-3" role="alert">
            <strong>Добавление прошло успешно!</strong> Нажмите на <strong><span class="checkAlert">сюда</span></strong>, чтобы обновить данные!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
         </div>`).hide();

        sendAlert.prependTo(".main-form-quiz").fadeIn();
        deleteAlert();
      },
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
        const sendAlert =
          $(`<div class="alert fixed-top alert-success alert-dismissible fade show my-3" role="alert">
            <strong>Изменение успешно!</strong> Название города было изменено.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
         </div>`).hide();

        sendAlert.prependTo(".main").fadeIn();
        deleteAlert();
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
    let responsePerson = $(".companyNewResponsePerson").val()
      ? $(".companyNewResponsePerson").val()
      : "отсутствует";
    console.log(responsePerson);
    $.ajax({
      url: "/add-data-company",
      type: "POST",
      data: {
        companyNewData: companyNewData,
        responsePerson: responsePerson,
        id: id,
        isAdmin: isUserAdmin,
      },
      success: function () {
        const sendAlert =
          $(`<div class="alert fixed-top alert-success alert-dismissible fade show my-3" role="alert">
            <strong>Добавление прошло успешно!</strong> Нажмите на <strong><span class="checkAlert">сюда</span></strong>, чтобы обновить данные!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
         </div>`).hide();

        sendAlert.prependTo(".main-form-quiz").fadeIn();
        deleteAlert();
      },
    });
  });

  $("body").on("click", ".btn-company-edit", function () {
    const company = $(this).parent().parent();
    let companyNewName = company.find(".companyValue").val();
    let companyOldName = company.find(".companyValue").attr("data-name");
    let sub_id = company.find(".companyValue").attr("data-id");
    let main_id = $(".companyNewData").attr("data-id");
    let responsePerson = company.find(".companyResponsePerson").val()
      ? company.find(".companyResponsePerson").val()
      : "отсутствует";

    console.log(main_id, sub_id);

    $.ajax({
      url: "/edit-data-company",
      type: "POST",
      data: {
        main_id: main_id,
        sub_id: sub_id,
        responsePerson: responsePerson,
        companyNewName: companyNewName,
        companyOldName: companyOldName,
        isAdmin: isUserAdmin,
      },
      success: function () {
        const sendAlert =
          $(`<div class="alert fixed-top alert-success alert-dismissible fade show my-3" role="alert">
            <strong>Изменение успешно!</strong> Название компании было изменено.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
         </div>`).hide();

        sendAlert.prependTo(".main").fadeIn();
        deleteAlert();
      },
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
        company.parent().remove();
      },
    });
  });
  // END add, update, delete company

  // START add, update, delete quizzes
  $("body").on("click", ".create-quiz", function (e) {
    e.preventDefault();
    let id = $(".cityAdminQuiz").find("option:selected").attr("data-id");
    let quizNewData = $(".quizNewData").val();
    let spectatePerson = $(".quizNewSpectatePerson").val();
    let responsePerson = $(".quizNewResponsePerson").val();
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
        url: "/add-quiz",
        type: "POST",
        data: {
          id: id,
          quiz: quizNewData,
          spectatePerson: spectatePerson,
          responsePerson: responsePerson,
          isAdmin: isUserAdmin,
        },
        success: function () {
          const sendAlert =
            $(`<div class="alert fixed-top alert-success alert-dismissible fade show my-3" role="alert">
            <strong>Вопрос добавлен!</strong> Нажмите на <strong><span class="checkAlert">сюда</span></strong>, чтобы обновить данные.
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
    let id = $(".cityAdminQuiz").find("option:selected").attr("data-id");
    let quiz_id = quiz.find(".quizValue").attr("data-quiz-id");
    $.ajax({
      url: "/delete-quiz",
      type: "DELETE",
      data: {
        id: id,
        quiz_id: quiz_id,
        isAdmin: isUserAdmin,
      },
      success: function () {
        quiz.parent().remove();
      },
    });
  });

  $("body").on("click", ".btn-group-edit", function (e) {
    const quiz = $(this).parent().parent();
    let id = $(".cityAdminQuiz").find("option:selected").attr("data-id");
    let quiz_id = quiz.find(".quizValue").attr("data-quiz-id");
    let quizNewData = quiz.find(".quizValue").val();
    let responsePerson = quiz.find(".quizResponsePerson").val();
    let spectatePerson = quiz.find(".quizSpectatePerson").val();

    $.ajax({
      url: "/edit-quiz",
      type: "POST",
      data: {
        id: id,
        quiz_id: quiz_id,
        quiz: quizNewData,
        spectatePerson: spectatePerson,
        responsePerson: responsePerson,
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
