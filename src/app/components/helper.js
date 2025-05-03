import toast from "react-hot-toast";

export function toastit(toastMsg, toastDuration) {
  toast(toastMsg, {
    duration: toastDuration
  })
}