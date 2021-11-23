$("#btnradio3").click(function () {
  if ($("#btnradio3").is(":checked")) {
    $(".quizNewDataParent").remove();
    $(".ui-widget").remove();
    $(".second-form").empty();
    $(".second").empty();
    $(".city").prop("selectedIndex", 0);
    $(".company").prop("selectedIndex", 0);
    $(".showBtn").remove();
    $(".company").removeAttr("disabled");
    $(".main-form").empty();
    $(".main-select-group, hr").hide();
    // $(".main-select-group").addClass("osnovnayaForma2");

    $.ajax({
      url: "/quiz/get-quiz",
      type: "GET",
      cache: false,
      success: function (data) {
        let i = 1;
        $(".main-form").append(`<hr/>`)
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
                    <button class="btn btn-dark my-1 btn-sm create-quiz">Добавить вопрос</button>
                </btn>
          </div>
       
        `);
      },
    });



    $.ajax({
      url: "/quiz/get-quiz",
      type: "GET",
      cache: false,
      success: function (data) {
        let i = 1;
        for (key in data) {
          $(".second-form").append(`
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
        $(".second").append(`
        <div class="d-flex align-items-center quizNewDataParent ms-3">
                <div><input type="text" placeholder="Напишите имя нового пользователя..."  class="quizNewData"></div>
                <div>
                    <button class="btn btn-dark my-1 btn-sm create-quiz">Добавить пользователя</button>
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
  let quizOldData = quiz.find(".quizValue").text();
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
