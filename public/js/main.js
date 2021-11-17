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
              var workersGlobal = data[key]["city"]["company"][i]["workers"];
              return data[key]["city"]["company"][i]["workers"];
            }
          }
        }
      }
    },
  });
});


$("body").on("keyup || click", ".search", function () {
  let workerName = $(".search").val();
  $.ajax({
    url: "/quiz",
    type: "GET",
    success: function (data) {
      $(".main-form").empty();
      if(workerName != ""){
      let i = 1;
      $(".main-form").append(`${workerName}`);
      //console.log(workersGlobal);
      for (key in data) {
        $(".main-form").append(`
         <div>${i}. ${data[key]["note"]}</div>
        <div class="form-check form-switch">
          <input class="form-check-input pala${i}" swich_id="${i}" type="checkbox" id="flexSwitchCheckChecked">
          <label class="form-check-label pala${i}" swich_id="${i}" for="flexSwitchCheckChecked" id="flexSwitchCheckChecked">no</label>
        </div>
      `);
        i++;
        // Функция для смены no/yes
     
      }
         $(".form-check-input").click(function () {
            let swid = $(this).attr("swich_id");
            if (this.checked) {
              $(".pala" + swid).text("yes");
            } else {
              $(".pala" + swid).text("no");
            }
          });
       // Функция для смены no/yes 
      $(".main-form").append(
        `<button onclick="alert('1')" id="pal3" class="btn btn-primary">Отправить</button>`
      );
      }
      $()
    },
  });
});

