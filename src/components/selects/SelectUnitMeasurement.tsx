import React from "react";
import { Select } from "antd";

const { Option } = Select;

interface SelectUnitMeasurementProps {
  value?: string; 
  onChange?: (value: string) => void; 
}

const units = [
  { value: "kg", label: "Кг" },
  { value: "litres", label: "Литры" },
  { value: "piece", label: "Штука" },
  { value: "meters", label: "Метры" },
  { value: "box", label: "Коробка" },
  { value: "pack", label: "Упаковка" },
  { value: "set", label: "Набор" },
];

const SelectUnitMeasurement: React.FC<SelectUnitMeasurementProps> = ({
  value,
  onChange,
}) => {
  return (
    <Select
      value={value || undefined} 
      onChange={onChange}
      placeholder="Выберите единицу"
      allowClear
      style={{ width: "100%" }}
    >
      {units.map((u) => (
        <Option key={u.value} value={u.value}>
          {u.label}
        </Option>
      ))}
    </Select>
  );
};

export default SelectUnitMeasurement;
