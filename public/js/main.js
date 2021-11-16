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

            $('.city').change(function () {
                const form = $(this)
                let output = form.val();
                for (key in data) {
                    if (data[key]["city"]['cityName'] == output) {
                        $(".company").append(
                            `${getCompanyName(data[key]["city"]["company"])}`
                        );
                    }
                }
            });

            function getCityName(object) {
                let data = "";
                let i = 1;
                data += object["cityName"];
                return data;
            }

            function getCompanyName(data) {
                console.log(data);
                let leak = [];
                for (let i = 0; i < data.length; i++) {

                    leak.push('<option class="companyName">' + data[i]["companyName"] +
                        '</option>');
                    console.log(data[i]["companyName"]);

                }
                console.log(leak);
                return leak;
            }


            $(".search").keyup(function () {
                const search = $(this);
                let searchValue = search.val();
                for (key in data) {
                    for (let i = 0; i < data[key]["city"]["company"]
                        .length; i++) {
                        for (let j = 0; j < data[key]["city"]["company"][i][
                                "workers"
                            ].length; j++) {
                            if (data[key]["city"]["company"][i]["workers"][j][
                                    "workerName"
                                ].includes(searchValue)) {
                                $(".main-search_help").css("display", "block");
                                $(".main-search_help").text(data[key]["city"][
                                    "company"
                                ][i]["workers"][j]["workerName"]);
                            }
                        }
                    }
                }
            });

        }
    })
})