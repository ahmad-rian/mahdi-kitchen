
import { useToast as useToastOriginal } from "@/Components/ui/toast"

export const useToast = useToastOriginal

export function toast(props) {
  const { toast } = useToast()
  return toast(props)
}