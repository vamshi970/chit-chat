import { Button, Modal } from "antd";
import MembersSelect from "./MembersSelect";

type CreateGroupModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateGroupModal = ({
  isModalOpen,
  setIsModalOpen,
}: CreateGroupModalProps) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        // title="Create New Group"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            className="shadow-lg bg-[#3366FF] mt-10 text-white font-semibold hover:bg-[#3366FF]"
            onClick={handleOk}
          >
            Create
          </Button>,
        ]}
      >
        <h1 className="font-semibold text-2xl">Create New Group</h1>

        <div className="border-[1px] relative mt-8 rounded-md">
          <p className="text-[13px] absolute -top-[10px] bg-white left-3">
            Name
          </p>
          <input
            type="text"
            name="group-name"
            id="group-name"
            className="outline-none py-[14px] px-2 w-full"
          />
        </div>

        <MembersSelect />
      </Modal>
    </>
  );
};

export default CreateGroupModal;
