import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

interface ActionDialogProps {
  title: string;
  description: string;
  triggerText: string;
  actionText: string;
  variant?: "default" | "destructive"; 
  onConfirm: () => void;
}

const ActionDialog = ({ title, description, triggerText, actionText, variant = "default", onConfirm }: ActionDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem 
          onSelect={(e) => e.preventDefault()} 
          className="text-white"
        >
          {triggerText}
        </DropdownMenuItem>
      </AlertDialogTrigger>
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm} 
            className={variant === "destructive" ? "bg-red-600 hover:bg-red-700" : ""}
          >
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ActionDialog