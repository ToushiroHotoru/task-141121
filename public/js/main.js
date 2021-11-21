$("document").ready(function () {
  $.ajax({
    url: "/all-data",
    type: "GET",
    cache: false,
    success: function (data) {
      outputResults(data);

      for (key in data) {
        $(".city").append(
          `<option class="cityName">${getCityName(data[key]["city"])}</option>`
        );
      }

      $(".city").change(function () {
        const form = $(this);
        let output = form.val();
        for (key in data) {
          if (data[key]["city"]["cityName"] == output) {
            $(".main-select-group__selected").remove();
            $(".company").append(
              `${getCompanyName(data[key]["city"]["company"])}`
            );
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

      function getCityName(object) {
        let data = "";
        data += object["cityName"];
        return data;
      }

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

      function getWorkersNames() {
        let companyName = $(".company").val();
        for (key in data) {
          for (let i = 0; i < data[key]["city"]["company"].length; i++) {
            if (companyName == data[key]["city"]["company"][i]["companyName"]) {
              return data[key]["city"]["company"][i]["workers"];
            }
          }
        }
      }
      $("body").on("click", ".search", function () {
        $.ajax({
          url: "/quiz",
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
                      <div class="formatVoprosov">${i}. ${data[key]["note"]}
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
    },
  });
});

$("body").on("click", ".send-form", async function (e) {
  e.preventDefault();
  let name = $(".nameTo").text();
  let companyName = $(".company").val();
  let cityName = $(".city").val();
  let answers = [];
  $(".quiz:checkbox").each(function () {
    if ($(this).is(":checked")) {
      answers.push("yes");
    } else {
      answers.push("no");
    }
  });

  $.ajax({
    url: "/answer",
    type: "POST",
    data: {
      cityName: cityName,
      companyName: companyName,
      name: name,
      answers: answers,
    },
    success: function () {
      $(".main-form").empty();

      const sendAlert =
        $(`<div class="alert alert-success alert-dismissible fade show my-3" role="alert">
            <strong>Форма отправлена!</strong> Благодарим вас, за обратную связь!.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`).hide();

      sendAlert.appendTo(".main").fadeIn();
    },
  });
});
