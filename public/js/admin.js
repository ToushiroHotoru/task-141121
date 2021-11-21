function adminId3(data){
    $("#btnradio3").click(function () {
        if ($("#btnradio3").is(":checked")) {
        $(".ui-widget").remove();
        $(".city").prop("selectedIndex", 0);
        $(".company").prop("selectedIndex", 0);
        $(".showBtn").remove();
        $(".company").removeAttr("disabled");
        $(".main-form").empty();
        $(".osnovnayaForma").addClass("osnovnayaForma2");
        let i = 1;
        for (key in data) {
                $(".main-form").append(`
                <div class="formatVoprosov">${i}. ${data[key]["note"]}
                <div class="form-check form-switch formatVoprosovChek">
                </div></div>
                `);
            i++;
            }
        }
    });}