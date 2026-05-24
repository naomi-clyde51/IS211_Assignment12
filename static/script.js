$(document).ready(function () {
  $("#add_student").on("click", function () {
    var student_id = $("#student_id").val();
    var name = $("#name").val();
    var grade = $("#grade").val();

    $.ajax({
      url: "/add",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        student_id: student_id,
        name: name,
        grade: grade,
      }),
      success: function (response) {
        alert(response.status);
        location.reload();
      },
    });
  });

  $("#update_grade").on("click", function () {
    var student_id = $("#update_student_id").val();
    var grade = $("#new_grade").val();

    $.ajax({
      url: "/update",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ student_id: student_id, grade: grade }),
      success: function (response) {
        alert(response.status);
      },
    });
  });

  $("#delete_student").on("click", function () {
    var student_id = $("#delete_student_id").val();
    $.ajax({
      url: "/delete",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ student_id: student_id }),
      success: function (response) {
        alert(response.status);
      },
    });
  });

  $("#view_student").on("click", function () {
    var student_id = $("#view_student_id").val();

    $.ajax({
      url: "/students/" + student_id,
      type: "GET",
      success: function (response) {
        if (response.error) {
          $("#student_info").text(response.error);
        } else {
          $("#student_info").text(
            "ID: " +
              response.student_id +
              ", Name: " +
              response.name +
              ", Quiz Grade: " +
              response.grade,
          );
        }
      },
    });
  });
});
