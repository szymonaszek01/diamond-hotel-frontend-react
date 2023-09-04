import {apiSlice} from "./apiSlice";
import {apiMethods} from "../../constants";

const baseUrl = () => {
  return "/api/v1/weather"
}

const weatherApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getWeatherList: builder.mutation({
      query: () => ({
        url: baseUrl() + "/all",
        method: apiMethods.get
      })
    })
  })
})

export const {
  useGetWeatherListMutation
} = weatherApiSlice