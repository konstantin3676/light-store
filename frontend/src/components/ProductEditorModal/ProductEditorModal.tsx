import { Modal } from '@mantine/core';

type Props = {
  opened: boolean;
  editingProductId: number;
  onClose: () => void;
};

export const ProductEditorModal = ({
  opened,
  editingProductId,
  onClose,
}: Props) => {
  return (
    <Modal centered opened={opened} onClose={onClose} title="Редактирование">
      {editingProductId}
    </Modal>
  );
};
