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
      });

      function getCityName(object) {
        let data = "";
        let i = 1;
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

      $(".search").keyup(function () {
        for (key in data) {
          for (let i = 0; i < data[key]["city"]["company"].length; i++) {
            let avilableNames = data[key]["city"]["company"][i]["workers"];

            console.log(avilableNames);
            $(".search").autocomplete({
              source: avilableNames,
            });
          }
        }
      });
    },
  });
});
