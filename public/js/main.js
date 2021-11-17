$("document").ready(function () {
  $.ajax({
    url: "/all-data",
    type: "GET",
    success: function (data) {
      let i = 0;
      for (key in data) {
        $(".city").append(
          `<option class="cityName">${getCityName(data[key]["city"])}</option>`
        );
        i++;
      }

      $(".city").change(function () {
        const form = $(this);
        let output = form.val();
        for (key in data) {
          if (data[key]["city"]["cityName"] == output) {
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
        console.log(getWorkersNames());
        $(".search").autocomplete({
          source: getWorkersNames(),
        });
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
            '<option class="companyName">' +
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
    },
  });
});

$("body").on("keyup", ".search", function () {
  let workerName = $(".search").val();
  $.ajax({
    url: "/quiz",
    type: "GET",
    success: function (data) {
      $(".main-form").empty();
      let i = 1;
      $(".main-form").append(`${workerName}`);
      for (key in data) {
        $(".main-form").append(`
         <div>${i}. ${data[key]["note"]}</div>
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked">
          <label class="form-check-label" for="flexSwitchCheckChecked">no</label>
        </div>
      `);
        i++;
      }
      $(".main-form").append(
        `<button class="btn btn-primary">Отправить</button>`
      );

      $()
    },
  });
});
