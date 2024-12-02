import Swal from "sweetalert2";

function Fire(data) {
  Swal.fire({
    icon: "error",
    title: data,
    showConfirmButton: false,
    timer: 1500,
  });
}

function Success(data) {
  Swal.fire({
    icon: "success",
    text: data,
    showConfirmButton: false,
    timer: 1500,
  });
}

function Confirmation(data) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: data,
  });
}

export { Fire, Success, Confirmation };
