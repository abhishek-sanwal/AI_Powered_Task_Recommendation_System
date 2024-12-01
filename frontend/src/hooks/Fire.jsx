import Swal from "sweetalert2";

function Fire(data) {
  Swal.fire({
    icon: "error",
    title: data,
    showConfirmButton: false,
    timer: 1500,
  });
}

export default Fire;
