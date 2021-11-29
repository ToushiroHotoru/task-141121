$(document).ready(function () {
  $("document").ready(function () {
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
              console.log(workNames);
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
                      <div class="form-check form-switch formatVoprosovChek">
                        <input class="form-check-input quiz " swich_id="${i}" type="checkbox" id="flexSwitchCheckChecked">
                        <label class="form-check-label pala${i}" for="flexSwitchCheckChecked" id="flexSwitchCheckChecked">no</label>
                      </div></div>
                    `);
                      i++;
                    }
                    $(".main-form").append(
                      `<button class="btn btn-primary mx-1 my-2 send-form">Отправить</button>`
                    );
                    $(".form-check-input").click(function () {
                      let swid = $(this).attr("swich_id");
                      if (this.checked) {
                        $(".pala" + swid).text("yes");
                      } else {
                        $(".pala" + swid).text("no");
                      }
                    });
                  }
                },
              });
            },
          });
        });

        $("#btnradio1").click(function () {
          if ($("#btnradio1").is(":checked")) {
            $("hr").css("display", "block");
            $(".main-select-group").css("display", "flex");
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

        $("#btnradio2").click(function () {
          if ($("#btnradio2").is(":checked")) {
            $("hr").css("display", "block");
            $(".main-select-group").css("display", "flex");
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
              $(`<div class="alert alert-warning alert-dismissible fade show my-3" role="alert">
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
  });

  // START POST send user answer
  $("body").on("click", ".send-form", async function (e) {
    e.preventDefault();
    let name = $(".nameTo").text();
    let companyName = $(".company").val();
    let cityName = $(".city").val();
    let answers = [];
    let quizzes = [];
    $(".quizMainValue").each(function (i) {
      let something = i + 1 + ". " + $(this).text() + "/";
      quizzes.push(something);
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

    $.ajax({
      url: "/answer/save-answer",
      type: "POST",
      data: {
        cityName: cityName,
        companyName: companyName,
        name: name,
        answers: answers,
        quizzes: quizzes,
      },
      success: function () {
        $(".main-form").empty();

        const sendAlert =
          $(`<div class="alert alert-success alert-dismissible fade show my-3" role="alert">
            <strong>Форма отправлена!</strong> Благодарим вас, за обратную связь!.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`).hide();

        sendAlert.appendTo(".main").fadeIn();
        deleteAlert();
      },
    });
  });
});
// END POST send user answer

// START delete alert notification
function deleteAlert() {
  setTimeout(() => {
    $(".alert").remove();
  }, 6000);
}
// END delete alert notification

// START GET all users answers
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
          $(`<div class="alert alert-warning alert-dismissible fade show my-3" role="alert">
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
// END GET all users answers

// START GET all data for admin panel
$("#btnradio3").click(function () {
  if ($("#btnradio3").is(":checked")) {
    $(".quizNewDataParent").remove();
    $(".main-select-group").css("display", "none");
    $("hr").css("display", "none");
    $(".main-form").empty();
    $(".ui-widget").remove();
    $(".second-form").empty();
    $(".second").empty();
    $(".city").prop("selectedIndex", 0);
    $(".company").prop("selectedIndex", 0);
    $(".showBtn").remove();
    $(".company").removeAttr("disabled");
    $(".main-form").empty();

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
        </div>
        <div class="main-form-company">
          <hr />
            <div>
              <h3>Салоны</h3>
              <select name="select" class="cityAdmin form-select main-select-group__item">
                  <option selected>Выберите подразделение</option>
              </select>
            </div>
        </div>
        <div class="main-form-worker">
          <hr />
            <div>
              <h3>Сотрудники</h3>
              <div class="d-flex">
                <select name="select" class="cityAdminWorker form-select main-select-group__item">
                    <option selected>Выберите подразделение</option>
                </select>
                <select name="select" class="workerAdmin form-select main-select-group__item">
                    <option selected>Выберите подразделение</option>
                </select>
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
                <div><span class="cityId">${i}</span>. <input type="text" data-id="${data[key]["_id"]}" value="${data[key]["cityName"]}" class="cityValue"></div>
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
                <div class="width102"><input type="text" placeholder="Напишите название нового города..."  class="cityNewData width101"></div>
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
                      <div class="width102"><span class="companyId">${
                        i + 1
                      }</span>. <input type="text" data-name="${
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
          $(".main-form-company").append(`
           <div class="d-flex align-items-center addNewCompany ms-3">
                <div class="width102"><input type="text" placeholder="Напишите название нового салона..." data-id="${dataId}" data-id-company="${dataCompanyId}" class="companyNewData width101"></div>
                <div>
                    <button class="btn btn-dark my-1 btn-sm add-data-company">Добавить</button>
                </btn>
          </div>
          `);
        });

        $(".cityAdminWorker").change(function () {
          $(".workerAdmin").empty();
          $(".addNewWorker").remove();
          let cityName = $(this).val();
          for (key in data) {
            if (data[key]["cityName"] == cityName) {
              data[key]["company"].forEach((item, i) => {
                $(".workerAdmin").append(
                  `<option data-id="${data[key]["_id"]}" data-id-array="${item["_id"]}">${item.companyName}</option>`
                );
              });
            }
          }
        });

        $(".workerAdmin").change(function () {
          $(".workerItem").remove();
          $(".addNewWorker").remove();
          let companyName = $(this).val();
          let dataIdArray = $(this)
            .find("option:selected")
            .attr("data-id-array");
          let dataId = $(this).find("option:selected").attr("data-id");
          for (key in data) {
            data[key]["company"].forEach((company, i) => {
              if (company["companyName"] == companyName) {
                company.workers.forEach((worker, i) => {
                  $(".main-form-worker").append(`
                    <div class="d-flex align-items-center workerItem" data-id="${
                      data[key]["_id"]
                    }">
                      <div class="width102"><span class="workerId">${
                        i + 1
                      }</span>. <input type="text" data-name="${worker}" data-id="${
                    company["_id"]
                  }" value="${worker}" class="workerValue width103"></div>
                      <div class="btn-worker-group">
                          <button class="btn btn-dark my-1 btn-sm btn-worker-edit">edit</button>
                          <button class="btn btn-dark my-1 btn-sm btn-worker-delete">delete</button>
                      </btn>
                    </div>
              `);
                });
              }
            });
          }

          $(".main-form-worker").append(`
                <div class="d-flex align-items-center addNewWorker ms-3">
                      <div class="width102"><input type="text" placeholder="Напишите имя нового сотрудника..." data-id="${dataId}" data-id-array="${dataIdArray}"  class="workerNewData width101"></div>
                      <div>
                          <button class="btn btn-dark my-1 btn-sm add-data-worker">Добавить</button>
                      </btn>
                </div>
                `);
        });
      },
    });
  }
});
// END GET all data for admin panel

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
    },
    success: function () {
      console.log("запрос сработал");
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
    },
    success: function () {},
  });
});

$("body").on("click", ".btn-company-delete", function () {
  const company = $(this).parent().parent();
  let companyId = company.find(".companyValue").attr("data-id");
  let companyOldName = company.find(".companyValue").val();
  console.log(companyId);
  console.log(companyOldName);
  $.ajax({
    url: "/delete-data-company",
    type: "DELETE",
    data: {
      companyId: companyId,
      companyOldName: companyOldName,
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
  console.log(workerArrayId);
  console.log(workerNewName);
  console.log(id);

  $.ajax({
    url: "/add-data-worker",
    type: "POST",
    data: {
      id: id,
      workerNewName: workerNewName,
      workerArrayId: workerArrayId,
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
    },
    success: function () {},
  });
});

$("body").on("click", ".btn-worker-delete", function () {
  const worker = $(this).parent().parent();
  let workerArrayId = worker.find(".workerValue").attr("data-id");
  let workerOldName = worker.find(".workerValue").val();
  let id = $(".workerItem").attr("data-id");
  console.log(workerArrayId);
  console.log(workerOldName);
  $.ajax({
    url: "/delete-data-worker",
    type: "DELETE",
    data: {
      id: id,
      workerArrayId: workerArrayId,
      workerOldName: workerOldName,
    },
    success: function () {
      worker.remove();
    },
  });
});

// END add, update, delete worker

// START add, update, delete quizzes
$("body").on("click", "#btnradio3", function () {
  setTimeout(function () {
    $.ajax({
      url: "/quiz/get-quiz",
      type: "GET",
      success: function (data) {
        let i = 1;
        for (key in data) {
          $(".main-form-quiz").append(`
          <div class="d-flex align-items-center quizItem">
                <div><span class="quizId">${i}</span>. <input type="text" data-value="${data[key]["note"]}" value="${data[key]["note"]}" class="quizValue"></div>
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
                <div><input type="text" placeholder="Напишите новый вопрос..."  class="quizNewData"></div>
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
  let quizId = parseInt($(".quizId").last().text()) + 1;
  console.log(quizId);
  if (!quizNewData) {
    const sendAlert =
      $(`<div class="alert alert-warning alert-dismissible fade show my-3" role="alert">
            <strong>Поле вопроса не заполнено!</strong> Пожалуйста заполните поле запроса.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
         </div>`).hide();

    sendAlert.appendTo(".main").fadeIn();
    deleteAlert();
  } else {
    $.ajax({
      url: "/quiz/create-quiz",
      type: "POST",
      data: {
        note: quizNewData,
      },
      success: function () {
        const sendAlert =
          $(`<div class="alert alert-success alert-dismissible fade show my-3" role="alert">
            <strong>Вопрос добавлен!</strong> Вопрос был добавлен в список вопросов.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
         </div>`).hide();

        sendAlert.appendTo(".main").fadeIn();
        deleteAlert();

        $(".main-form").append(`
          <div class="d-flex align-items-center quizItem">
                <div class="quizData"><span class="quizId">${quizId}</span>. <input type="text" data-value="${quizNewData}" value="${quizNewData}" class="quizValue"></div>
                <div class="btn-quiz-group">
                    <button class="btn btn-dark my-1 btn-sm btn-group-edit">edit</button>
                    <button class="btn btn-dark my-1 btn-sm btn-group-delete">delete</button>
                </btn>
          </div>
                `);
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
    },
    success: function () {
      const sendAlert =
        $(`<div class="alert alert-success alert-dismissible fade show my-3" role="alert">
            <strong>Вопрос изменен!</strong> Вопрос был изменен и добавлен.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
         </div>`).hide();

      sendAlert.appendTo(".main").fadeIn();
      deleteAlert();
    },
  });
});
// END add, update, delete quizzes
