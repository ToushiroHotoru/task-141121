$("#btnradio3").click(function () {
  if ($("#btnradio3").is(":checked")) {
    $(".quizNewDataParent").remove();
    $(".main-select-group").empty();
    $(".main-form").empty();
    $("hr").remove();
    $(".ui-widget").remove();
    $(".second-form").empty();
    $(".second").empty();
    $(".city").prop("selectedIndex", 0);
    $(".company").prop("selectedIndex", 0);
    $(".showBtn").remove();
    $(".company").removeAttr("disabled");
    $(".main-form").empty();

    $.ajax({
      url: "/quiz/get-quiz",
      type: "GET",
      success: function (data) {
        let i = 1;
        $(".main-form").append(`<hr/>`);
        for (key in data) {
          $(".main-form").append(`
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
        $(".main").append(`
        <div class="d-flex align-items-center quizNewDataParent ms-3">
                <div><input type="text" placeholder="Напишите новый вопрос..."  class="quizNewData"></div>
                <div>
                    <button class="btn btn-dark my-1 btn-sm create-quiz">Добавить</button>
                </btn>
          </div>
       
        `);
      },
    });
  }
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
    },
  });
});

$("body").on("click", "#btnradio3", function () {
  $.ajax({
    url: "/get-data",
    type: "GET",
    success: function (data) {
      let i = 1;
      $(".main-form").prepend(`
        <h3>Города</h3>
        `);
      for (key in data) {
        $(".main-form").prepend(`
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
      $(".main-form").prepend(`
            <div class="d-flex align-items-center quizNewDataParent ms-3">
                <div><input type="text" placeholder="Напишите новый вопрос..."  class="cityNewData"></div>
                <div>
                    <button class="btn btn-dark my-1 btn-sm add-data-city">Добавить</button>
                </btn>
          </div>
        `);
    },
  });
});

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
    success: function () {
      console.log("запрос сработал");
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
    },
    success: function () {
      console.log("запрос сработал");
    },
  });
});

$("body").on("click", ".btn-city-delete", function () {
  const city = $(this).parent().parent();
  let cityId = city.find(".cityValue").attr("data-id");
  console.log(cityId);

  $.ajax({
    url: "/delete-data-city",
    type: "DELETE",
    data: {
      cityId: cityId,
    },
    success: function () {
      console.log("запрос сработал");
    },
  });
});
