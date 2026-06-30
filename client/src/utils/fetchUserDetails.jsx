import Axios from "./Axios";
import AxiosToastError from "./AxiosToastError";
import SummaryApi from "../common/SummaryApi";

/**
 * Fetch logged-in user details.
 *
 * @returns {Promise<Object|null>}
 */
const fetchUserDetails = async () => {
  try {
    const { data } = await Axios({
      ...SummaryApi.userDetails,
    });

    return data;
  } catch (error) {
    AxiosToastError(error);
    return null;
  }
};

export default fetchUserDetails;