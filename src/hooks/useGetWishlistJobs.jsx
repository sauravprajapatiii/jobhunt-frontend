import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import axiosInstance from "../utils/axios";
import { setWishlistJobs } from "../redux/jobSlice";

export const useGetWishlistJobs = () => {
  const dispatch = useDispatch();

  const fetchWishlist = useCallback(async () => {
    try {
      console.log("FETCH WISHLIST START");

      const res = await axiosInstance.get("/api/user/wishlist");

      dispatch(setWishlistJobs(res.data.wishlist));
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      toast.error("Failed to fetch wishlist");
    }
  }, [dispatch]);

  return fetchWishlist;
};
