import { Image, Modal } from "antd";
import { useAtom } from "jotai";
import { previewOpenAtom } from ".";
import { tw } from "twind";

const PaintingPreview = (props: { imgPath: string }) => {
  const { imgPath } = props;
  const [open, setOpen] = useAtom(previewOpenAtom);
  const close = () => {
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      onOk={close}
      width={640}
      onCancel={close}
      onClose={close}
    >
      <div className={tw`w-full flex justify-center`}>
        <Image
          width={"90%"}
          src={`http://www.nanfang-art.com/${imgPath}`}
          preview={false}
        />
      </div>
    </Modal>
  );
};

export default PaintingPreview;
