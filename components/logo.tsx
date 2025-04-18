import { Clock } from "lucide-react"

export function Logo() {
  return (
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white">
      <Clock className="h-5 w-5" />
    </div>
  )
}
