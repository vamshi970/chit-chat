import React from "react";
import { Select, Space } from "antd";
import type { SelectProps } from "antd";

const options: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

const MembersSelect: React.FC = () => (
  <Space style={{ width: "100%" }} direction="vertical">
    <div className="relative border-[1px] rounded-md my-6 focus:border-[#5B96F7]">
        <p className="text-[13px] absolute -top-[10px]  bg-white left-3">Members</p>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Add Members"
        defaultValue={["a10", "c12"]}
        onChange={handleChange}
        options={options}
        variant="borderless"
        className="py-3 px-2"
      />
    </div>
  </Space>
);

export default MembersSelect;
