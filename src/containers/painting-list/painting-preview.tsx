import { Image, Modal } from "antd";
import { useAtom } from "jotai";
import { previewOpenAtom } from ".";

const PaintingPreview = () => {
  const [open, setOpen] = useAtom(previewOpenAtom);
  const close = () => {
    setOpen(false);
  };
  return (
    <Modal open={open} onOk={close} onCancel={close} onClose={close}>
      <Image src="http://confluence.sumscope.com:8090/download/thumbnails/195166574/QB%E6%A0%87%E5%87%86%E5%88%A9%E7%8E%87%E4%BA%92%E6%8D%A2V1_20240805new.png?version=1&modificationDate=1722853991000&api=v2" />
    </Modal>
  );
};

export default PaintingPreview;
