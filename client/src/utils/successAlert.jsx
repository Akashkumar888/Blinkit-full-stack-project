
import Swal from "sweetalert2";

const successAlert = async (
  title = "Success",
  text = "",
  options = {}
) => {
  return Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonColor: "#00b050",
    confirmButtonText: "OK",
    ...options,
  });
};

export default successAlert;