import { AxiosResponse } from "axios";

export const handleAxiosError = (response: AxiosResponse) : void => {
  if (response.status === 401) {
    window.location.href = "/login";
  }
  else if (response.status === 403) {
    window.location.href = "/403";
  }
  else if (response.status === 404) {
    window.location.href = "/404";
  }
  else if (response.status === 500) {
    window.location.href = "/500";
  }
  else {
    window.location.href = "/500";
  }
}