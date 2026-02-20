'use client'

import { cn } from "@/lib/utils";
import { BoldIcon, ChevronDownIcon, HighlighterIcon, ItalicIcon, Link2Icon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, UnderlineIcon, Undo2Icon } from "lucide-react";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, } from "@/components/ui/dropdown-menu";
import { type Level } from "@tiptap/extension-heading";
import { type ColorResult, SketchPicker } from "react-color";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// const ImageButton = () => {
//   const { editor } = useEditorStore();
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [imageUrl, setImageUrl] = useState();

//   const onChange = (src: string) => {
//     editor?.chain().focus().setImage({ src }).run()
//   }

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <button
//           className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm ">
//           <Link2Icon className="size-4" />
//         </button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="border p-2.5 flex items-center gap-x-2">
//         <Input
//           placeholder="paste Link"
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//         />
//         <Button
//           onClick={() => onChange(value)}
//         > Apply </Button>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )

// }

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState(editor?.getAttributes("link").href || "");

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run()
  }

  return (
    <DropdownMenu onOpenChange={(open) => {
      if (open) {
        setValue(editor?.getAttributes("link").href)
      }
    }}>
      <DropdownMenuTrigger asChild>
        <button
          className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm ">
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border p-2.5 flex items-center gap-x-2">
        <Input
          placeholder="paste Link"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          onClick={() => onChange(value)}
        > Apply </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )

}

const HighlightColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight").color || "#ffffff"

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm ">
          <HighlighterIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border p-0">
        <SketchPicker
          color={value}
          onChange={onChange}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";
  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={"h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm "} style={{ border: `2px solid ${value}` }}>
          <span className="text-sm" style={{ color: value }}>A</span>
        </button>
        {/* <div className="h-0.5 m-0.5 w-[90%]" style={{ backgroundColor: value }} /> */}

      </DropdownMenuTrigger>
      <DropdownMenuContent className="border p-0">
        <SketchPicker
          color={value}
          onChange={onChange}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const headings = [
    { label: "Normal text", value: 0, fontSize: "16px" },
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "24px" },
    { label: "Heading 3", value: 3, fontSize: "20px" },
    { label: "Heading 4", value: 4, fontSize: "18px" },
    { label: "Heading 5", value: 5, fontSize: "16px" },
    { label: "Heading 6", value: 6, fontSize: "10px" },
  ]

  const getCurrentHeading = () => {
    for (let level = 1; level <= 6; level++) {
      if (editor?.isActive("heading", { level })) {
        return (`Heading ${level}`)
      }
    }

    return `Normal text`
  };

  return <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button
        className={cn("h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm ")}>
        <span className="truncate">
          {getCurrentHeading()}</span>
        <ChevronDownIcon className="ml-2 size-4 shrink-0" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
      {headings.map(({ label, value, fontSize }) => (
        <button
          onClick={() => {
            if (value === 0) {
              editor?.chain().focus().setParagraph().run()
            } else {
              editor?.commands.toggleHeading({ level: value as Level })
            }

          }}
          key={value}
          style={{ fontSize }}
          className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80", (value === 0 && !editor?.isActive("heading")) || editor?.isActive("heading", { level: value }) && "bg-neutral-200/80")} >{label}</button>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
};

const FontFamilyButton = () => {
  // fontFamilyButton - this wil cause components must have PC, it wont allow hooks to render inside
  // FontFamilyButton 

  const { editor } = useEditorStore();

  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Verdona", value: "Verdona" },
  ]

  // (as child) is important to render item as child

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("h-7 w-30 shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm ")}>
          <span className="truncate">
            {editor?.getAttributes("textStyle").FontFamily || "Arial"}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({ label, value }) => (
          <button
            onClick={() => editor?.commands.setFontFamily(value)}
            key={value}
            className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80", editor?.getAttributes("text-style").fontFamily === value && "bg-neutral-200/80")}
            style={{ fontFamily: value }}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

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
      <div className="h-6 w-0.5 mx-1 bg-neutral-400"></div>
      <FontFamilyButton />

      <div className="h-6 w-0.5 mx-1 bg-neutral-400"></div>
      <HeadingLevelButton />

      <div className="h-6 w-0.5 mx-1 bg-neutral-400"></div>
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <TextColorButton />
      <HighlightColorButton />


      <div className="h-6 w-0.5 mx-1 bg-neutral-400"></div>
      <LinkButton />
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