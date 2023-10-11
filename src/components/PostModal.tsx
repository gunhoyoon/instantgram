import CloseIcon from "./ui/icons/CloseIcon";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function PostModal({ onClose, children }: Props) {
  return (
    <section
      className="fixed top-0 left-0 flex flex-col items-center justify-center z-50 h-full w-full bg-neutral-900/70"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button onClick={() => onClose()}>
        <CloseIcon />
      </button>
      {children}
    </section>
  );
}
