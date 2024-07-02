import * as Dialog from "@radix-ui/react-dialog";

interface ComponentProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title?: string;
}
export default function Popup({ trigger, children, title }: ComponentProps) {
  return <Dialog.Root>
    <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/50 fixed inset-0 z-30" />
      <Dialog.Content className="border-4 border-white bg-[#3d63ff] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed z-30 max-w-md max-h-[32rem] overflow-y-scroll no-scrollbar w-full min-w-[20rem]">
        <div className="border-y-4 border-t-black/25 border-b-white pl-3 flex justify-between items-center">
          <Dialog.Title className="text-2xl uppercase drop-shadow-lg">{title ?? "Alert!"}</Dialog.Title>
          <Dialog.Close className="p-1 border-x-4 border-l-white border-r-black/25 h-10 w-10 relative">
            <p className="text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">X</p>
          </Dialog.Close>
        </div>
        <div className="px-3 py-2 text-lg border-t-4 border-t-black/25">{children}</div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
}