'use client'

import { cn } from "@/lib/utils";
import { BoldIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, UnderlineIcon, Undo2Icon } from "lucide-react";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";

//this is the type of button, it's like toolbar won't work without these 3 unless it have optional prop
interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}
const ToolbarButton = ({ onClick, isActive, icon: Icon }: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn("text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:border hover:border-black ", isActive && "bg-neutral-200/80")}
    >
      <Icon className="size-4" />
    </button>
  )
}

export const Toolbar = () => {

  const { editor } = useEditorStore();

  console.log("toolbar editor", { editor })

  const sections: {
    label: string;
    onClick: () => void;
    isActive?: boolean
    icon: LucideIcon;
  }[][] = [
      [
        {
          label: "Undo",
          icon: Undo2Icon,
          onClick: () => (editor?.chain().focus().undo().run())
        },
        {
          label: "Redo",
          icon: Redo2Icon,
          onClick: () => (editor?.chain().focus().redo().run())
        },
        {
          label: "Print",
          icon: PrinterIcon,
          onClick: () => (window.print())
        },
      ],
      [
        {
          label: "Bold",
          onClick: () => (editor?.chain().focus().toggleBold().run()),
          isActive: editor?.isActive("bold"),
          icon: BoldIcon,
        },
        {
          label: "Italic",
          onClick: () => (editor?.chain().focus().toggleItalic().run()),
          isActive: editor?.isActive("italic"),
          icon: ItalicIcon,
        },
        {
          label: "Underline",
          onClick: () => (editor?.chain().focus().toggleUnderline().run()),
          isActive: editor?.isActive("underline"),
          icon: UnderlineIcon,
        },
      ],
      [
        {
          label: "Comment",
          onClick: () => (console.log("comments")),
          isActive: false,
          icon: MessageSquarePlusIcon,
        },
        {
          label: "List Todo",
          onClick: () => (editor?.chain().focus().toggleTaskList().run()),
          isActive: editor?.isActive("taskList"),
          icon: ListTodoIcon,
        },
        {
          label: "Remove Formatting",
          onClick: () => (editor?.chain().focus().unsetAllMarks().run()),
          icon: RemoveFormattingIcon,
        },
      ]
    ]

  return (
    <div className="bg-[#f4f8f9] px-2.5 py-0.5 rounded-sm min-h-10 flex items-center gap-x-0.5 border-2 border-black">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" />
      {/* ff */}
      <Separator orientation="vertical" />
      {/* type void [] - error , becuase you might be missing return with curly braces */}
      {/* heading */}
      <Separator orientation="vertical" />
      {/* fs  */}
      <Separator orientation="vertical" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      {/* text color */}
      {/* highlight */}
      <Separator orientation="vertical" />
      {/* link */}
      {/* image */}
      {/* align */}
      {/* line height */}
      {/* list  */}
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  )
}